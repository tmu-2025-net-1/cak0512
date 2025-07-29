// 星座の設定
const CONSTELLATIONS = [
  {
    name: 'usagi',
    title: 'うさぎ',
    x: 1000,
    y: 500,
    poemLines: [
      'あんなに　おひさま',
      'わらってたのに',
      'きづいた　ときには',
      'かえっていった',
      'あんなに　おはなが',
      'さいてたのに',
      'かぜに　のって',
      'かえっていった',
      'ほしぞら　ひとり',
      'あるいてく',
      'あしたを　ずっと',
      'まっている',
      'さみしい',
      '　',
      '　',
      '　'
    ]
  },
  {
    name: 'cop',
    title: 'こっぷ',
    x: 3500,
    y: 300,
    poemLines: [
      'よぞらに　うかぶ',
      'ふしぎな　こっぷ',
      'ゆっくり　よるが',
      'たまっていく',
      'つきの　ひかり',
      'ほしの　かけら',
      'すんだ　くうき',
      '　',
      'おひさま　くるまで',
      'だれにも　あげない',
      'よるだけ　みえる',
      'たからもの'
    ]
  },
  {
    name: 'kujira',
    title: 'くじら',
    x: 2300,
    y: 200,
    poemLines: [
      'かがやく　うみを',
      'ゆっくり　すすむ',
      'おおきな　かげ',
      '　',
      'せなかに　ゆめを',
      'たくさん　しょって',
      'あなたの　もとへ',
      '　',
      'しずかな　くうきに',
      'ゆめを　とかして',
      'なみに　のって',
      'かえっていく',
      'だれも　しらない',
      'よるの　おはなし',
      '　',
      '　'
    ]
  },
  {
    name: 'okami',
    title: 'おおかみ',
    x: 3000,
    y: 800,
    poemLines: [
      'ずっと　ひとりでも',
      'ぼくは',
      'だいじょうぶだよ',
      '　',
      'どんなに　ゆびを',
      'さされても',
      'ぼくは',
      'だいじょうぶだよ',
      '　',
      '　',
      '　',
      '　',
      '　',
      'でもね',
      'ほんとはね',
      '　'
    ]
  },
  {
    name: 'hutago',
    title: 'ふたご',
    x: 600,
    y: 2000,
    poemLines: [
      'なかよし　ふたりは',
      'ずっと　いっしょ',
      'なにを　するにも',
      'ずっと　いっしょ',
      'だけど　かたわれ',
      'ふしぎな　ところ',
      'えいえんの　ねむり',
      'つけない　ところ',
      'ひとり　まっかにそまって',
      'ねむっても',
      'ひとり　まっさおになって',
      'たちつくす',
      'かがやく　うみで',
      'かれは　よりそう',
      'だって　ぼくらは',
      'ずっと　いっしょ'
    ]
  },
  {
    name: 'otome',
    title: 'おとめ',
    x: 1900,
    y: 1100,
    poemLines: [
      'あなたと　はなすと',
      'こころが　ぽかぽかするの',
      'なんでだろう',
      '　',
      'あなたと　めがあうと',
      'こころが　ぴょんとはねるの',
      'なんでだろう',
      '　',
      'あなたに　おくることば',
      'なんども　けした',
      '　',
      '　',
      'だって　これが',
      'さいごかも',
      'しれないから',
      '　'
    ]
  },
  {
    name: 'tenbin',
    title: 'てんびん',
    x: 100,
    y: 800,
    poemLines: [
      'みぎてと　ひだりてに',
      'ちがうもの　もって',
      'どちらが　だいじか',
      'くらべるの',
      'わたしが　だした',
      'こたえに',
      'だれかが　ないても',
      'みてみぬふり',
      'だって　これが',
      'ぜったい　だから',
      '　',
      '　'
    ]
  },
  {
    name: 'tokei',
    title: 'とけい',
    x: 3000,
    y: 2000,
    poemLines: [
      'この　おんなのこは',
      'ごばんめ',
      '　',
      '　',
      'よんばんめの　おとこのこは',
      'さんじを　しらせると',
      'どこかへ　かけて',
      'ほっぺを　ふくらませる',
      'さんばんめの　おんなのこは',
      'わたしの　おおきなからだに',
      'ちいさなみみを　くっつけて',
      'そっと　めをとじる',
      'そのまえの　こどもたちは',
      'ぼやっとして　きえてしまった',
      '　',
      'つぎは　だれだろうか'
    ]
  }
];

// システム変数
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let offsetX = 0, offsetY = 0;
let dragging = false;
let dragStartX, dragStartY;
let mouseX = 0, mouseY = 0;

// 各星座の状態管理
let constellationStates = {};
CONSTELLATIONS.forEach(constellation => {
  constellationStates[constellation.name] = {
    isHovering: false,
    lineImage: new Image(),
    pointImage: new Image(),
    lineLoaded: false,
    pointLoaded: false,
    lineOpacity: 0,
    lineTargetOpacity: 0,
    lineOpacityAnimationStart: 0,
    isNear: false,
    hasPlayedNearSound: false,
    hasPlayedHoverSound: false,
    poemAnimationState: 'idle',
    currentPoemGroup: 0,
    poemOpacity: 0,
    titleOpacity: 0,
    poemAnimationStartTime: 0
  };
});

// アニメーション関連の変数
let isAnimating = false;
let animationStartTime = 0;
let animationDuration = 2000;
let startOffsetX = 0, startOffsetY = 0;
let targetOffsetX = 0, targetOffsetY = 0;
let activeConstellation = null; // 現在アクティブな星座

// 音声関連
let bellSound = new Audio('sounds/bell.mp3');
let audioInitialized = false;
bellSound.preload = 'auto';
bellSound.load();

// 星の移動範囲の制限
const STAR_FIELD_WIDTH = 4000;
const STAR_FIELD_HEIGHT = 4000;
const MIN_OFFSET_X = 0;
const MIN_OFFSET_Y = 0;
const MAX_OFFSET_X = STAR_FIELD_WIDTH - window.innerWidth;
const MAX_OFFSET_Y = STAR_FIELD_HEIGHT - window.innerHeight;

// 画像を読み込み
CONSTELLATIONS.forEach(constellation => {
  const state = constellationStates[constellation.name];
  
  state.lineImage.onload = () => {
    state.lineLoaded = true;
  };
  state.lineImage.src = `images/${constellation.name}_line.PNG`;
  
  state.pointImage.onload = () => {
    state.pointLoaded = true;
  };
  state.pointImage.src = `images/${constellation.name}_point.PNG`;
});

// イージング関数
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// 音声再生関数
function playBellSound(volume) {
  try {
    if (!audioInitialized) {
      bellSound.load();
      audioInitialized = true;
    }
    
    bellSound.currentTime = 0;
    bellSound.volume = volume;
    
    const playPromise = bellSound.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('音声再生成功:', volume * 100 + '%音量');
        })
        .catch(error => {
          console.log('音声再生エラー:', error);
        });
    }
  } catch (error) {
    console.log('音声再生エラー:', error);
  }
}

// 音声初期化
function initializeAudio() {
  if (!audioInitialized) {
    try {
      bellSound.play().then(() => {
        bellSound.pause();
        bellSound.currentTime = 0;
        audioInitialized = true;
        console.log('音声初期化完了');
      }).catch(() => {
        console.log('音声初期化失敗');
      });
    } catch (error) {
      console.log('音声初期化エラー:', error);
    }
  }
}

// 星座のアニメーション開始
function startConstellationAnimation(constellationName) {
  if (isAnimating || activeConstellation) return;
  
  const constellation = CONSTELLATIONS.find(c => c.name === constellationName);
  const state = constellationStates[constellationName];
  
  activeConstellation = constellationName;
  state.poemAnimationState = 'moving';
  state.currentPoemGroup = 0;
  state.poemOpacity = 0;
  state.titleOpacity = 0;
  
  // line画像を100%透明度に
  if (state.lineOpacity === 0.6) {
    state.lineTargetOpacity = 1.0;
    state.lineOpacityAnimationStart = 0;
  } else {
    state.lineOpacity = 0.6;
    state.lineTargetOpacity = 1.0;
    state.lineOpacityAnimationStart = 0;
  }
  
  isAnimating = true;
  animationStartTime = Date.now();
  startOffsetX = offsetX;
  startOffsetY = offsetY;
  
  // 星座を左側に移動
  const targetScreenX = 100;
  const centerY = window.innerHeight / 2;
  const scaleFactor = 0.7;
  const constellationHeight = (state.lineImage.height || 423) * scaleFactor;
  const constellationCenterY = constellation.y + constellationHeight / 2;
  
  targetOffsetX = Math.max(MIN_OFFSET_X, Math.min(MAX_OFFSET_X, constellation.x - targetScreenX));
  targetOffsetY = Math.max(MIN_OFFSET_Y, Math.min(MAX_OFFSET_Y, constellationCenterY - centerY));
}

// アニメーション終了
function returnToCenter() {
  if (!activeConstellation) return;
  
  const state = constellationStates[activeConstellation];
  state.poemAnimationState = 'fadeOut';
  animationStartTime = Date.now();
  
  state.lineTargetOpacity = 0;
  state.lineOpacityAnimationStart = 0;
}

// 星を作成
function createStars(count) {
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 4000,
      y: Math.random() * 4000,
      radius: Math.random() * 1.5 + 0.5,
      twinkle: Math.random()
    });
  }
}

// 描画関数
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
  
  // 全ての星座を描画
  CONSTELLATIONS.forEach(constellation => {
    const state = constellationStates[constellation.name];
    if (state.lineLoaded && state.pointLoaded) {
      drawConstellation(constellation, state);
    }
  });
}

// 星座描画
function drawConstellation(constellation, state) {
  const screenX = constellation.x - offsetX;
  const screenY = constellation.y - offsetY;
  
  // ホバー時のグロー効果
  if (state.isHovering) {
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }
  
  const scaleFactor = 0.7;
  const scaledWidth = state.lineImage.width * scaleFactor;
  const scaledHeight = state.lineImage.height * scaleFactor;
  
  // line画像を透明度付きで描画
  if (state.lineOpacity > 0) {
    ctx.globalAlpha = state.lineOpacity;
    ctx.drawImage(state.lineImage, screenX, screenY, scaledWidth, scaledHeight);
    ctx.globalAlpha = 1.0;
  }
  
  // point画像は常に描画
  ctx.drawImage(state.pointImage, screenX, screenY, scaledWidth, scaledHeight);
  
  // シャドウをリセット
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  
  // 詩のアニメーション中のみ詩を表示
  if (activeConstellation === constellation.name && state.poemAnimationState !== 'idle') {
    drawPoem(constellation, state, screenX, screenY, scaledWidth, scaledHeight);
  }
}

// 詩の描画
function drawPoem(constellation, state, screenX, screenY, scaledWidth, scaledHeight) {
  const title = constellation.title;
  const poemLines = constellation.poemLines;
  const poemLineHeight = 50;
  const columnSpacing = 100;
  
  const totalGroups = 4;
  let currentLines = [];
  
  if (state.currentPoemGroup === 0) {
    currentLines = poemLines.slice(0, 4);
  } else if (state.currentPoemGroup === 1) {
    currentLines = poemLines.slice(4, 8);
  } else if (state.currentPoemGroup === 2) {
    currentLines = poemLines.slice(8, 12);
  } else if (state.currentPoemGroup === 3) {
    currentLines = poemLines.slice(12, 16);
  }
  
  // 詩を描画
  currentLines.forEach((line, columnIndex) => {
    const reverseIndex = currentLines.length - 1 - columnIndex;
    const columnX = screenX + scaledWidth + 50 + (reverseIndex * columnSpacing);
    const startY = screenY + 50;
    
    ctx.font = '50px NewStarWords, sans-serif';
    ctx.fillStyle = `rgba(255, 255, 255, ${state.poemOpacity})`;
    
    for (let i = 0; i < line.length; i++) {
      ctx.fillText(line[i], columnX, startY + (i * poemLineHeight));
    }
  });
  
  // タイトルを描画
  const titleX = screenX + scaledWidth + 50 + (4 * columnSpacing);
  const titleY = screenY + 50;
  ctx.font = '80px NewStarWords, sans-serif';
  ctx.fillStyle = `rgba(255, 255, 255, ${state.titleOpacity})`;
  for (let i = 0; i < title.length; i++) {
    ctx.fillText(title[i], titleX, titleY + (i * poemLineHeight));
  }
  
  // もどるボタン
  const backText = 'もどる';
  const backX = screenX + scaledWidth + 50 + (5 * columnSpacing);
  const backY = screenY + 300;
  ctx.font = '40px NewStarWords, sans-serif';
  ctx.fillStyle = `rgba(255, 255, 255, ${state.titleOpacity})`;
  for (let i = 0; i < backText.length; i++) {
    ctx.fillText(backText[i], backX, backY + (i * 40));
  }
}

// アニメーションループ
function animate() {
  const now = Date.now();
  
  // 各星座の透明度アニメーション処理
  CONSTELLATIONS.forEach(constellation => {
    const state = constellationStates[constellation.name];
    
    if (state.lineTargetOpacity !== state.lineOpacity) {
      if (state.lineOpacityAnimationStart === 0) {
        state.lineOpacityAnimationStart = now;
      }
      
      const opacityElapsed = now - state.lineOpacityAnimationStart;
      const opacityDuration = (state.lineTargetOpacity > state.lineOpacity) ? 2000 : 100;
      const opacityProgress = Math.min(opacityElapsed / opacityDuration, 1);
      
      if (state.lineTargetOpacity > state.lineOpacity) {
        state.lineOpacity = state.lineTargetOpacity * opacityProgress;
      } else {
        state.lineOpacity = state.lineOpacity * (1 - opacityProgress);
      }
      
      if (opacityProgress >= 1) {
        state.lineOpacity = state.lineTargetOpacity;
        state.lineOpacityAnimationStart = 0;
      }
    }
  });
  
  // アクティブな星座の詩アニメーション処理
  if (activeConstellation) {
    const state = constellationStates[activeConstellation];
    
    if (state.poemAnimationState === 'moving') {
      const elapsed = now - animationStartTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      offsetX = startOffsetX + (targetOffsetX - startOffsetX) * easedProgress;
      offsetY = startOffsetY + (targetOffsetY - startOffsetY) * easedProgress;
      
      if (progress >= 1) {
        state.poemAnimationState = 'showing';
        state.poemAnimationStartTime = now;
        isAnimating = false;
      }
    } else if (state.poemAnimationState === 'showing') {
      const elapsed = now - state.poemAnimationStartTime;
      const totalGroups = 4;
      
      if (state.currentPoemGroup < totalGroups) {
        const cycleTime = 5000;
        const groupElapsed = elapsed - (state.currentPoemGroup * cycleTime);
        
        if (state.currentPoemGroup === 0) {
          if (groupElapsed <= 1000) {
            state.titleOpacity = Math.min(groupElapsed / 1000, 1);
          } else {
            state.titleOpacity = 1;
          }
        } else {
          state.titleOpacity = 1;
        }
        
        if (groupElapsed <= 1000) {
          state.poemOpacity = Math.min(groupElapsed / 1000, 1);
        } else if (groupElapsed <= 4000) {
          state.poemOpacity = 1;
        } else if (groupElapsed <= 5000) {
          state.poemOpacity = Math.max(1 - (groupElapsed - 4000) / 1000, 0);
        } else {
          state.currentPoemGroup++;
          state.poemOpacity = 0;
        }
      } else {
        const titleFadeElapsed = elapsed - (totalGroups * 5000);
        if (titleFadeElapsed <= 1000) {
          const fadeProgress = titleFadeElapsed / 1000;
          state.titleOpacity = Math.max(1 - fadeProgress, 0);
          state.lineOpacity = Math.max(1 - fadeProgress, 0);
        } else {
          state.poemAnimationState = 'returning';
          animationStartTime = now;
          startOffsetX = offsetX;
          startOffsetY = offsetY;
          
          state.lineOpacity = 0;
          state.lineTargetOpacity = 0;
          state.lineOpacityAnimationStart = 0;
          
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const constellation = CONSTELLATIONS.find(c => c.name === activeConstellation);
          const scaleFactor = 0.7;
          const constellationWidth = (state.lineImage.width || 530) * scaleFactor;
          const constellationHeight = (state.lineImage.height || 423) * scaleFactor;
          const constellationCenterX = constellation.x + constellationWidth / 2;
          const constellationCenterY = constellation.y + constellationHeight / 2;
          
          targetOffsetX = Math.max(MIN_OFFSET_X, Math.min(MAX_OFFSET_X, constellationCenterX - centerX));
          targetOffsetY = Math.max(MIN_OFFSET_Y, Math.min(MAX_OFFSET_Y, constellationCenterY - centerY));
        }
      }
    } else if (state.poemAnimationState === 'fadeOut') {
      const elapsed = now - animationStartTime;
      const fadeOutDuration = 1000;
      
      if (elapsed <= fadeOutDuration) {
        const progress = elapsed / fadeOutDuration;
        state.titleOpacity = Math.max(1 - progress, 0);
        state.poemOpacity = Math.max(1 - progress, 0);
        state.lineOpacity = Math.max(1 - progress, 0);
      } else {
        state.titleOpacity = 0;
        state.poemOpacity = 0;
        state.lineOpacity = 0;
        state.poemAnimationState = 'returning';
        animationStartTime = now;
        startOffsetX = offsetX;
        startOffsetY = offsetY;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const constellation = CONSTELLATIONS.find(c => c.name === activeConstellation);
        const scaleFactor = 0.7;
        const constellationWidth = (state.lineImage.width || 530) * scaleFactor;
        const constellationHeight = (state.lineImage.height || 423) * scaleFactor;
        const constellationCenterX = constellation.x + constellationWidth / 2;
        const constellationCenterY = constellation.y + constellationHeight / 2;
        
        targetOffsetX = Math.max(MIN_OFFSET_X, Math.min(MAX_OFFSET_X, constellationCenterX - centerX));
        targetOffsetY = Math.max(MIN_OFFSET_Y, Math.min(MAX_OFFSET_Y, constellationCenterY - centerY));
      }
    } else if (state.poemAnimationState === 'returning') {
      const elapsed = now - animationStartTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      offsetX = startOffsetX + (targetOffsetX - startOffsetX) * easedProgress;
      offsetY = startOffsetY + (targetOffsetY - startOffsetY) * easedProgress;
      
      if (progress >= 1) {
        state.poemAnimationState = 'idle';
        isAnimating = false;
        state.titleOpacity = 0;
        state.poemOpacity = 0;
        activeConstellation = null;
        
        state.lineTargetOpacity = state.isHovering ? 0.6 : 0;
        state.lineOpacityAnimationStart = 0;
      }
    }
  }
  
  // ホバー判定の更新
  CONSTELLATIONS.forEach(constellation => {
    const state = constellationStates[constellation.name];
    if (state.lineLoaded && state.pointLoaded) {
      const screenX = constellation.x - offsetX;
      const screenY = constellation.y - offsetY;
      const scaleFactor = 0.7;
      const constellationWidth = (state.lineImage.width || 530) * scaleFactor;
      const constellationHeight = (state.lineImage.height || 423) * scaleFactor;
      
      const constellationCenterX = screenX + constellationWidth / 2;
      const constellationCenterY = screenY + constellationHeight / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - constellationCenterX, 2) + Math.pow(mouseY - constellationCenterY, 2)
      );
      
      const wasHovering = state.isHovering;
      state.isHovering = mouseX >= screenX && mouseX <= screenX + constellationWidth &&
                        mouseY >= screenY && mouseY <= screenY + constellationHeight;
      
      const wasNear = state.isNear;
      state.isNear = distance <= 550;
      
      if (!activeConstellation) {
        if (state.isNear && !wasNear && !state.hasPlayedNearSound) {
          playBellSound(0.1);
          state.hasPlayedNearSound = true;
          state.hasPlayedHoverSound = false;
        }
        
        if (state.isHovering && !wasHovering && !state.hasPlayedHoverSound && state.isNear) {
          playBellSound(0.5);
          state.hasPlayedHoverSound = true;
        }

        if (!state.isNear && wasNear) {
          state.hasPlayedNearSound = false;
          state.hasPlayedHoverSound = false;
        }
      }
      
      if (state.isHovering && !wasHovering) {
        if (state.poemAnimationState === 'idle') {
          state.lineTargetOpacity = 0.6;
          state.lineOpacityAnimationStart = 0;
        }
      } else if (!state.isHovering && wasHovering) {
        if (state.poemAnimationState === 'idle') {
          state.lineTargetOpacity = 0;
          state.lineOpacityAnimationStart = 0;
        }
      }
    }
  });
  
  drawStars();
  requestAnimationFrame(animate);
}

// イベントリスナー
canvas.addEventListener('mousedown', (e) => {
  if (activeConstellation) return;
  
  dragging = true;
  dragStartX = e.clientX + offsetX;
  dragStartY = e.clientY + offsetY;
});

canvas.addEventListener('mouseup', () => {
  dragging = false;
});

canvas.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (dragging && !activeConstellation) {
    const newOffsetX = dragStartX - e.clientX;
    const newOffsetY = dragStartY - e.clientY;
    
    offsetX = Math.max(MIN_OFFSET_X, Math.min(MAX_OFFSET_X, newOffsetX));
    offsetY = Math.max(MIN_OFFSET_Y, Math.min(MAX_OFFSET_Y, newOffsetY));
  }
});

canvas.addEventListener('click', (e) => {
  initializeAudio();
  
  if (!dragging) {
    // どの星座がクリックされたかチェック
    CONSTELLATIONS.forEach(constellation => {
      const state = constellationStates[constellation.name];
      if (state.isHovering && !activeConstellation) {
        startConstellationAnimation(constellation.name);
      }
    });
    
    // もどるボタンのクリック判定
    if (activeConstellation) {
      const activeState = constellationStates[activeConstellation];
      const activeConst = CONSTELLATIONS.find(c => c.name === activeConstellation);
      const screenX = activeConst.x - offsetX;
      const screenY = activeConst.y - offsetY;
      const scaleFactor = 0.7;
      const scaledWidth = activeState.lineImage.width * scaleFactor;
      const backX = screenX + scaledWidth + 50 + (5 * 100);
      const backY = screenY + 300;
      
      if (mouseX >= backX - 20 && mouseX <= backX + 60 &&
          mouseY >= backY - 20 && mouseY <= backY + 140) {
        returnToCenter();
      }
    }
  }
});

// 初期化
createStars(1000);
animate();

// ウィンドウリサイズ時の処理
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const newMaxOffsetX = STAR_FIELD_WIDTH - window.innerWidth;
  const newMaxOffsetY = STAR_FIELD_HEIGHT - window.innerHeight;
  
  offsetX = Math.max(MIN_OFFSET_X, Math.min(newMaxOffsetX, offsetX));
  offsetY = Math.max(MIN_OFFSET_Y, Math.min(newMaxOffsetY, offsetY));
});

// タイトルのフェードイン・フェードアウトアニメーション
window.addEventListener('load', () => {
  const title = document.getElementById('title');
  
  if (title) {
    setTimeout(() => {
      title.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
      title.style.opacity = '0';
    }, 4000);
  }
});
