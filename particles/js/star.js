let starbg = document.getElementById('starbg'),
    sbg = canvas.getContext('2d'),
    SW = document.body.clientWidth,
    SH = document.body.clientHeight,
    // 起始点x,y的范围
    rangeX = { x1: W/2 - 300 , x2: W/2 + 300},
    rangeY = { y1: H/2 - 160 , y2: H/2 + 160},
    // 生成点的数量
    starNum = 300,
    // 存储点
    stars = [];

starbg.width = SW;
starbg.height = SH;


// 星坐标点的属性
function Star(x,y,z,xa,ya,za){
  this.x = x;
  this.y = y;
  this.z = z;
}

for (var i = 0; i < starNum; i++) {
  let x = Math.random() * (rangeX.x2 - rangeX.x1) + rangeX.x1;
  let y = Math.random() * (rangeY.y2 - rangeY.y1) + rangeY.y1;
  let z = 0.05;
  stars[i] = new Star(x,y,z);
}

function starDraw(){

  for (var i = 0; i < stars.length; i++) {
    sbg.beginPath();
    let alpha = stars[i].z / 10;
    sbg.arc(stars[i].x, stars[i].y, stars[i].z, 0, 2 * Math.PI);
    sbg.fillStyle = 'rgba(255,255,255,'+alpha+')';
    sbg.fill();
  }
}

function starUpdate(){
  for (var i = 0; i < stars.length; i++) {

    if(stars[i].x < 0 || stars[i].x > W || stars[i].y < 0 || stars[i].y > H){
      stars[i].x = Math.random() * (rangeX.x2 - rangeX.x1) + rangeX.x1;
      stars[i].y = Math.random() * (rangeY.y2 - rangeY.y1) + rangeY.y1;
      stars[i].z = 0.05;
    }
    stars[i].x += (W/2 - stars[i].x) * -0.01;
    stars[i].y += (H/2 - stars[i].y) * -0.01;
    stars[i].z += 0.01;
  }

}

(function starAnimate(){
  sbg.fillStyle = 'rgba(0,0,0,0.3)';
  sbg.fillRect(0,0,W,H);
  sbg.globalAlpha = 1;
  requestAnimationFrame(starAnimate,canvas);
  starDraw();
  starUpdate();
})();
