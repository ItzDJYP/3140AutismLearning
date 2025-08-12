const SCENARIOS = [

  {
    id: 'join-blocks-1', emoji: '🧩', diff: 1,
    text: 'Two kids you do not know are building with blocks. You want to play too. What should you do first?',
    options: [
      { label: 'Introduce yourself and ask, “Can I play with you?”', correct: true,  explain: 'Friendly words help you join the game.', icon:'🤝' },
      { label: 'Sit down quietly and start building without talking', correct: false, explain: 'Joining without words can confuse others.', icon:'🤫' },
      { label: 'Take some blocks and build your own tower next to them', correct: false, explain: 'Taking without asking can feel unfriendly.', icon:'✋' },
    ]
  },
  {
    id: 'share-crayon-1', emoji: '🖍️', diff: 1,
    text: 'A classmate is using the red crayon you want. What could you say?',
    options: [
      { label: '“Can we share the red crayon?”', correct: true, explain: 'Asking to share is polite and friendly.', icon:'🧑‍🤝‍🧑' },
      { label: 'Wait next to them without saying anything', correct: false, explain: 'Waiting is patient, but words help friends know what you want.', icon:'⏳' },
      { label: '“Give it to me now!”', correct: false, explain: 'Shouting can hurt feelings.', icon:'⚠️' },
    ]
  },
  {
    id: 'turn-taking-1', emoji: '🎲', diff: 1,
    text: 'You and a friend want the same game piece. What’s a friendly choice?',
    options: [
      { label: '“Let’s take turns.”', correct: true, explain: 'Taking turns lets everyone play.', icon:'🔄' },
      { label: 'Keep holding it and say nothing', correct: false, explain: 'Silence can feel bossy; use friendly words.', icon:'🤐' },
      { label: 'Hide the piece so no one can use it', correct: false, explain: 'Hiding ends the game for everyone.', icon:'🙈' },
    ]
  },
  {
    id: 'greet-new-1', emoji: '👋', diff: 1,
    text: 'A new child comes to your table. What could you say to make a friend?',
    options: [
      { label: '“Hi, I’m ___. What’s your name?”', correct: true, explain: 'A hello and your name invite a new friend to talk.', icon:'🙂' },
      { label: 'Smile and look at them but say nothing', correct: false, explain: 'Smiles help, but words start the friendship.', icon:'😊' },
      { label: 'Ignore them and keep working', correct: false, explain: 'Ignoring can feel unkind.', icon:'🚫' },
    ]
  },
  {
    id: 'trade-toys-1', emoji: '🚗', diff: 1,
    text: 'You want to try a friend’s toy car. What is a friendly way?',
    options: [
      { label: '“Can we trade toys and then trade back?”', correct: true, explain: 'Trading is fair and keeps play going.', icon:'🔁' },
      { label: 'Take the car and say, “I’ll give it back later”', correct: false, explain: 'Taking first can upset friends.', icon:'✋' },
      { label: 'Stare at the car and wait for them to stop', correct: false, explain: 'Use friendly words to ask.', icon:'👀' },
    ]
  },

  {
    id: 'comfort-rip-2', emoji: '🧸', diff: 2,
    text: 'A classmate looks sad because their drawing ripped. What helps friendship?',
    options: [
      { label: '“I’m sorry that happened. Do you want help fixing it?”', correct: true, explain: 'Kind words and help show you care.', icon:'🫶' },
      { label: 'Ignore it so they can figure it out', correct: false, explain: 'Friends notice feelings and offer help.', icon:'😶' },
      { label: 'Laugh and say, “Oops!”', correct: false, explain: 'Laughing can hurt feelings.', icon:'😕' },
    ]
  },
  {
    id: 'wait-minute-2', emoji: '⏳', diff: 2,
    text: 'You asked to play and they say, “In a minute.” What now?',
    options: [
      { label: '“Okay, I’ll wait,” and check back once', correct: true, explain: 'Waiting shows respect and helps you join later.', icon:'👍' },
      { label: 'Ask again and again every few seconds', correct: false, explain: 'Repeating can bother others.', icon:'🔁' },
      { label: 'Walk away and shout “Fine!”', correct: false, explain: 'Big reactions can stop friendships.', icon:'💢' },
    ]
  },
  {
    id: 'oops-tower-2', emoji: '🧱', diff: 2,
    text: 'You bump a tower and it falls. What repairs friendship?',
    options: [
      { label: '“I’m sorry. I can help rebuild.”', correct: true, explain: 'Apologizing and fixing it shows responsibility.', icon:'🧰' },
      { label: 'Say, “Not my fault,” and keep playing', correct: false, explain: 'Even accidents need gentle words.', icon:'🤷' },
      { label: 'Run away so they don’t see you', correct: false, explain: 'Running away can make it worse.', icon:'🏃' },
    ]
  },
  {
    id: 'line-slide-2', emoji: '🛝', diff: 2,
    text: 'There is a line for the slide. What is the friendly choice?',
    options: [
      { label: 'Wait your turn and cheer for others', correct: true, explain: 'Waiting your turn keeps play fair.', icon:'🫱' },
      { label: 'Go in front when no one is looking', correct: false, explain: 'Cutting makes others upset.', icon:'⚠️' },
      { label: 'Stand very close and push forward', correct: false, explain: 'Crowding and pushing is unsafe.', icon:'🚧' },
    ]
  },
  {
    id: 'rule-change-2', emoji: '📏', diff: 2,
    text: 'Friends are playing a game with rules you do not know. How can you join?',
    options: [
      { label: 'Ask, “How do you play? Can you show me?”', correct: true, explain: 'Asking to learn shows interest and respect.', icon:'🗣️' },
      { label: 'Tell them to play by your rules instead', correct: false, explain: 'Changing rules can stop play.', icon:'🛑' },
      { label: 'Start playing your own way without asking', correct: false, explain: 'That can cause confusion and arguments.', icon:'🤨' },
    ]
  },

  {
    id: 'join-roles-3', emoji: '🎭', diff: 3,
    text: 'Two kids are already playing “zoo.” You want to join. What’s best?',
    options: [
      { label: '“What are you playing? Can I be the helper who feeds the animals?”', correct: true, explain: 'Joining their plan and offering a role shows respect.', icon:'🦓' },
      { label: '“Stop your game—play mine instead.”', correct: false, explain: 'Stopping friends’ game can end play.', icon:'🛑' },
      { label: 'Stand and watch without talking', correct: false, explain: 'Watching is okay, but words help you join.', icon:'👀' },
      { label: 'Grab the toy animal and start a new story', correct: false, explain: 'Taking control can upset others.', icon:'✋' },
    ]
  },
  {
    id: 'toy-car-fair-3', emoji: '🚙', diff: 3,
    text: 'You and a friend both want the same toy car. What is the fairest plan?',
    options: [
      { label: 'Use a timer to take turns', correct: true, explain: 'Timers make turns clear and fair.', icon:'⏱️' },
      { label: 'Say, “I get it forever.”', correct: false, explain: 'Forever is not fair to friends.', icon:'🙅' },
      { label: 'Throw the car so no one plays', correct: false, explain: 'Breaking play hurts friendships.', icon:'💥' },
      { label: 'Grab it and run away', correct: false, explain: 'Grabbing stops the game.', icon:'🚫' },
    ]
  },
  {
    id: 'rejection-calm-3', emoji: '🌧️', diff: 3,
    text: 'You asked to play and they said “No.” What keeps the friendship okay?',
    options: [
      { label: '“Okay. Maybe later,” then find another friend/activity', correct: true, explain: 'Staying calm keeps doors open for later.', icon:'🙂' },
      { label: 'Keep following them and asking', correct: false, explain: 'That can annoy others.', icon:'🚶' },
      { label: 'Yell, “You’re mean!”', correct: false, explain: 'Name-calling hurts and ends play.', icon:'😠' },
      { label: 'Cry at them loudly', correct: false, explain: 'It’s okay to feel sad—ask an adult for help instead.', icon:'😢' },
    ]
  },
  {
    id: 'accident-tag-3', emoji: '🏷️', diff: 3,
    text: 'During tag, you bump someone and they fall. What repairs the game and friendship?',
    options: [
      { label: 'Say, “Are you okay? I’m sorry—let’s play safely,” and offer a hand', correct: true, explain: 'Checking in and apologizing repairs trust.', icon:'🫱🏻‍🫲🏽' },
      { label: 'Say, “Not my fault,” and keep running', correct: false, explain: 'Ignoring feelings can end play.', icon:'🏃' },
      { label: 'Tell them it was their fault', correct: false, explain: 'Blaming makes it worse.', icon:'☹️' },
      { label: 'Leave the game and hide', correct: false, explain: 'Running away doesn’t fix the problem.', icon:'🙈' },
    ]
  },
  {
    id: 'group-plan-3', emoji: '🧠', diff: 3,
    text: 'Four kids are building a big city. You want to help. What’s the best way to join?',
    options: [
      { label: 'Ask, “What part can I build?” and listen to their plan', correct: true, explain: 'Joining the plan shows teamwork.', icon:'🏗️' },
      { label: 'Knock down a small part to make room for yours', correct: false, explain: 'Breaking things upsets friends.', icon:'🧱' },
      { label: 'Build a separate city without talking', correct: false, explain: 'Separate play does not join the group.', icon:'🏙️' },
      { label: 'Tell them your way is better and take charge', correct: false, explain: 'Taking over can stop the fun.', icon:'📣' },
    ]
  },


  {
    id: 'negotiate-rules-4', emoji: '📋', diff: 4,
    text: 'Friends disagree about the game rules. You want everyone to keep playing. What’s best?',
    options: [
      { label: 'Say, “Let’s agree on the rule and start fresh,” then repeat the rule together', correct: true, explain: 'Restarting with a shared rule keeps play fair.', icon:'🧭' },
      { label: 'Keep arguing your rule until they give up', correct: false, explain: 'Arguing can end play.', icon:'💢' },
      { label: 'Walk away angry', correct: false, explain: 'Big feelings are okay—use calm words instead.', icon:'😤' },
      { label: 'Play by your rule without telling anyone', correct: false, explain: 'Secret rules cause confusion.', icon:'🤐' },
    ]
  },
  {
    id: 'invite-shy-4', emoji: '🐣', diff: 4,
    text: 'A child is playing alone and watching you. You want to include them. What helps?',
    options: [
      { label: '“Do you want to build with me? You can choose the colors.”', correct: true, explain: 'Inviting and giving a role helps new friends join.', icon:'🎨' },
      { label: 'Sit near them and copy their play silently', correct: false, explain: 'Copying is okay, but words invite someone in.', icon:'👀' },
      { label: 'Say, “Come now. We need you.”', correct: false, explain: 'Telling, not asking, can feel bossy.', icon:'📣' },
      { label: 'Ignore them so they don’t feel shy', correct: false, explain: 'Ignoring keeps them out of play.', icon:'🚫' },
    ]
  },
  {
    id: 'spill-art-4', emoji: '🧼', diff: 4,
    text: 'You spill water on a friend’s picture by accident. What repairs the friendship?',
    options: [
      { label: '“I’m sorry. Let’s get towels—can I help fix it?”', correct: true, explain: 'Apology + action shows you care.', icon:'🧻' },
      { label: 'Say, “It will dry,” and walk away', correct: false, explain: 'Minimizing feelings can hurt trust.', icon:'🌬️' },
      { label: 'Hide the paper so no one sees', correct: false, explain: 'Hiding avoids the problem.', icon:'🙈' },
      { label: 'Blame the wobbly table', correct: false, explain: 'Blame doesn’t repair feelings.', icon:'🪑' },
    ]
  },
  {
    id: 'swing-rotation-4', emoji: '🔄', diff: 4,
    text: 'A friend keeps saying “one more turn” on the swing. What’s fair?',
    options: [
      { label: 'Use a timer and agree each person gets one minute, then switch', correct: true, explain: 'Clear turns keep play fair.', icon:'⏱️' },
      { label: 'Grab the swing when they slow down', correct: false, explain: 'Grabbing causes fights.', icon:'✋' },
      { label: 'Walk away and yell “You’re greedy!”', correct: false, explain: 'Name-calling hurts friendships.', icon:'😠' },
      { label: 'Wait silently and feel upset', correct: false, explain: 'Use words to solve the problem.', icon:'💭' },
    ]
  },
  {
    id: 'join-plan-4', emoji: '🗺️', diff: 4,
    text: 'Kids are making a train track with a plan. How do you join?',
    options: [
      { label: 'Ask, “What do you need? I can build the bridge to this station.”', correct: true, explain: 'Offering a helpful role respects their plan.', icon:'🌉' },
      { label: 'Add a tunnel anywhere without asking', correct: false, explain: 'Surprise changes can break the plan.', icon:'🕳️' },
      { label: 'Tell them to move aside so you can fix it', correct: false, explain: 'Taking over frustrates friends.', icon:'🛑' },
      { label: 'Watch quietly and hope they invite you', correct: false, explain: 'Words work better than waiting.', icon:'⏳' },
    ]
  },

 
  {
    id: 'friend-says-stop-5', emoji: '🛑', diff: 5,
    text: 'You are excited and a friend says, “Stop.” What keeps the friendship strong?',
    options: [
      { label: 'Stop, say “Sorry,” and ask, “How can we play gently?”', correct: true, explain: 'Listening + fixing keeps trust.', icon:'🫱🏻‍🫲🏽' },
      { label: 'Say, “It was a joke,” and keep going', correct: false, explain: 'Excuses don’t solve the problem.', icon:'🙃' },
      { label: 'Keep doing it because you are having fun', correct: false, explain: 'Ignoring “stop” can feel unsafe.', icon:'🚫' },
      { label: 'Walk away and mutter', correct: false, explain: 'Silence doesn’t repair feelings.', icon:'😤' },
    ]
  },
  {
    id: 'broken-promise-5', emoji: '⏲️', diff: 5,
    text: 'The timer ended but your friend keeps the toy. What is a strong, friendly plan?',
    options: [
      { label: 'Calmly remind, “The timer beeped. After two laps it’s my turn.”', correct: true, explain: 'Clear, calm words protect fairness.', icon:'🔔' },
      { label: 'Grab it back fast', correct: false, explain: 'Grabbing starts fights.', icon:'✋' },
      { label: 'Tell the teacher right away without trying words', correct: false, explain: 'Use your words first when it’s safe.', icon:'🧑‍🏫' },
      { label: 'Say, “Fine, I never get turns,” and leave', correct: false, explain: 'All-or-nothing talk ends play.', icon:'🌧️' },
    ]
  },
  {
    id: 'teasing-5', emoji: '🙃', diff: 5,
    text: 'Someone teases you about your drawing. What is a strong, kind choice?',
    options: [
      { label: 'Say, “Please stop. That hurts my feelings,” then move away or tell an adult', correct: true, explain: 'Calm assertiveness protects you.', icon:'🛡️' },
      { label: 'Tease them back', correct: false, explain: 'Teasing back grows the problem.', icon:'🔁' },
      { label: 'Laugh along even if you feel sad', correct: false, explain: 'Hiding feelings doesn’t help.', icon:'😕' },
      { label: 'Yell “STOP!” very loudly at them', correct: false, explain: 'Shouting can escalate things.', icon:'📣' },
    ]
  },
  {
    id: 'mis-hear-5', emoji: '👂', diff: 5,
    text: 'Friends are explaining a game but you did not hear. What helps you join the right way?',
    options: [
      { label: '“I didn’t hear. Can you tell me the rules again?”', correct: true, explain: 'Asking for the rules shows responsibility.', icon:'📝' },
      { label: 'Guess the rules and play anyway', correct: false, explain: 'Guessing can cause arguments.', icon:'🎲' },
      { label: 'Say, “You talk too quiet,” and walk away', correct: false, explain: 'Blaming doesn’t solve it.', icon:'🗯️' },
      { label: 'Leave to play alone', correct: false, explain: 'Leaving stops the friendship from growing.', icon:'🚪' },
    ]
  },
  {
    id: 'keep-secret-5', emoji: '💬', diff: 5,
    text: 'You told someone a friend’s secret and they found out. How do you repair the friendship?',
    options: [
      { label: 'Apologize and ask how to fix it; promise to keep things private now', correct: true, explain: 'Owning mistakes and repairing builds trust.', icon:'🫶' },
      { label: 'Say, “It wasn’t a big secret”', correct: false, explain: 'Minimizing feelings hurts more.', icon:'🙄' },
      { label: 'Blame someone else for telling', correct: false, explain: 'Blame blocks repair.', icon:'👉' },
      { label: 'Avoid them until they forget', correct: false, explain: 'Avoiding prevents healing.', icon:'🏃' },
    ]
  },
];


const LEVELS = [
  // Level 1: show all scenario options (3), generous time, hints on
  { minDiff:1, maxDiff:1, /*choices:3,*/ time:28, hints:true },
  // Level 2: still 3 options, less time
  { minDiff:2, maxDiff:2, /*choices:3,*/ time:24, hints:true },
  // Level 3: 4 options, hints fade
  { minDiff:3, maxDiff:3, /*choices:4,*/ time:22, hints:false },
  // Level 4: nuanced 4 options, tighter time
  { minDiff:4, maxDiff:4, /*choices:4,*/ time:20, hints:false },
  // Level 5: advanced 4 options, shortest time
  { minDiff:5, maxDiff:5, /*choices:4,*/ time:18, hints:false },
];

// --------- State ---------
let level = 1;
let score = 0;
let streak = 0;
let qCount = 0;

let currentScenario = null;
let timerId = null;
let timeLeft = 0;
let paused = false;

// Per-question total time we planned (used for progress bar & scoring)
let currentTotalTime = 0;

// --------- DOM ----------
const elLevel     = document.getElementById('level');
const elScore     = document.getElementById('score');
const elStreak    = document.getElementById('streak');
const elQCount    = document.getElementById('qCount');
const elTimerFill = document.getElementById('timerFill');

const ttsToggle   = document.getElementById('ttsToggle');

const scenarioEmoji = document.getElementById('scenarioEmoji');
const scenarioText  = document.getElementById('scenarioText');
const choicesEl     = document.getElementById('choices');
const feedbackEl    = document.getElementById('feedback');
const explainEl     = document.getElementById('explain');

const repeatBtn = document.getElementById('repeatBtn');
const nextBtn   = document.getElementById('nextBtn');

// We’ll create a Pause/Resume button dynamically so you don’t have to edit HTML:
let pauseBtn = null;

// --------- Kid-friendly timing settings (tweak as you like) ----------
const TIMER_SETTINGS = {
  scale: 1.8,     // multiplies your LEVELS[x].time (e.g., 28s -> ~50s)
  perWord: 0.8,   // add this many seconds per word in the prompt (capped below)
  addCap: 25,     // at most this many seconds added from perWord
  min: 40,        // never less than this per question
  max: 90,        // never more than this per question
  rehearBonus: 8  // add seconds when "Hear again" is pressed (capped to max)
};

// --------- Utils ---------
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
function shuffle(arr){ const a = arr.slice(); for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function say(text){
  if(!ttsToggle || !ttsToggle.checked) return Promise.resolve('no-tts');
  return new Promise(resolve => {
    try{
      if('speechSynthesis' in window){
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.95; u.pitch = 1.0;
        u.onend = () => resolve('done');
        u.onerror = () => resolve('err');
        speechSynthesis.speak(u);
      } else {
        resolve('no-tts');
      }
    }catch{
      resolve('err');
    }
  });
}

function levelConfig(){
  const idx = Math.min(level-1, LEVELS.length-1);
  return LEVELS[idx];
}

function eligibleScenarios(){
  const {minDiff, maxDiff} = levelConfig();
  return SCENARIOS.filter(s => s.diff >= minDiff && s.diff <= maxDiff);
}

function wordsIn(str){
  return (str || '').trim().split(/\s+/).filter(Boolean).length;
}

function computeTimeForQuestion(scenario){
  const cfg = levelConfig();
  const base = (cfg.time || 25) * TIMER_SETTINGS.scale;
  const add  = Math.min(TIMER_SETTINGS.addCap, Math.round(wordsIn(scenario.text) * TIMER_SETTINGS.perWord));
  let total  = base + add;
  total = Math.max(TIMER_SETTINGS.min, Math.min(TIMER_SETTINGS.max, total));
  return Math.round(total);
}

// --------- Pause / Resume ----------
function setPaused(state){
  if (paused === state) return;
  paused = state;

  if (paused) {
    clearInterval(timerId);
    try { if ('speechSynthesis' in window && !speechSynthesis.paused) speechSynthesis.pause(); } catch {}
    [...choicesEl.children].forEach(b => b.disabled = true);
    repeatBtn.disabled = true;
    nextBtn.disabled = true;

    feedbackEl.textContent = '⏸ Paused';
    if (pauseBtn) { pauseBtn.textContent = '▶ Resume'; pauseBtn.setAttribute('aria-pressed', 'true'); }
  } else {
    try { if ('speechSynthesis' in window && speechSynthesis.paused) speechSynthesis.resume(); } catch {}
    [...choicesEl.children].forEach(b => b.disabled = false);
    repeatBtn.disabled = false;
    if (pauseBtn) { pauseBtn.textContent = '⏸ Pause'; pauseBtn.setAttribute('aria-pressed', 'false'); }

    startTimer(timeLeft > 0 ? timeLeft : currentTotalTime);
  }
}

function togglePause(){ setPaused(!paused); }

document.addEventListener('visibilitychange', () => {
  if (document.hidden) setPaused(true);
});

document.addEventListener('keydown', (e) => {
  if (e.key && e.key.toLowerCase() === 'p') {
    e.preventDefault();
    togglePause();
  }
});

// --------- Timer ----------
function startTimer(seconds){
  clearInterval(timerId);
  timeLeft = seconds;
  updateTimerUI();

  if (paused) return;

  timerId = setInterval(()=>{
    timeLeft = Math.max(0, +(timeLeft - 0.1).toFixed(1));
    if(timeLeft <= 0){
      clearInterval(timerId);
      updateTimerUI();
      handleTimeout();
    } else {
      updateTimerUI();
    }
  }, 100);
}

function updateTimerUI(){
  const denom = currentTotalTime > 0 ? currentTotalTime : (levelConfig().time || 1);
  const pct = Math.max(0, Math.min(100, (timeLeft / denom) * 100));
  elTimerFill.style.width = pct + '%';
}

// --------- Rendering ----------
async function renderScenario(){
  const pool = eligibleScenarios();
  currentScenario = pick(pool);

  scenarioEmoji.textContent = currentScenario.emoji || '🙂';
  scenarioText.textContent  = currentScenario.text;

  // Choices: show ALL options
  const shuffled = shuffle(currentScenario.options);
  choicesEl.innerHTML = '';
  shuffled.forEach((opt)=>{
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice';
    btn.setAttribute('role','option');
    btn.setAttribute('aria-label', opt.label + (opt.correct ? ' (good choice)' : ''));
    btn.dataset.correct = opt.correct ? '1' : '0';
    btn.dataset.explain = opt.explain || '';

    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.textContent = opt.icon || '🧠';

    const text = document.createElement('div');
    text.textContent = opt.label;

    btn.appendChild(icon);
    btn.appendChild(text);

    btn.addEventListener('click', ()=>handleChoice(btn, opt));
    btn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        handleChoice(btn, opt);
      }
    });

    choicesEl.appendChild(btn);
  });

  // Reset UI
  feedbackEl.textContent = '';
  explainEl.textContent  = '';
  nextBtn.disabled = true;

  // Plan the time for this question
  currentTotalTime = computeTimeForQuestion(currentScenario);

  // Speak first (if enabled), then start the timer so reading aloud doesn't "cost" time
  await say(currentScenario.text);
  if (!paused) startTimer(currentTotalTime);
}

// --------- Answer handling ----------
function handleChoice(btnEl, opt){
  if (paused) return;
  if(nextBtn.disabled === false) return;
  clearInterval(timerId);

  const isRight = btnEl.dataset.correct === '1';

  // Mark all
  [...choicesEl.children].forEach(b=>{
    const good = b.dataset.correct === '1';
    b.classList.toggle('correct', good);
    b.classList.toggle('wrong',   !good);
  });

  if(isRight){
    streak += 1;
    // Time-weighted points based on the planned time for this item
    score += Math.max(50, Math.round(100 * (timeLeft / Math.max(1, currentTotalTime))));
    feedbackEl.textContent = '✅ Great choice!';
    // (optional) say('Great choice!');
  } else {
    streak = 0;
    score  = Math.max(0, score - 25);
    feedbackEl.textContent = '❌ Try a friendlier choice.';
    // (optional) say('Try a friendlier choice.');
  }

  explainEl.textContent = opt.explain || '';

  qCount += 1;
  elScore.textContent  = String(score);
  elStreak.textContent = String(streak);
  elQCount.textContent = String(qCount);

  if(streak && streak % 3 === 0 && level < LEVELS.length) level += 1;
  if(qCount && qCount % 6 === 0 && level < LEVELS.length) level += 1;
  elLevel.textContent = String(level);

  nextBtn.disabled = false;
}

function handleTimeout(){
  // Reveal the correct answer(s); no red on timeout
  [...choicesEl.children].forEach(b=>{
    const good = b.dataset.correct === '1';
    b.classList.toggle('correct', good);
    b.classList.remove('wrong');
  });

  streak = 0;
  score  = Math.max(0, score - 25);
  qCount += 1;

  const correctOpt = currentScenario.options.find(o => o.correct);
  if(correctOpt && correctOpt.explain){
    explainEl.textContent = correctOpt.explain;
  }

  feedbackEl.textContent = '⏰ Time’s up! Here’s the friendly choice.';
  elScore.textContent    = String(score);
  elStreak.textContent   = String(streak);
  elQCount.textContent   = String(qCount);

  if(qCount % 8 === 0 && level < LEVELS.length){
    level += 1;
    elLevel.textContent = String(level);
  }

  nextBtn.disabled = false;
}

// --------- Persistence ----------
function restoreProgress(){
  try{
    const currentUser = localStorage.getItem("currentUser") || "guest";
    const raw = localStorage.getItem(`friendsGameProgress_${currentUser}`);
    if(!raw) return;
    const p = JSON.parse(raw);
    level  = p.level  || 1;
    score  = p.score  || 0;
    streak = p.streak || 0;
    qCount = p.qCount || 0;
  }catch{}
}
function saveProgress(){
  const currentUser = localStorage.getItem("currentUser") || "guest";
  const p = { level, score, streak, qCount };
  localStorage.setItem(`friendsGameProgress_${currentUser}`, JSON.stringify(p));

  // Award a star for every 8 questions answered
  if (qCount > 0 && qCount % 8 === 0) {
    const rewards = JSON.parse(localStorage.getItem(`gameRewards_${currentUser}`) || "{}");
    rewards["Making Friends Game"] = (rewards["Making Friends Game"] || 0) + 1;
    localStorage.setItem(`gameRewards_${currentUser}`, JSON.stringify(rewards));
  }
}
addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='hidden') saveProgress(); });
addEventListener('beforeunload', saveProgress);

// --------- Init ----------
repeatBtn.addEventListener('click', async ()=>{
  if(currentScenario && !paused){
    await say(currentScenario.text);
    // small boost so replays don’t “cost” time
    timeLeft = Math.min(currentTotalTime, timeLeft + TIMER_SETTINGS.rehearBonus);
    updateTimerUI();
  }
});
nextBtn.addEventListener('click', ()=>{ if(!paused) renderScenario(); });

ttsToggle?.addEventListener('change', ()=>{
  // nothing special needed here; renderScenario handles TTS timing
});

function createPauseButton(){
  const actionsBar = nextBtn.parentElement;
  pauseBtn = document.createElement('button');
  pauseBtn.className = 'secondary';
  pauseBtn.id = 'pauseBtn';
  pauseBtn.type = 'button';
  pauseBtn.textContent = '⏸ Pause';
  pauseBtn.setAttribute('aria-pressed','false');
  pauseBtn.title = 'Pause / Resume (P)';
  pauseBtn.addEventListener('click', togglePause);
  actionsBar.insertBefore(pauseBtn, nextBtn); // place before Next
}

function init(){
  restoreProgress();
  elLevel.textContent  = String(level);
  elScore.textContent  = String(score);
  elStreak.textContent = String(streak);
  elQCount.textContent = String(qCount);

  createPauseButton();
  renderScenario();
}
document.addEventListener('DOMContentLoaded', init);
