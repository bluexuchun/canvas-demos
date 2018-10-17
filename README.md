# canvas-demos

## canvas之3D圆

  大致思路是 以平面的坐标形式 展现3D的视觉效果

  首先了解圆的计算公式：

  1).球坐标系(r,θ,φ)与直角坐标系(x,y,z)的转换关系:

  x=rsinθcosφ

  y=rsinθsinφ

  z=rcosθ

  2).反之，直角坐标系(x,y,z)与球坐标系(r,θ,φ)的转换关系为:

  r = Math.sqrt(x ^ 2 + y ^ 2 + z ^ 2);

  θ = arccos(z/r);

  φ = arctan(y/x);

  根据按顺序的角度，生成所有点的坐标

  ```

  /* 定义坐标 */
  function Circle(xa,ya,x,y,z,r){
    this.xa = xa;
    this.ya = ya;
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
  }

  //核心代码
  function draw(){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,W,H);

    for (var i = 0; i < balls.length; i++) {
      ctx.beginPath();
      var fl = 450;         //焦点
      var scale = fl / (fl - balls[i].z);
      //计算从远到近的距离 点的大小会从小到大 透明度也会改变
      var alpha = (balls[i].z + Radius) / (2 * Radius);
      ctx.arc(balls[i].xa,balls[i].ya,balls[i].r * scale,0,2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
    }

  }

  for (var i = 0; i <= nums; i++) {
    // k的范围是 -1 ~ 1
    var k = -1 + (2 * (i + 1) - 1) / nums;
    // 核心的两个公式
    var angleA = Math.acos(k);
    // 核心的两个公式
    var angleB = angleA * Math.sqrt(nums * Math.PI);

    var x = Radius * Math.sin(angleA) * Math.cos(angleB);
    var y = Radius * Math.sin(angleA) * Math.sin(angleB);
    var z = Radius * Math.cos(angleA);
    var b = new ball(x, y, z, 1.5);
    balls.push(b);
  }

  /* 动画的计算方式 */
  function update(){
    for (var i = 0; i < balls.length; i++) {
      /*
        鼠标移过 点会往鼠标的反方向走
       */
      if(warea.x > 0 && warea.y > 0){
        var dx = balls[i].xa - warea.x;
        var dy = balls[i].ya - warea.y;
        var dis = Math.sqrt(dx * dx + dy * dy);
        if(dis < 50){
          balls[i].xa += dx * 0.5;
          balls[i].ya += dy * 0.5;
        };
      }
      /*
        核心
        最终目的的坐标 减去 暂时的坐标 点就会从初始位置往最终位置走
       */
      balls[i].xa += (circleX + balls[i].x - balls[i].xa) * 0.01;
      balls[i].ya += (circleY + balls[i].y - balls[i].ya) * 0.01;
    }
  }
  ```
