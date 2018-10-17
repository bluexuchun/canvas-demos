var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    W = document.body.clientWidth,
    H = document.body.clientHeight;

    canvas.width = W;
    canvas.height = H;

var Radius = 250,         //球的最大半径
    balls = [],           //存放球
    nums = 500,           //球的数量 总共500个
    circleX = W/2,        //圆的中心点x
    circleY = H/2;        //圆的中心点y


// 鼠标活动时，获取鼠标的坐标
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

function draw(){
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,W,H);

  for (var i = 0; i < balls.length; i++) {
    ctx.beginPath();
    var fl = 450;         //焦点
    var scale = fl / (fl - balls[i].z);
    var alpha = (balls[i].z + Radius) / (2 * Radius);
    ctx.arc(balls[i].xa,balls[i].ya,balls[i].r * scale,0,2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

}

function update(){

    for (var i = 0; i < balls.length; i++) {
      if(warea.x > 0 && warea.y > 0){
        var dx = balls[i].xa - warea.x;
        var dy = balls[i].ya - warea.y;
        var dis = Math.sqrt(dx * dx + dy * dy);
        if(dis < 50){
          balls[i].xa += dx * 0.5;
          balls[i].ya += dy * 0.5;
        };
      }
      balls[i].xa += (circleX + balls[i].x - balls[i].xa) * 0.01;
      balls[i].ya += (circleY + balls[i].y - balls[i].ya) * 0.01;
    }

}

// 生成所有点
for (var i = 0; i <= nums; i++) {
  var k = -1 + (2 * (i + 1) - 1) / nums;
  var angleA = Math.acos(k);
  var angleB = angleA * Math.sqrt(nums * Math.PI);
  var xa = Math.random() * W;
  var ya = Math.random() * H;
  var x = Radius * Math.sin(angleA) * Math.cos(angleB);
  var y = Radius * Math.sin(angleA) * Math.sin(angleB);
  var z = Radius * Math.cos(angleA);
  var b = new Circle(xa, ya, x, y, z, 1.5);
  balls.push(b);
}

function animate(){
  ctx.clearRect(0,0,W,H);
  requestAnimationFrame(animate,canvas);
  draw();
  update();
}
requestAnimationFrame(animate,canvas);
