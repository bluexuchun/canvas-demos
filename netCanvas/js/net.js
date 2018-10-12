function Netexy(x,y,xa,ya){
  this.x = x;         //当前x坐标
  this.y = y;         //当前y坐标
  this.xa = xa;       //当前xa下一个坐标
  this.ya = ya;       //当前ya下一个坐标
  this.dotR = 2;      //圆点半径
  this.dotC = 'white'  //圆点的颜色
}

Netexy.prototype.update = function(xa,ya){
  this.x += this.xa;
  this.y += this.ya;
}
