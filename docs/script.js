const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let offsetX = 0, offsetY = 0;
let dragging = false;
let dragStartX, dragStartY;
let mouseX = 0, mouseY = 0;
let isHoveringUsagiza = false;

// アニメーション関連の変数
let isAnimating = false;
let animationStartTime = 0;
let animationDuration = 2000; // 2秒
let startOffsetX = 0, startOffsetY = 0;
let targetOffsetX = 0, targetOffsetY = 0;

// 星座画像の変数
let usagizaImage = new Image();
let usagizaLoaded = false;

// 星座の座標設定（星空座標系での位置）
const usagizaX = 1000; // 星空座標系でのX座標
const usagizaY = 500; // 星空座標系でのY座標
const usagizaWidth = 530 * 0.7; // 画像の幅
const usagizaHeight = 423 * 0.7; // 画像の高さ

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



// イージング関数（スムーズなアニメーション）
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// 星座を中央に移動するアニメーション開始
function startUsagizaCenterAnimation() {
  if (isAnimating) return;
  
  isAnimating = true;
  animationStartTime = Date.now();
  startOffsetX = offsetX;
  startOffsetY = offsetY;
  
  // 星座画像の中心が画面中央に来るようなオフセットを計算
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const usagizaCenterX = usagizaX + usagizaWidth / 2;
  const usagizaCenterY = usagizaY + usagizaHeight / 2;
  
  targetOffsetX = Math.max(MIN_OFFSET_X, Math.min(MAX_OFFSET_X, usagizaCenterX - centerX));
  targetOffsetY = Math.max(MIN_OFFSET_Y, Math.min(MAX_OFFSET_Y, usagizaCenterY - centerY));
}

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
    
    // ホバー時のグロー効果
    if (isHoveringUsagiza) {
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    
    ctx.drawImage(usagizaImage, screenX, screenY, usagizaWidth, usagizaHeight);
    
    // シャドウをリセット
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // 星座名を縦書きで表示
    ctx.font = '100px NewStarWords, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    const text = 'うさぎ';
    const lineHeight = 100; // 文字間の間隔
    const startX = screenX + usagizaWidth + 450; // 星座画像の右側に配置
    const startY = screenY + 20; // 開始Y座標
    
    // 一文字ずつ縦に描画
    for (let i = 0; i < text.length; i++) {
      ctx.fillText(text[i], startX, startY + (i * lineHeight));
    }
    
    // 星座画像と「うさぎ」文字の間にテキストを表示
    ctx.font = '50px NewStarWords, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    const middleText = 'あんなに　おひさま';
    const middleLineHeight = 50;
    const middleStartX = screenX + usagizaWidth + 300; // 画像と「うさぎ」文字の間
    const middleStartY = screenY ;
    
    // 一文字ずつ縦に描画
    for (let i = 0; i < middleText.length; i++) {
      ctx.fillText(middleText[i], middleStartX, middleStartY + (i * middleLineHeight));
    }
  }
}


// アニメーションのループ（背景の星）
function animate() {
  // アニメーション処理
  if (isAnimating) {
    const elapsed = Date.now() - animationStartTime;
    const progress = Math.min(elapsed / animationDuration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    // 現在のオフセットを計算
    offsetX = startOffsetX + (targetOffsetX - startOffsetX) * easedProgress;
    offsetY = startOffsetY + (targetOffsetY - startOffsetY) * easedProgress;
    
    // アニメーション終了判定
    if (progress >= 1) {
      isAnimating = false;
      offsetX = targetOffsetX;
      offsetY = targetOffsetY;
    }
  }
  
  // ホバー判定を更新
  if (usagizaLoaded) {
    const screenX = usagizaX - offsetX;
    const screenY = usagizaY - offsetY;
    isHoveringUsagiza = mouseX >= screenX && mouseX <= screenX + usagizaWidth &&
                       mouseY >= screenY && mouseY <= screenY + usagizaHeight;
  }
  
  drawStars();
  requestAnimationFrame(animate);
}

// ドラッグ操作
canvas.addEventListener('mousedown', (e) => {
  // アニメーション中はドラッグを無効化
  if (isAnimating) return;
  
  dragging = true;
  dragStartX = e.clientX + offsetX;
  dragStartY = e.clientY + offsetY;
});

canvas.addEventListener('mouseup', () => {
  dragging = false;
});

canvas.addEventListener('mousemove', (e) => {
  // マウス座標を更新
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // アニメーション中はドラッグ操作を無効化
  if (dragging && !isAnimating) {
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
    // アニメーション中はドラッグを無効化
    if (isAnimating) return;
    
    dragging = true;
    dragStartX = e.clientX + offsetX;
    dragStartY = e.clientY + offsetY;
    document.body.classList.add('dragging');
});

// クリック処理（星座画像クリック時の中央移動）
canvas.addEventListener('click', (e) => {
  if (isHoveringUsagiza && !dragging) {
    startUsagizaCenterAnimation();
  }
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