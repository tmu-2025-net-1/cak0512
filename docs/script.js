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

// 詩のアニメーション関連変数
let poemAnimationState = 'idle'; // 'idle', 'moving', 'showing', 'returning'
let currentPoemGroup = 0;
let poemOpacity = 0;
let titleOpacity = 0;
let poemAnimationStartTime = 0;

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
  
  // 詩のアニメーションシーケンスを開始
  poemAnimationState = 'moving';
  currentPoemGroup = 0;
  poemOpacity = 0;
  titleOpacity = 0;
  
  isAnimating = true;
  animationStartTime = Date.now();
  startOffsetX = offsetX;
  startOffsetY = offsetY;
  
  // 詩全体が表示されるように星座画像を左側に配置
  const targetScreenX = 100; // 画面左端から100pxの位置
  const centerY = window.innerHeight / 2;
  const usagizaCenterY = usagizaY + usagizaHeight / 2;
  
  targetOffsetX = Math.max(MIN_OFFSET_X, Math.min(MAX_OFFSET_X, usagizaX - targetScreenX));
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

    //ctx.fillStyle = 'white';
    //ctx.textAlign = 'center';
    
    // タイトルと詩
    const title = 'うさぎ';
    const poemLines = [
      'あんなに　おひさま',
      'わらってたのに', 
      'きずいたときには',
      'かえっていった',
      'あんなに　はなが',
      'さいてたのに',
      'かぜに　のって',
      'かえっていった',
      'ほしぞら　ひとり',
      'あるいていく',
      'あしたを　ひとり',
      'まっている',
      'さみしい',
      ' ',
      ' ',
      ' '
    ];
    
    const poemLineHeight = 50;
    const columnSpacing = 100;
    
    // 詩のアニメーション中のみ表示
    if (poemAnimationState !== 'idle') {
      // 現在のグループの詩を表示（4行ずつ、タイトルは含まない）
      const totalGroups = 4; // 1グループ目：4行、2グループ目：4行、3グループ目：4行、4グループ目：「さみしい」のみ
      let currentLines = [];
      
      if (currentPoemGroup === 0) {
        // 1グループ目：最初の4行
        currentLines = poemLines.slice(0, 4);
      } else if (currentPoemGroup === 1) {
        // 2グループ目：次の4行
        currentLines = poemLines.slice(4, 8);
      } else if (currentPoemGroup === 2) {
        // 3グループ目：次の4行
        currentLines = poemLines.slice(8, 12);
      } else if (currentPoemGroup === 3) {
        // 4グループ目：「さみしい」のみ
        currentLines = ['さみしい'];
      }
      
      currentLines.forEach((line, columnIndex) => {
        // 右から左の順番で配置（最後の列から最初の列の順）
        const reverseIndex = currentLines.length - 1 - columnIndex;
        const columnX = screenX + usagizaWidth + 50 + (reverseIndex * columnSpacing);
        const startY = screenY + 50;
        
        ctx.font = '50px NewStarWords, sans-serif';
        ctx.fillStyle = `rgba(255, 255, 255, ${poemOpacity})`;
        
        for (let i = 0; i < line.length; i++) {
          ctx.fillText(line[i], columnX, startY + (i * poemLineHeight));
        }
      });
      
      // タイトルを一番右に表示
      const titleX = screenX + usagizaWidth + 50 + (currentLines.length * columnSpacing);
      const titleY = screenY + 50;
      ctx.font = '80px NewStarWords, sans-serif';
      ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity})`;
      for (let i = 0; i < title.length; i++) {
        ctx.fillText(title[i], titleX, titleY + (i * poemLineHeight));
      }
    }
  }
}


// アニメーションのループ（背景の星）
function animate() {
  const now = Date.now();
  
  // 詩のアニメーションシーケンス処理
  if (poemAnimationState === 'moving') {
    // 画像を左に移動中
    const elapsed = now - animationStartTime;
    const progress = Math.min(elapsed / animationDuration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    offsetX = startOffsetX + (targetOffsetX - startOffsetX) * easedProgress;
    offsetY = startOffsetY + (targetOffsetY - startOffsetY) * easedProgress;
    
    if (progress >= 1) {
      poemAnimationState = 'showing';
      poemAnimationStartTime = now;
      titleOpacity = 0;
      poemOpacity = 0;
    }
  } else if (poemAnimationState === 'showing') {
    // 詩を表示中
    const elapsed = now - poemAnimationStartTime;
    const totalPoemGroups = 4; // タイトルを含まない4つのグループ
    
    if (currentPoemGroup < totalPoemGroups) {
      // 現在のグループの表示サイクル
      const cycleTime = 7000; // 1秒フェードイン + 5秒表示 + 1秒フェードアウト
      const groupElapsed = elapsed - (currentPoemGroup * cycleTime);
      
      // タイトルは常に表示（フェード処理）
      if (groupElapsed <= 1000) {
        titleOpacity = Math.min(groupElapsed / 1000, 1);
      } else {
        titleOpacity = 1;
      }
      
      // 詩のフェード処理
      if (groupElapsed <= 1000) {
        // フェードイン
        poemOpacity = Math.min(groupElapsed / 1000, 1);
      } else if (groupElapsed <= 6000) {
        // 表示
        poemOpacity = 1;
      } else if (groupElapsed <= 7000) {
        // フェードアウト
        poemOpacity = Math.max(1 - (groupElapsed - 6000) / 1000, 0);
      } else {
        // 次のグループへ
        currentPoemGroup++;
        poemOpacity = 0;
      }
    } else {
      // 全ての詩が終了、タイトルのフェードアウト
      const titleFadeElapsed = elapsed - (totalPoemGroups * 7000);
      if (titleFadeElapsed <= 1000) {
        titleOpacity = Math.max(1 - titleFadeElapsed / 1000, 0);
      } else {
        // 画像を中央に戻す
        poemAnimationState = 'returning';
        animationStartTime = now;
        startOffsetX = offsetX;
        startOffsetY = offsetY;
        
        // 中央位置を計算
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const usagizaCenterX = usagizaX + usagizaWidth / 2;
        const usagizaCenterY = usagizaY + usagizaHeight / 2;
        
        targetOffsetX = Math.max(MIN_OFFSET_X, Math.min(MAX_OFFSET_X, usagizaCenterX - centerX));
        targetOffsetY = Math.max(MIN_OFFSET_Y, Math.min(MAX_OFFSET_Y, usagizaCenterY - centerY));
      }
    }
  } else if (poemAnimationState === 'returning') {
    // 画像を中央に戻し中
    const elapsed = now - animationStartTime;
    const progress = Math.min(elapsed / animationDuration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    offsetX = startOffsetX + (targetOffsetX - startOffsetX) * easedProgress;
    offsetY = startOffsetY + (targetOffsetY - startOffsetY) * easedProgress;
    
    if (progress >= 1) {
      poemAnimationState = 'idle';
      isAnimating = false;
      titleOpacity = 0;
      poemOpacity = 0;
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
  if (isHoveringUsagiza && !dragging && poemAnimationState === 'idle') {
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