const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const title = document.querySelector('.result') || document.querySelector('h1');
const rollBtn = document.getElementById('rollBtn');
const stage = document.querySelector('.stage');
const muteBtn = document.getElementById('muteBtn');
const confettiCanvas = document.getElementById('confetti-canvas');

// audio / mute state
let audioCtx = null;
let isMuted = localStorage.getItem('dicee-muted') === 'true';
if(muteBtn){ muteBtn.setAttribute('aria-pressed', isMuted ? 'true':'false'); muteBtn.textContent = isMuted ? '🔇' : '🔊'; }

function rand(){return Math.floor(Math.random()*6)+1}

function setDice(imgEl, n){ imgEl.src = `images/dice${n}.png`; }

function roll(){
    // add shake animation
    img1.classList.add('shake');
    img2.classList.add('shake');
    title.classList.remove('winner','draw');
    title.textContent = 'Rolling...';
    // play roll sound
    playRollSound();

    setTimeout(()=>{
        const r1 = rand();
        const r2 = rand();
        setDice(img1, r1);
        setDice(img2, r2);

        img1.classList.remove('shake');
        img2.classList.remove('shake');

        if(r1>r2){ title.textContent = '🚩 Player 1 Wins!'; title.classList.add('winner'); playWinSound(); launchConfetti(); }
        else if(r2>r1){ title.textContent = 'Player 2 Wins! 🚩'; title.classList.add('winner'); playWinSound(); launchConfetti(); }
        else{ title.textContent = 'Draw!'; title.classList.add('draw'); }
    }, 700);
}

// initial roll on load
window.addEventListener('load', ()=>{
    // entrance animation
    requestAnimationFrame(()=>{
        setTimeout(()=>{ stage && stage.classList.add('ready'); }, 80);
    });

    roll();
});

rollBtn && rollBtn.addEventListener('click', roll);

// space to roll (prevent page scroll)
document.addEventListener('keydown', e=>{
    if(e.code === 'Space' || e.key === ' '){ e.preventDefault(); roll(); }
});

// mute button toggle
if(muteBtn){
    muteBtn.addEventListener('click', ()=>{
        isMuted = !isMuted;
        localStorage.setItem('dicee-muted', isMuted);
        muteBtn.setAttribute('aria-pressed', isMuted ? 'true':'false');
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
    });
}

/* ------------------ Simple synthesized sounds ------------------ */
function ensureAudio(){
    if(isMuted) return null;
    if(!audioCtx){
        try{ audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }catch(e){ audioCtx = null; }
    }
    return audioCtx;
}

function playRollSound(){
    const ctx = ensureAudio(); if(!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(220, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.24);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.26);
}

function playWinSound(){
    const ctx = ensureAudio(); if(!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(440, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.28);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.6);
}

/* ------------------ Confetti: lightweight canvas particles ------------------ */
function launchConfetti(){
    if(!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    let w = confettiCanvas.width = window.innerWidth;
    let h = confettiCanvas.height = window.innerHeight;
    const colors = ["#00ffd5","#6c6cff","#ffd166","#ff6b6b","#9be15d"];
    const particles = [];
    const count = Math.floor(60 + Math.random()*60);

    for(let i=0;i<count;i++){
        particles.push({
            x: Math.random()*w,
            y: -20 - Math.random()*h*0.2,
            vx: (Math.random()-0.5)*6,
            vy: 2 + Math.random()*6,
            size: 6 + Math.random()*10,
            rot: Math.random()*360,
            vr: (Math.random()-0.5)*12,
            color: colors[Math.floor(Math.random()*colors.length)]
        });
    }

    let start = performance.now();
    const duration = 1800;
    function frame(now){
        const t = now - start;
        ctx.clearRect(0,0,w,h);
        for(let p of particles){
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.12; // gravity
            p.rot += p.vr;
            ctx.save();
            ctx.translate(p.x,p.y);
            ctx.rotate(p.rot * Math.PI/180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
            ctx.restore();
        }
        if(t < duration){
            requestAnimationFrame(frame);
        } else {
            // fade out
            const fadeStart = performance.now();
            (function fade(){
                const ft = performance.now()-fadeStart;
                ctx.clearRect(0,0,w,h);
                for(let p of particles){
                    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot * Math.PI/180);
                    ctx.globalAlpha = Math.max(0, 1 - ft/500);
                    ctx.fillStyle = p.color; ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
                    ctx.restore();
                }
                if(ft < 520) requestAnimationFrame(fade);
                else ctx.clearRect(0,0,w,h);
            })();
        }
    }
    requestAnimationFrame(frame);
}