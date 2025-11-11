/** js/scripts.js of bbauska/1960s making 1960s.bauska.org */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class VCREffect {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = Object.assign({
      fps: 60,
      blur: 1,
      opacity: 1,
      miny: 220,
      miny2: 220,
      num: 70
    }, options);
    this.init();
  }
  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.opacity = this.config.opacity;
    this.generateVCRNoise();
    window.addEventListener("resize", () => this.onResize());
  }
  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  generateVCRNoise() {
    if (this.config.fps >= 60) {
      cancelAnimationFrame(this.vcrInterval);
      const animate = () => {
        this.renderTrackingNoise();
        this.vcrInterval = requestAnimationFrame(animate);
      };
      animate();
    } else {
      clearInterval(this.vcrInterval);
      this.vcrInterval = setInterval(() => {
        this.renderTrackingNoise();
      }, 1000 / this.config.fps);
    }
  }
  renderTrackingNoise(radius = 2) {
    const { canvas, ctx, config } = this;
    let { miny, miny2, num } = config;
    canvas.style.filter = `blur(${config.blur}px)`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `#fff`;
    ctx.beginPath();
    for (let i = 0; i <= num; i++) {
      let x = Math.random() * canvas.width;
      let y1 = getRandomInt(miny += 3, canvas.height);
      let y2 = getRandomInt(0, miny2 -= 3);
      ctx.fillRect(x, y1, radius, radius);
      ctx.fillRect(x, y2, radius, radius);
      ctx.fill();
      this.renderTail(ctx, x, y1, radius);
      this.renderTail(ctx, x, y2, radius);
    }
    ctx.closePath();
  }
  renderTail(ctx, x, y, radius) {
    const n = getRandomInt(1, 50);
    const dirs = [1, -1];
    let dir = dirs[Math.floor(Math.random() * dirs.length)];
    for (let i = 0; i < n; i++) {
      let r = getRandomInt(radius - 0.01, radius);
      let dx = getRandomInt(1, 4) * dir;
      radius -= 0.1;
      ctx.fillRect((x += dx), y, r, r);
      ctx.fill();
    }
  }
}

// Usage
const canvas = document.getElementById("canvas");
const vcrEffect = new VCREffect(canvas, {
  opacity: 1,
  miny: 220,
  miny2: 220,
  num: 70,
  fps: 60,
  blur: 1
});

/**
https://www.youtube.com/embed/o2ObCoCm61s?autoplay=1&controls=0&loop=1&mute=1
1960's
#1.  https://www.youtube.com/watch?v=qan5Qgkdua0 = flintstones (1960-1966)
#2.  https://www.youtube.com/watch?v=voU4ZjyWoSE = get smart (1965-1970)
#3.  https://www.youtube.com/watch?v=nx5GwULPU90 = dragnet (1967-1970)
#4.  https://www.youtube.com/watch?v=fLCC2MwgTIY = rocky & bullwinkle show (1959-1964)
#5.  https://www.youtube.com/watch?v=Pa1fH0SvGPg = underdog (1964-1973)
#6.  https://www.youtube.com/watch?v=DBXb_6-2zOw = the fugitive (1963-1967)
#7.  https://www.youtube.com/watch?v=tTq6Tofmo7E = the jetsons (1962-1963)
#8.  https://www.youtube.com/watch?v=B594jsKbsss = star trek (1966-1969)
#9.  https://www.youtube.com/watch?v=kCfGVLKr5oM = beverly hillbillies (1962-1971)
#10. https://www.youtube.com/watch?v=cfawtDT945o = adams family (1964-1966)
#11. https://www.youtube.com/watch?v=1jgE-lrfZ3k = batman (1966-1968)
#12. https://www.youtube.com/watch?v=ORbseYAkzRM = twilight zone (1959-1964)
**/

const videoIds = ["qan5Qgkdua0", "voU4ZjyWoSE", "nx5GwULPU90", "fLCC2MwgTIY", "Pa1fH0SvGPg", "DBXb_6-2zOw",
  "tTq6Tofmo7E", "B594jsKbsss", "kCfGVLKr5oM", "cfawtDT945o", "1jgE-lrfZ3k", "ORbseYAkzRM"];
let currentVideoIndex = 0;
const iframe = document.getElementById("ytplayer");
const snowEffect = document.querySelector(".snow-effect");

function switchToNextVideo() {
  snowEffect.style.opacity = 1;
  setTimeout(() => {
    currentVideoIndex = (currentVideoIndex + 1) % videoIds.length;
    iframe.src = `https://www.youtube.com/embed/${videoIds[currentVideoIndex]}?autoplay=1&controls=0&loop=0&mute=1`;
    snowEffect.style.opacity = 0;
  }, 2000); // 2 seconds of static before switching
}

iframe.addEventListener("load", () => {
  setTimeout(switchToNextVideo, 12000);  /* 12 seconds */
});
