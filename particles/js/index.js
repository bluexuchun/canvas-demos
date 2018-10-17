var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    // 设置宽度和高度
    W = document.body.clientWidth,
    H = document.body.clientHeight,
    // 所有色彩 动态颜色
    colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
      '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722'
    ],

    // 所有点的坐标
    points = [],

    // 文字
    text = '默认',

    // 间隔 间隔越大 点越少
    girdX = 15,
    girdY = 15,

    // 起始点
    initPoint = { x:W/2, y:H-100 },

    // 喷射范围
    initPx = { x1: W/2 - 300, x2: W/2 + 300},
    initPy = { y1: H/2 - 200, y2: H/2 + 200},

    // 动画id
    initFrame,
    secondFrame;

    canvas.width = W;
    canvas.height = H;




// 监听屏幕的变化
window.addEventListener('resize',function(){
  W = document.body.clientWidth;
  H = document.body.clientHeight;
  canvas.width = W;
  canvas.height = H;
  // 起始点
  initPoint = { x:W/2, y:H-100 };

  // 喷射范围
  initPx = { x1: W/2 - 300, x2: W/2 + 300};
  initPy = { y1: H/2 - 200, y2: H/2 + 200};
  // 先读取字体的位置数量
  points = [];
  word();
})

// 文字改变
document.getElementById('button').onclick = function(){
  W = document.body.clientWidth;
  H = document.body.clientHeight;
  canvas.width = W;
  canvas.height = H;

  var textValue = document.querySelector('input[name="name"]').value;

  text = textValue;
  points = [];
  word();
}

// 初始化粒子
var Particles = function(x,y,xa,ya,initX,initY,scale,color){
  this.x = x;
  this.y = y;
  this.xa = xa;
  this.ya = ya;
  this.initX = initX;
  this.initY = initY;
  this.scale = scale;
  this.color = color;
}

// 填写文字
function word(){
  ctx.save();
  ctx.beginPath();
  ctx.textAlign = "center";
  ctx.fillStyle = 'white';
  ctx.font =  "200px arial";
  ctx.fillText(text, W/2, H/2);


  var imgData = ctx.getImageData(0, 0, W, H);

  for (var x = 0; x < W; x += girdX) {
    for (var y = 0; y < H; y += girdY) {
      // 为什么要乘以4 因为屏幕的分辨率 和 imgData之间的关系就是1/4 所以要乘以4
      var i = 4*(y * imgData.width + x);
      // 随机初始点
      let initX = Math.random() * (initPx.x2 - initPx.x1) + initPx.x1,
          initY = Math.random() * (initPy.y2 - initPy.y1) + initPy.y1;

      if (imgData.data[i + 3] > 128) {
        points.push(new Particles(x, y,initPoint.x, initPoint.y, initX, initY, Math.random() * 10, colors[Math.ceil(Math.random() * colors.length,1)]));
      }
    }
  }
  ctx.clearRect(0,0,W,H);
}

function draw(){
  for (var i = 0; i < points.length; i++) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(points[i].xa, points[i].ya, points[i].scale, 0, 2 * Math.PI);
    ctx.fillStyle = points[i].color;
    ctx.fill();
  }
}

// 按照字形归入点
function update(){
  for (var i = 0; i < points.length; i++) {
    points[i].xa += (points[i].x - points[i].xa) * 0.05;
    points[i].ya += (points[i].y - points[i].ya) * 0.05;

    points[i].scale += Math.ceil((Math.random() * 2 - 1),1) * points[i].scale * 0.05;
    if(points[i].scale >= 10){
      points[i].scale -= points[i].scale * 0.05;
    }
    if(points[i].scale <= 0){
      points[i].scale += points[i].scale * 0.05;
    }
  }
}

// 初始喷射
function initStart(){

  for (var i = 0; i < points.length; i++) {

    points[i].xa += (points[i].initX - points[i].xa) * 0.15;
    points[i].ya += (points[i].initY - points[i].ya) * 0.15;
  }
}

// 变成改变的形状
function drawAnimate(){
  ctx.fillStyle = 'rgba(0,0,0,0.2)'
  globalCompositeOperation = 'destination-in';
  ctx.fillRect(0, 0, W, H);
  secondFrame = window.requestAnimationFrame(drawAnimate,canvas);
  draw();
  update();
};

// 运行喷射
function initAnimate(){
  ctx.fillStyle = 'rgba(0,0,0,0.2)'
  globalCompositeOperation = 'destination-in';
  ctx.fillRect(0, 0, W, H);
  initFrame = window.requestAnimationFrame(initAnimate,canvas);
  draw();
  initStart();
  let condition = Math.ceil(points[1].xa,1) - Math.ceil(points[1].initX,1);
  if(condition == 0){
    // 当喷射坐标完成后 执行改变
    window.cancelAnimationFrame(initFrame);
    secondFrame = window.requestAnimationFrame(drawAnimate,canvas);
  }
}

// 先读取字体的位置数量
word();
initFrame = window.requestAnimationFrame(initAnimate,canvas);
