const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let offsetX = 0, offsetY = 0;
let dragging = false;
let dragStartX, dragStartY;

// 星座画像の変数
let usagizaImage = new Image();
let usagizaLoaded = false;

// 星座の座標設定（星空座標系での位置）
const usagizaX = 1000; // 星空座標系でのX座標
const usagizaY = 500; // 星空座標系でのY座標
const usagizaWidth = 400; // 画像の幅
const usagizaHeight = 400; // 画像の高さ

// 星座画像を読み込み
usagizaImage.onload = () => {
  usagizaLoaded = true;
};
usagizaImage.src = 'images/usagiza.PNG';

// 星の移動範囲の制限
const STAR_FIELD_WIDTH = 3000;
const STAR_FIELD_HEIGHT = 3000;
const MIN_OFFSET_X = 0;
const MIN_OFFSET_Y = 0;
const MAX_OFFSET_X = STAR_FIELD_WIDTH - window.innerWidth;
const MAX_OFFSET_Y = STAR_FIELD_HEIGHT - window.innerHeight;



// 星を作る
function createStars(count) {
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 3000,
      y: Math.random() * 3000,
      radius: Math.random() * 1.5 + 0.5,
      twinkle: Math.random()
    });
  }
}

// 星と星座を描画する
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 星を描画
  for (let star of stars) {
    const twinkle = Math.sin(Date.now() * 0.002 + star.twinkle * 100) * 0.5 + 0.5;
    ctx.beginPath();
    ctx.arc(star.x - offsetX, star.y - offsetY, star.radius * (0.5 + twinkle), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * twinkle})`;
    ctx.fill();
  }
  
  // 星座画像を描画
  if (usagizaLoaded) {
    const screenX = usagizaX - offsetX;
    const screenY = usagizaY - offsetY;
    ctx.drawImage(usagizaImage, screenX, screenY, usagizaWidth, usagizaHeight);
  }
}

// アニメーションのループ（背景の星）
function animate() {
  drawStars();
  requestAnimationFrame(animate);
}

// ドラッグ操作
canvas.addEventListener('mousedown', (e) => {
  dragging = true;
  dragStartX = e.clientX + offsetX;
  dragStartY = e.clientY + offsetY;
});

canvas.addEventListener('mouseup', () => {
  dragging = false;
});

canvas.addEventListener('mousemove', (e) => {
  if (dragging) {
    // 新しいオフセット値を計算
    const newOffsetX = dragStartX - e.clientX;
    const newOffsetY = dragStartY - e.clientY;
    
    // 移動範囲内に制限
    offsetX = Math.max(MIN_OFFSET_X, Math.min(MAX_OFFSET_X, newOffsetX));
    offsetY = Math.max(MIN_OFFSET_Y, Math.min(MAX_OFFSET_Y, newOffsetY));
  }
});

// 小さな星を散りばめる（背景）
createStars(1000); 
animate();

//マウスのカーソルグーにする
canvas.addEventListener('mousedown', (e) => {
    dragging = true;
    dragStartX = e.clientX + offsetX;
    dragStartY = e.clientY + offsetY;
    document.body.classList.add('dragging');
});


//マウスのカーソルパーにする
canvas.addEventListener('mouseup', () => {
    dragging = false;
    document.body.classList.remove('dragging');
});

canvas.addEventListener('mouseleave', () => {
    dragging = false;
    document.body.classList.remove('dragging');
});

// タイトルのフェードイン・フェードアウトアニメーション
window.addEventListener('load', () => {
  const title = document.getElementById('title');
  
  if (title) {
    // 1秒かけてフェードイン（透明度0→100）
    setTimeout(() => {
      title.style.opacity = '1';
    }, 100); // 少し遅延を入れて確実に実行
    
    // 4秒後（フェードイン1秒 + 表示3秒）にフェードアウト開始
    setTimeout(() => {
      title.style.opacity = '0';
    }, 4000);
  }
});

// ウィンドウリサイズ時の処理
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // 制限値を再計算
  const newMaxOffsetX = STAR_FIELD_WIDTH - window.innerWidth;
  const newMaxOffsetY = STAR_FIELD_HEIGHT - window.innerHeight;
  
  // 現在のオフセットが新しい制限値を超えている場合は調整
  offsetX = Math.max(MIN_OFFSET_X, Math.min(newMaxOffsetX, offsetX));
  offsetY = Math.max(MIN_OFFSET_Y, Math.min(newMaxOffsetY, offsetY));
});