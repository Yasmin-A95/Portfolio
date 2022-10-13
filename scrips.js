window.addEventListener('DOMContentLoaded', function (e) {

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const header = document.querySelector("#header-wrap");

  header.addEventListener('mouseover', function () {
    canvas.classList.remove('hidden')
  })
  header.addEventListener('mouseout', function () {
    canvas.classList.add('hidden')
  })

  let pixels = Array(canvas.width * canvas.height).fill(0);
  function getPixels(p, x, y) { return p[x + y * canvas.width]; }
  function setPixels(p, x, y, c) { p[x + y * canvas.width] = c; }
  function neighbors(p, x, y) { return [getPixels(p, x, y - 1), getPixels(p, x + 1, y - 1), getPixels(p, x + 1, y), getPixels(p, x + 1, y + 1), getPixels(p, x, y + 1), getPixels(p, x - 1, y + 1), getPixels(p, x - 1, y), getPixels(p, x - 1, y - 1),]; }
  function iterate(scale, callback) {
    for (let x = 0; x < (canvas.width / scale); x++) {
      for (let y = 0; y < (canvas.height / scale); y++) {
        const ret = callback(x, y, getPixels(pixels, x, y));
        setPixels(pixels, x, y, ret);
        if (ret !== undefined) {
          ctx.fillStyle = `hsla(${ret}, 100%, 50%, 1)`;
          ctx.fillRect(scale * x, scale * y, scale * 2, scale * 2);
        }
      }
    }
  }

  const scale = 4;

  // initialize. 
  function init() {
    iterate(scale, (x, y, c) => Math.random() > 0.8 ? 256 : 128);
  }
  init();

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let ppixels = JSON.parse(JSON.stringify(pixels))
    iterate(scale, (x, y, c) => {
      // conway's game of life
      const n = neighbors(ppixels, x, y);
      const alive = n.filter(x => x === 256).length;
      if (c === 256) {
        if (alive < 2 || alive > 3) {
          return 128;
        }
      }
      if (c === 128) {
        if (alive === 3) {
          return 256;
        }
      }
      return c;
    });
  }
  animate();

  console.log(`all credit to: https://codepen.io/sschepis/pen/rNvVmLw for the conways game of life scripts`)
  console.log(`Credit to Jen Simmons for teaching me about CSS Grid Layouts :-) colour scheme heavily inspired by her`)

}); // No delete