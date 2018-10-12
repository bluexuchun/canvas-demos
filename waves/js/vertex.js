function Vertex(x,y,baseY){
  this.baseY = baseY;         // 基线
  this.x = x;
  this.y = y;
  this.vy = 0;                // 竖直方向的速度
  this.targetY = 0;           // 目标位置
  this.friction = 0.15;       //摩擦力
  this.deceleration = 0.95;   //减速
}

// Y坐标更新
Vertex.prototype.updateY = function(diffVal){
  this.targetY = diffVal + this.baseY;    //改变目标位置
  this.vy += (this.targetY - this.y);     //速度
  this.vy *= this.deceleration;
  this.y += this.vy * this.friction;      //改变坐标竖直方向的位置
}
