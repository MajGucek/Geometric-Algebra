let renders = [];
function addToRender(color, object, name) {
  renders.push(color, object, name);
}
function addToRender(...objects) {
  let color = randomHexColor();
  for (let obj of objects) {
    renders.push(color, obj);
  }
}


Algebra(2, 0, 1, () => {
  /* Templates for creating GA objects */
  let create_point = (x, y) => !(1e0 + x*1e1 + y*1e2);
  let create_line = (a,b,c) => a*1e1 + b*1e2 + c*1e0;
  let motor = (point, angle_or_distance) => Math.E ** (angle_or_distance / 2 * point); 
  let  time = () => performance.now() / 1000;
  /* End of templates section */

  let center_point = create_point(0, 0);


  let t1 = () => motor(center_point, -time()) >>> create_point(-1, -1);
  let t2 = () => motor(center_point, -time()) >>> create_point(-1, 1);
  let t3 = () => motor(center_point, -time()) >>> create_point(1, -1);
  let t4 = () => motor(center_point, -time()) >>> create_point(1, 1);
  
  let  rotation_point = () => motor(center_point, time()) >>> create_point(1, 1);
  let  center_line = () => rotation_point & center_point;
  addToRender(center_line);
  let inter1 = () => center_line ^ (t1 & t2);
  let inter2 = () => center_line ^ (t2 & t3);
  let inter3 = () => center_line ^ (t3 & t4);
  let inter4 = () => center_line ^ (t4 & t1);
  addToRender(inter1, inter2, inter3, inter4);
  addToRender(center_point, "C");
  addToRender([t2, t1, t3, t4]);
  

  document.body.appendChild(this.graph(() => {
    return renders;
  }, {
    grid: true,
    lineWidth: 3,
    labels: true,
    animate: true,
    scale: 0.5,
  }));
});




function randomHexColor() {
  // Generate random values for R, G, B, and Alpha
  const r = Math.floor(Math.random() * 256); // 0-255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.floor(Math.random() * 256); // alpha

  // Convert each to a 2-digit hex and concatenate
  const hex = (a << 24 | r << 16 | g << 8 | b) >>> 0;
  return parseInt('0x' + hex.toString(16).padStart(8, '0').toUpperCase());
}