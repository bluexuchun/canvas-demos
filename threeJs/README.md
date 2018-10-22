# three.js

## 第一章

three things: scene(场景), camera(摄像头) and renderer(渲染器)

```
let scene = new THREE.Scene(); //设置场景
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,1000); //设置摄像头
let renderer = new THREE.WebGLRenderer(); //渲染场景
renderer.setSize( window.innerWidth, window.innerHeight); //场景大小
document.body.appendChild(renderer.domElement); //给body添加canvas
```

- 关键字 Scene、PerspectiveCamera、WebGLRenderer、setSize
现在是有个canvas场景一片黑

```
/* 添加对象 */
let geometry = new THREE.BoxGeometry(1,1,1); //BoxGeometry 包含对象的所有点和表面
let material = new THREE.MeshBasicMaterial( {color: '#FFFFFF' }); //设置材质 -> 颜色(#FFFFFF 标准写法 #fff会报错) 应该还有其他 暂时不知
let cube = new THREE.Mesh( geometry, material ); //就是将坐标点和材质附加给某个对象
scene.add(cube); //场景添加这个对象

camera.position.z = 15; //摄像头 高度 值越小 显示的物体越大，反之越小
```

- 关键字 BoxGeometry、MeshBasicMaterial、Mesh、add
现在场景还是一片黑 因为我们还没有去渲染他

```
/* 执行渲染对象,这就不多说了 requestAnimationFrame都懂 */
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();
```
我的理解是 循环所有点坐标点 绘制立方体

这样我们就能看到一个正方形出现

如果在animate 中加入这些代码立方体就能旋转起来了
```
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  cube.rotation.x += 0.01; //绕x轴旋转
  cube.rotation.y += 0.01; //绕y轴旋转
  cube.rotation.z += 0.01; //绕z轴旋转
}
animate();
```
单独一条 都是绕各自的旋转
合并的 就是斜体旋转 应该有一定的规律


## 第二章
