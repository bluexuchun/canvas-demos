var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    W = document.body.clientWidth,
    H = document.body.clientHeight;

    canvas.width = W;
    canvas.height = H;

var color1 = "#6ca0f6",   //波浪颜色1
    color2 = '#367aec';   //波浪颜色2

var vertexes = [],        //顶点坐标
    verNum = 250,         //顶点数
    diffPt = [];          //差分值

var vPos = 125,           //震荡点
    dd = 15,              //缓冲
    autoDiff = 1000;      //初始差分值

for (var i = 0; i < verNum; i++) {
  // W/(verNum-1)*i:每个点的x坐标; H/2:每个点的y坐标; H/2:基线
  vertexes[i] = new Vertex(W/(verNum-1)*i, H/2, H/2);
  diffPt[i] = 0;  //初始值都为0
}

function draw(){
  // 矩形1
  ctx.save();
  ctx.fillStyle = color1;
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(vertexes[0].x,vertexes[0].y);
  for (var i = 1; i < vertexes.length; i++) {
    ctx.lineTo(vertexes[i].x,vertexes[i].y);
  }
  ctx.lineTo(W,H);
  ctx.lineTo(0,H);
  ctx.fill();
  ctx.restore();

  // 矩形2
  ctx.save();
  ctx.fillStyle = color2;
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(vertexes[0].x,vertexes[0].y + 5);
  for (var i = 1; i < vertexes.length; i++) {
    ctx.lineTo(vertexes[i].x,vertexes[i].y + 5);
  }
  ctx.lineTo(W,H);
  ctx.lineTo(0,H);
  ctx.fill();
  ctx.restore();
}

function update(){
  autoDiff -= autoDiff*0.9;        //1
  diffPt[vPos] = autoDiff;

  //左侧
  for(var i=vPos-1; i>0; i--){     //2
      var d = vPos-i;
      if(d > dd){
          d=dd;
      }
      diffPt[i] -= (diffPt[i] - diffPt[i+1]) * (1-0.01 * d);
  }

  //右侧
  for(var i=vPos+1; i<verNum; i++){   //3
      var d = i-vPos;
      if(d>dd){
          d=dd;
      }
      diffPt[i] -= (diffPt[i] - diffPt[i-1]) * (1-0.01 * d);
  }

  //更新Y坐标
  for(var i=0; i<vertexes.length; i++){  //4
      vertexes[i].updateY(diffPt[i]);
  }
}

(function drawframe(){
    // console.log(autoDiff);
    ctx.clearRect(0,0,W,H);
    // if(autoDiff == 0){
    //   autoDiff = 1000;
    // }
    window.requestAnimationFrame(drawframe,canvas);
    update();
    draw();
})();


canvas.addEventListener('mouseup',function(e){
    var mouse = {x:null, y:null};

    if(e.pageX||e.pageY){
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }else{
        mouse.x = e.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
        mouse.y = e.clientY + document.body.scrollTop +document.documentElement.scrollTop;
    }

    if(mouse.y>(H/2-50) && mouse.y<(H/2 +50)){
        autoDiff = 1000;
        // 这个函数 代表着 鼠标点的位置x 占 全宽的百分比再去乘以总点数 得到 当前的点数
        vPos = 1 + Math.floor((verNum - 2) * mouse.x / W);
        diffPt[vPos] = autoDiff;
    }
})

// 改变颜色
function changeColor(color){
  switch (color) {
    case "red":
      color1 = '#f73378';
      color2 = '#f50057';
      break;
    case "blue":
      color1 = "#6ca0f6";
      color2 = '#367aec';
      break;
    case "purple":
      color1 = "#8561c5";
      color2 = '#673ab7';
      break;
    default:
      color1 = "#6ca0f6";
      color2 = '#367aec';
  }
}

// function drawframe(){
//    console.log(vertexes);
//    ctx.clearRect(0,0,W,H);
//    update();
//    draw();
// };
// 方便观看趋势 以及console.log 每一步的操作改变
// setInterval(() => {
//   drawframe();
// },100)
