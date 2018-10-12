var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    W = document.body.clientWidth,
    H = document.body.clientHeight;

    canvas.width = W;
    canvas.height = H;

var netDots = [],     //点坐标
    dotNums = 150,    //点的数量
    extendDis = 5,    //安全边距
    lineDis = 100;   //连线距离 小于连接 大于断开

// 鼠标活动时，获取鼠标坐标
var warea = {x: null, y: null};

window.onmousemove = function(e) {
  e = e || window.event;
  warea.x = e.clientX - canvas.offsetLeft;
  warea.y = e.clientY - canvas.offsetTop;
};

window.onmouseout = function() {
  warea.x = null;
  warea.y = null;
};


// 生成所有的点
for (var i = 0; i < dotNums; i++) {
  var x = Math.random() * (W - extendDis * 2);
  var y = Math.random() * (H - extendDis * 2);
  var xa = (Math.random() * 2 - 1)/1.5;
  var ya = (Math.random() * 2 - 1)/1.5;
  netDots[i] = new Netexy(x,y,xa,ya);
}

// 绘制
function draw(){
  // 渐变颜色
  ctx.save();
  // var grd = ctx.createLinearGradient(0,0,0,H);
  // grd.addColorStop(0,"#FFFFFF");
  // grd.addColorStop(1,"#F8BBD0");
  // ctx.fillStyle = grd;
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.fillRect(0,0,W,H);
  // 绘制点
  for (var i = 0; i < netDots.length; i++) {
    ctx.beginPath();
    ctx.arc(netDots[i].x,netDots[i].y,netDots[i].dotR,0,2 * Math.PI);
    ctx.shadowBlur = 30;
    ctx.shadowColor = "white";
    ctx.fillStyle = netDots[i].dotC;
    ctx.fill();
  }
  mouseLine();
  connectLine([].concat(netDots));

  // ctx.restore();
}

// 更新点坐标
function update(){

  for (var i = 0; i < netDots.length; i++) {
    // 碰撞检测
    if(netDots[i].x > (W - extendDis) || netDots[i].x < extendDis){
      netDots[i].xa *= -1;
    }
    if(netDots[i].y > (H - extendDis) || netDots[i].y < extendDis){
      netDots[i].ya *= -1;
    }
    netDots[i].update(netDots[i].xa,netDots[i].ya);
  }

}

// 距离检测 小于设定的距离后连线
function connectLine(nets){
  // 当前移动的点
  for (var i = 0; i < netDots.length; i++) {

    // 附近遍历的点
    for (var j = 0; j < nets.length; j++) {
      // 删除的元素为undefined 跳出此次循环
      if(nets[j] === undefined) continue;

      // 如果相等的话 跳出此次循环
      if(nets[j] === netDots[i] || nets[j].x === null || nets[j].y === null) continue;

      // console.log(netDots[i].x,netDots[i].y);
      // 开始计算两点距离
      // 1、横坐标计算
      var disX = Math.abs(netDots[i].x - nets[j].x);
      // console.log('disX='+disX);
      // 如果横坐标大于设定的长度 跳出此次循环
      if(disX > lineDis) continue;
      // 2、纵坐标计算
      var disY = Math.abs(netDots[i].y - nets[j].y);
      // console.log('disY='+disY);
      // 如果纵坐标大于设定的长度 跳出此次循环
      if(disY > lineDis) continue;
      // 3、正常2点间距离计算
      var dx = (nets[j].x - netDots[i].x) * (nets[j].x - netDots[i].x);
      var dy = (nets[j].y - netDots[i].y) * (nets[j].y - netDots[i].y);
      var disB = Math.sqrt(dx + dy);
      // 如果2点间距离大于设定的长度 跳出此次循环
      if(disB > 200) continue;
      // 计算距离比

      var ratio = lineDis / (lineDis + disB);
      // 将剩余的开始连线
      ctx.beginPath();
      ctx.strokeStyle = 'rgb('+Math.random() * 255+','+Math.random() * 255+','+Math.random() * 255+')';
      ctx.lineWidth = ratio;
      ctx.moveTo(nets[j].x, nets[j].y);//起始位置
      ctx.lineTo(netDots[i].x, netDots[i].y);//停止位置
      ctx.stroke();
    }
    nets.splice(nets[j],1);
  }
}

// 鼠标连线
function mouseLine(){
  for (var i = 0; i < netDots.length; i++) {
    if(warea.x != null && warea.y != null){
      var dx = warea.x - netDots[i].x;
      var dy = warea.y - netDots[i].y;
      var dis = dx * dx + dy * dy;
      var ratio = lineDis / (lineDis + dis);
      if(dis < 20000 && dis >= 8000){
        netDots[i].x += dx * 0.01;
        netDots[i].y += dy * 0.01;
        ctx.beginPath();
        // var grd = ctx.createLinearGradient(0,0,0,H);
        // grd.addColorStop(0,"#000");
        // grd.addColorStop(1,"#fff");
        // ctx.fillStyle = grd;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.moveTo(warea.x, warea.y);//起始位置
        ctx.lineTo(netDots[i].x, netDots[i].y);//停止位置
        ctx.stroke();
      }
    }
  }
}

//执行动画
(function drawframe(){
  ctx.clearRect(0,0,W,H);
  window.requestAnimationFrame(drawframe,canvas);
  update();
  draw();
})();
