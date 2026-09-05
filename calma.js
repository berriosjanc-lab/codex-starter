var LANG = 'es';

var T = {
  es: {
    logo:'Respirar', title:'CALMA',
    sub:'Suelta la ansiedad.<br>Inhala paz y claridad.',
    setupHdr:'Configura tu experiencia de respiraci\u00f3n:',
    durLbl:'\u00bfCu\u00e1nto tiempo?', sceneLbl:'\u00bfQu\u00e9 ambiente?',
    patLbl:'\u00bfC\u00f3mo quieres sentirte?', begin:'Comenzar Sesi\u00f3n',
    end:'Terminar', complete:'Sesi\u00f3n completa',
    greet:{morning:'Buenos d\u00edas', afternoon:'Buenas tardes', evening:'Buenas noches', night:'Buenas noches'},
    suggested:'Sugerido',
    nav:{home:'Respirar', freq:'Sonido', med:'Meditar', data:'Datos'},
    cycle:'Ciclo', cycles:'ciclos', cycle1:'ciclo',
    scenes:['Noche','Oc\u00e9ano','Bosque'],
    phases:{inhale:'Inhala', hold:'Sost\u00e9n', exhale:'Exhala', holdout:'Sost\u00e9n'},
    msgs:{
      inhale: ['Abre el pecho','Llena los pulmones','Recibe la calma','Bienvenida, paz','Espacio para ti'],
      hold:   ['Qu\u00e9date aqu\u00ed','Siente el silencio','Todo est\u00e1 bien','En este momento'],
      exhale: ['Suelta la tensi\u00f3n','Libera lo que pesa','D\u00e9jalo ir','Cuerpo, rel\u00e1jate','Que todo salga'],
      holdout:['Descansa','Vac\u00edo y libre','En calma']
    },
    pats:[
      { name:'\ud83c\udf0a Calmar la mente',  sub:'Equilibrio total \u00b7 4-4-4-4',     info:'Equilibra el sistema nervioso. Ideal para reducir el estr\u00e9s y mejorar la concentraci\u00f3n.' },
      { name:'\ud83c\udf19 Dormir profundo',   sub:'Relajaci\u00f3n profunda \u00b7 4-7-8', info:'Calma la ansiedad r\u00e1pidamente e induce el sue\u00f1o. Muy efectiva antes de dormir.' },
      { name:'\ud83c\udf3f Soltar tensi\u00f3n', sub:'Exhala largo \u00b7 5-2-7',           info:'Activa el sistema parasimp\u00e1tico para relajaci\u00f3n profunda. Perfecta para soltar tensiones.' },
      { name:'\u26a1 Activar energ\u00eda',     sub:'Ritmo activo \u00b7 3-3',             info:'Aumenta la energ\u00eda y el enfoque mental. Ideal para empezar el d\u00eda.' }
    ]
  },
  en: {
    logo:'Breathe', title:'CALM',
    sub:'Release anxiety.<br>Inhale peace and clarity.',
    setupHdr:'Set up your breathing experience:',
    durLbl:'How long?', sceneLbl:'What view?',
    patLbl:'How do you want to feel?', begin:'Begin Session',
    end:'End', complete:'Session complete',
    greet:{morning:'Good morning', afternoon:'Good afternoon', evening:'Good evening', night:'Good evening'},
    suggested:'Suggested',
    nav:{home:'Breathe', freq:'Sound', med:'Meditate', data:'Data'},
    cycle:'Cycle', cycles:'cycles', cycle1:'cycle',
    scenes:['Night','Ocean','Forest'],
    phases:{inhale:'Inhale', hold:'Hold', exhale:'Exhale', holdout:'Hold'},
    msgs:{
      inhale: ['Open your chest','Fill your lungs','Welcome the calm','Peace flows in','Space for you'],
      hold:   ['Stay here','Feel the stillness','All is well','In this moment'],
      exhale: ['Release the tension','Let it all go','Set it free','Relax your body','Let it out'],
      holdout:['Rest now','Empty and free','In stillness']
    },
    pats:[
      { name:'🌊 Calm the mind',    sub:'Total balance · 4-4-4-4',      info:'Balances the nervous system. Great for reducing stress and improving focus.' },
      { name:'🌙 Deep sleep',        sub:'Deep relaxation · 4-7-8',   info:'Quickly calms anxiety and helps induce sleep. Very effective before bed.' },
      { name:'🌿 Release tension', sub:'Long exhale · 5-2-7',           info:'Activates the parasympathetic system for deep relaxation. Perfect for releasing tension.' },
      { name:'⚡ Boost energy',       sub:'Active rhythm · 3-3',           info:'Increases energy and mental focus. Ideal for starting the day or when fatigue sets in.' }
    ]
  }
};


var selectedPatIndex = null;
var extraCopy = {
  es: {brand:'respira y vuelve a ti', title:'Vuelve a tu <em>calma.</em>', sub:'Baja el ritmo. Este momento es para ti.', setup:'Tu pausa, a tu manera', duration:'Tiempo para ti', scene:'Elige tu paisaje', pattern:'¿Cómo quieres sentirte?', begin:'Comenzar sesión', note:'Un respiro a la vez.', here:'ESTÁS AQUÍ', breathe:'Respira.', caption:'Lo demás puede esperar.', label:'RESPIRACIÓN GUIADA', hint:'Sigue el círculo. Encuentra tu propio ritmo.', footer:'No tienes que resolverlo todo ahora.', soundOn:'Sonido activado', soundOff:'Sin sonido', comfort:'Respira suavemente, sin forzar.'},
  en: {brand:'breathe and come back to you', title:'Come back to <em>calm.</em>', sub:'Slow down. This moment is yours.', setup:'Your pause, your way', duration:'Time for yourself', scene:'Choose your view', pattern:'How do you want to feel?', begin:'Begin session', note:'One breath at a time.', here:'YOU ARE HERE', breathe:'Breathe.', caption:'Everything else can wait.', label:'GUIDED BREATHING', hint:'Follow the circle. Find your own rhythm.', footer:'You don’t have to solve it all right now.', soundOn:'Sound on', soundOff:'Sound off', comfort:'Breathe gently, without forcing.'}
};
var PAT_ICONS = [
  '<path d="M3 9h12a3 3 0 1 0-3-3M3 14h16a3 3 0 1 1-3 3M3 19h5"/>',
  '<path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/>',
  '<path d="M20 4C8 2 3 9 6 15s14 2 14-11Z M5 20 16 9"/>',
  '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>'
];
T.es.pats.forEach(function(p,i){ p.name=['Calmar la mente','Preparar el descanso','Soltar tensión','Encontrar energía'][i]; p.sub=['Ritmo en caja · 4–4–4–4','Pausa larga · 4–7–8','Exhalación larga · 5–2–7','Ritmo continuo · 3–3'][i]; });
T.en.pats.forEach(function(p,i){ p.name=['Calm the mind','Unwind for sleep','Release tension','Find your energy'][i]; p.sub=['Box breathing · 4–4–4–4','Long hold · 4–7–8','Long exhale · 5–2–7','Continuous · 3–3'][i]; });

var PATS_BASE = [
  { timing:'4\u20134\u20134\u20134', phases:[{t:'inhale',d:4},{t:'hold',d:4},{t:'exhale',d:4},{t:'holdout',d:4}] },
  { timing:'4\u20137\u20138',        phases:[{t:'inhale',d:4},{t:'hold',d:7},{t:'exhale',d:8}] },
  { timing:'5\u20132\u20137',        phases:[{t:'inhale',d:5},{t:'hold',d:2},{t:'exhale',d:7}] },
  { timing:'3\u20133',              phases:[{t:'inhale',d:3},{t:'exhale',d:3}] }
];

function buildPats(){
  return PATS_BASE.map(function(p,i){
    return {
      name: T[LANG].pats[i].name,
      sub:  T[LANG].pats[i].sub,
      timing: p.timing,
      info: T[LANG].pats[i].info,
      phases: p.phases.map(function(ph){
        return {l:T[LANG].phases[ph.t], t:ph.t, d:ph.d};
      })
    };
  });
}

var PATS = buildPats();

var BG = { ocean:'night', forest:'', sunset:'forest' };
var cfg = { dur:3, scene:'ocean', pat:PATS[0] };
var SCENE_SND = { ocean:'wind', forest:'ocean', sunset:'birds' };
var state = { on:false, pIdx:0, sec:0, cyc:0, sessLeft:0 };
var tPhase=null, tSess=null, tBegin=null, soundOn=true;
var actx=null, audioBufs={}, activeChimes=[];
var ambiEl=null, ambiTimer=null;
var msgIdxMap={inhale:0,hold:0,exhale:0,holdout:0};

var SOUND_URLS = {
  ocean: 'olas.mp3',
  river: 'lluvia.mp3',
  wind:  'viento.mp3',
  birds: 'viento.mp3'
};

/* Audio */
function getCtx(){
  if(!actx) actx=new(window.AudioContext||window.webkitAudioContext)();
  if(actx.state==='suspended') actx.resume();
  return actx;
}


function startAmbience(){
  if(!soundOn) return;
  var url=SOUND_URLS[SCENE_SND[cfg.scene]]; if(!url) return;
  stopAmbience();
  var a=new Audio(url); a.loop=true; a.volume=0; ambiEl=a;
  a.play().catch(function(){if(ambiEl===a) notifyApp(LANG==='es'?'No se pudo reproducir el ambiente. Puedes seguir respirando.':'The ambient audio could not play. You can keep breathing.');});
  ambiTimer=setInterval(function(){
    if(ambiEl!==a){clearInterval(ambiTimer);return;}
    a.volume=Math.min(a.volume+0.025,0.28);
    if(a.volume>=0.28){clearInterval(ambiTimer);ambiTimer=null;}
  },100);
}

function stopAmbience(){
  clearInterval(ambiTimer); ambiTimer=null;
  if(ambiEl){ambiEl.pause();ambiEl.removeAttribute('src');ambiEl.load();ambiEl=null;}
}

function chime(freq,dur){
  if(!soundOn) return;
  try {
    var c=getCtx(),o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=freq;
    g.gain.setValueAtTime(0,c.currentTime);
    g.gain.linearRampToValueAtTime(.07,c.currentTime+.08);
    g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur);
    o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+dur);
    activeChimes.push(o);
    o.onended=function(){activeChimes=activeChimes.filter(function(x){return x!==o;});o.disconnect();g.disconnect();};
  } catch(e){}
}

function haptic(type){
  // Vibration is hardware-only: never simulate it with a loud audio pulse.
  if(soundOn && navigator.vibrate) navigator.vibrate(type==='inhale'?30:20);
}

/* Build initial pattern buttons via setLang */
setLang('es');

/* Night mode: auto-select Noche + dim if 20:00–6:00 */
function applyNightMode(){
  // Maintain the night scene without placing a dimming layer over readable text.
  var h=new Date().getHours();
  if(h>=20||h<6) cfg.scene='ocean';
  updatePreview();
}
applyNightMode();

/* Duration */
document.getElementById('durRow').addEventListener('click',function(e){
  var b=e.target.closest('.dur-btn'); if(!b) return;
  cfg.dur=parseInt(b.dataset.m,10);
  document.getElementById('durRow').querySelectorAll('.dur-btn').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false');});
  b.classList.add('on');b.setAttribute('aria-pressed','true');updatePreview();
});

var SCENE_IMGS={
  ocean:'assets/noche.jpg',
  forest:'assets/oceano.jpg',
  sunset:'assets/bosque.jpg'
};
function setSetupBg(scene){
  var el=document.getElementById('setupSceneBg');
  el.style.backgroundImage='url('+SCENE_IMGS[scene]+')';
  document.body.classList.add('scene-ready');
}

/* Scene */
document.getElementById('scenesRow').addEventListener('click',function(e){
  var card=e.target.closest('.sc'); if(!card) return;
  cfg.scene=card.dataset.s;
  document.querySelectorAll('.sc').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false');});
  card.classList.add('on');card.setAttribute('aria-pressed','true');updatePreview();
  var bg=document.getElementById('bg');
  bg.className=BG[cfg.scene]||'';
  bg.id='bg';
  setSetupBg(cfg.scene);
});
setSetupBg(cfg.scene);

/* Sound and session actions */
document.getElementById('fab').addEventListener('click',function(){
  soundOn=!soundOn;updateSoundButton();
  if(!soundOn){stopAmbience();activeChimes.forEach(function(o){try{o.stop();}catch(e){}});}
  else if(state.on) startAmbience();
});
document.getElementById('btnBegin').addEventListener('click',function(){
  if(state.on) return;
  try{getCtx();}catch(e){}
  begin();
});
document.getElementById('btnEnd').addEventListener('click',finish);

/* Helpers */
function fmt(s){ var m=Math.floor(s/60),ss=s%60; return m+':'+(ss<10?'0':'')+ss; }

function dayPart(){
  var h=new Date().getHours();
  if(h>=5&&h<12) return 'morning';
  if(h>=12&&h<19) return 'afternoon';
  if(h>=19&&h<23) return 'evening';
  return 'night';
}
/* pattern suggested by time of day: morning→energy, afternoon→calm, evening→release, night→sleep */
function suggestedPat(){
  var p=dayPart();
  return p==='morning'?3 : p==='afternoon'?0 : p==='evening'?2 : 1;
}

function setLang(l){
  if(!T[l]) return;
  LANG=l;
  document.documentElement.lang=l;
  var t=T[l], c=extraCopy[l];
  var values={txtLogo:c.brand,txtTitle:t.greet[dayPart()],txtSub:c.sub,txtSetupHdr:c.setup,btnBegin:c.begin,btnEnd:t.end,welcomeNote:c.note,previewKicker:c.here,previewTitle:c.breathe,previewCaption:c.caption,previewLabel:c.label,practiceHint:c.hint,footerNote:c.footer,sessionComfort:c.comfort};
  Object.keys(values).forEach(function(id){document.getElementById(id).textContent=values[id];});
  document.getElementById('welcomeTitle').innerHTML=c.title;
  [['txtPatLbl','01',c.pattern],['txtDurLbl','02',c.duration],['txtSceneLbl','03',c.scene]].forEach(function(v){document.getElementById(v[0]).innerHTML='<span>'+v[1]+'</span> '+v[2];});
  ['scName0','scName1','scName2'].forEach(function(id,i){document.getElementById(id).textContent=t.scenes[i];});
  [['navHomeLbl','home'],['navFreqLbl','freq'],['navMedLbl','med'],['navDataLbl','data']].forEach(function(v){document.getElementById(v[0]).textContent=t.nav[v[1]];});
  ['es','en'].forEach(function(code){var b=document.getElementById(code==='es'?'btnEs':'btnEn');b.classList.toggle('on',l===code);b.setAttribute('aria-pressed',String(l===code));});
  if(selectedPatIndex===null) selectedPatIndex=suggestedPat();
  PATS=buildPats(); cfg.pat=PATS[selectedPatIndex];
  var pl=document.getElementById('patList'); pl.innerHTML='';
  PATS.forEach(function(p,i){
    var wrap=document.createElement('div'); wrap.className='pat-wrap';
    var b=document.createElement('button'); b.type='button';
    b.className='pat-btn'+(i===selectedPatIndex?' on':'');
    b.setAttribute('aria-pressed',String(i===selectedPatIndex));
    b.innerHTML='<span class="pat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+PAT_ICONS[i]+'</svg><span class="selection-mark"></span></span><span class="pn">'+p.name+'</span><span class="pt">'+p.sub+'</span>';
    b.addEventListener('click',function(){selectedPatIndex=i;cfg.pat=p;pl.querySelectorAll('.pat-btn').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false');});b.classList.add('on');b.setAttribute('aria-pressed','true');updatePreview();});
    wrap.appendChild(b); pl.appendChild(wrap);
  });
  document.getElementById('hrvOptionalLabel').innerHTML=l==='es'?'Añadir HRV de hoy <span>Opcional</span>':'Add today’s HRV <span>Optional</span>';
  document.getElementById('hrvHint').textContent=l==='es'?'Escribe el valor de tu reloj o app de salud.':'Enter the reading from your watch or health app.';
  updatePreview(); updateSoundButton();
}

function updatePreview(){
  var label=LANG==='es'?' minutos · ':' minutes · ';
  document.getElementById('sessionSummary').textContent=cfg.dur+label+cfg.pat.name;
  document.getElementById('previewScene').textContent=T[LANG].scenes[['ocean','forest','sunset'].indexOf(cfg.scene)];
}

function updateSoundButton(){
  var c=extraCopy[LANG], b=document.getElementById('fab');
  document.getElementById('soundLabel').textContent=soundOn?c.soundOn:c.soundOff;
  document.getElementById('soundIcon').textContent=soundOn?'♫':'−';
  b.setAttribute('aria-pressed',String(soundOn));
  b.setAttribute('aria-label',LANG==='es'?(soundOn?'Silenciar sonido':'Activar sonido'):(soundOn?'Mute sound':'Enable sound'));
  b.classList.toggle('off',!soundOn);
}

function notifyApp(message){
  var el=document.getElementById('appNotice');
  el.textContent=message; el.hidden=false;
  clearTimeout(notifyApp.timer);
  notifyApp.timer=setTimeout(function(){el.hidden=true;},6000);
}

function activateScene(s){
  document.getElementById('sceneBg').style.backgroundImage='url('+SCENE_IMGS[s]+')';
  document.querySelectorAll('.yt-wrap').forEach(function(el){
    el.classList.remove('active');
    var v=el.querySelector('video'); if(v) v.pause();
  });
  var wrap=document.getElementById('yt-'+s);
  if(wrap){
    wrap.classList.add('active');
    var v=wrap.querySelector('video');
    if(v && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){v.currentTime=0;v.play().catch(function(){/* Local still image remains visible. */});}
  }
}

function begin(){
  if(state.on) return;
  if(medState.on) medStop();
  clearTimeout(state.finishTimer);clearInterval(tSess);
  state.on=true;state.pIdx=-1;state.cyc=0;state.startedAt=Date.now();state.sessLeft=cfg.dur*60;state.elapsed=0;
  msgIdxMap={inhale:0,hold:0,exhale:0,holdout:0};
  document.getElementById('btnBegin').disabled=true;
  document.body.classList.add('sess-active');
  showScreen('sess');
  document.getElementById('btnEnd').disabled=false;
  document.getElementById('btnEnd').focus();
  document.getElementById('sessionTechnique').textContent=cfg.pat.name+' · '+cfg.pat.timing;
  activateScene(cfg.scene);startAmbience();
  runPhase();tSess=setInterval(runPhase,80);
}

function runPhase(){
  if(!state.on) return;
  state.elapsed=Math.max(0,(Date.now()-state.startedAt)/1000);
  if(state.elapsed>=cfg.dur*60){finish();return;}
  state.sessLeft=Math.max(0,Math.ceil(cfg.dur*60-state.elapsed));
  var frame=breathingFrame(state.elapsed,cfg.pat.phases),ph=cfg.pat.phases[frame.index];
  if(state.pIdx!==frame.index||state.cyc!==frame.cycle){
    state.pIdx=frame.index;state.cyc=frame.cycle;
    document.getElementById('sPhase').textContent=ph.l;
    var msgs=T[LANG].msgs[ph.t]||[];
    if(msgs.length){document.getElementById('sMsg').textContent=msgs[msgIdxMap[ph.t]++%msgs.length];document.getElementById('sMsg').classList.add('show');}
    haptic(ph.t);chime(ph.t==='inhale'?528:ph.t==='exhale'?396:432,.7);
  }
  state.sec=Math.ceil(ph.d-frame.position);
  document.getElementById('clock').textContent=fmt(state.sessLeft);
  document.getElementById('sCount').textContent=state.sec;
  document.getElementById('sCycle').textContent=T[LANG].cycle+' '+(state.cyc+1);
  var disc=document.getElementById('breathDisc');
  disc.style.setProperty('--breathDur','.08s');
  disc.style.transform='scale('+frame.scale.toFixed(4)+')';
}

function breathingFrame(elapsed,phases){
  var total=phases.reduce(function(n,p){return n+p.d;},0);
  var cycle=Math.floor(elapsed/total),position=elapsed%total,index=0;
  while(index<phases.length-1&&position>=phases[index].d){position-=phases[index].d;index++;}
  var ph=phases[index],fraction=position/ph.d;
  var size=ph.t==='inhale'?fraction:ph.t==='exhale'?1-fraction:ph.t==='hold'?1:0;
  return {index:index,cycle:cycle,position:position,scale:.58+.42*size};
}

function finish(){
  if(!state.on) return;
  state.on=false;clearTimeout(tBegin);clearInterval(tPhase);clearInterval(tSess);
  var elapsed=Math.min(cfg.dur*60,Math.max(0,(Date.now()-state.startedAt)/1000));
  var complete=elapsed>=cfg.dur*60;
  var hrv=Number(document.getElementById('hrvInput').value);
  if(elapsed>=1) addRecord({id:Date.now(),date:todayStr(),hrv:(hrv>=10&&hrv<=250)?hrv:null,technique:cfg.pat.name,duration:Math.round(elapsed/60*100)/100,elapsed_seconds:Math.floor(elapsed),completed:complete,mood:null});
  stopAmbience();activeChimes.forEach(function(o){try{o.stop();}catch(e){}});
  document.querySelectorAll('.yt-wrap video').forEach(function(v){v.pause();});
  document.getElementById('btnEnd').disabled=true;
  document.getElementById('sPhase').textContent=complete?T[LANG].complete:(LANG==='es'?'Gracias por parar.':'Thank you for pausing.');
  document.getElementById('sCount').textContent='';
  document.getElementById('sMsg').textContent=LANG==='es'?'Lleva esta calma contigo.':'Take this calm with you.';
  document.getElementById('sCycle').textContent=fmt(Math.floor(elapsed));
  state.finishTimer=setTimeout(function(){
    document.body.classList.remove('sess-active');document.getElementById('btnBegin').disabled=false;
    showScreen('setup');setNav('navHome');document.getElementById('btnBegin').focus();
  },1600);
}

/* ===== HRV TRACKER ===== */
var MOODS = {1:'😰',2:'😔',3:'😐',4:'🙂',5:'😌'};

function getRecords(){
  try{var records=JSON.parse(localStorage.getItem('calma_records')||'[]');return Array.isArray(records)?records.filter(function(r){return r&&typeof r==='object'&&Number.isFinite(r.id)&&typeof r.date==='string';}):[];}
  catch(e){return [];}
}
function saveRecords(r){
  try{localStorage.setItem('calma_records',JSON.stringify(r));return true;}
  catch(e){notifyApp('No se pudo guardar el registro en este navegador.');return false;}
}
function addRecord(rec){
  var r=getRecords(); r.push(rec);
  r.sort(function(a,b){return a.id-b.id;});
  return saveRecords(r);
}
function todayStr(date){
  var d=date||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function escapeHTML(value){
  return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
}
function fmtDate(ds){
  var d=new Date(ds+'T12:00:00');
  var M=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return d.getDate()+' '+M[d.getMonth()]+' '+d.getFullYear();
}
function fmtDateShort(ds){
  var d=new Date(ds+'T12:00:00');
  var M=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return d.getDate()+' '+M[d.getMonth()];
}

function showHRV(){
  var v=parseInt(document.getElementById('hrvInput').value,10);
  if(v>=10&&v<=250) document.getElementById('regHrv').value=v;
  showScreen('hrv');switchTab('dashboard');
}
function hideHRV(){
  document.getElementById('hrv').classList.add('below');
}

function switchTab(name){
  document.querySelectorAll('.hrv-tab').forEach(function(t){
    t.classList.toggle('on', t.dataset.panel===name);
  });
  ['dashboard','registrar','historial'].forEach(function(p){
    var el=document.getElementById('panel-'+p);
    if(el) el.style.display=(p===name)?'':'none';
  });
  if(name==='dashboard') renderDashboard();
  if(name==='historial') renderHistorial();
}

document.querySelectorAll('.hrv-tab').forEach(function(t){
  t.addEventListener('click',function(){ switchTab(t.dataset.panel); });
});

/* Chips */
function initChips(groupId){
  document.getElementById(groupId).addEventListener('click',function(e){
    var c=e.target.closest('.hrv-chip,.hrv-mood'); if(!c) return;
    document.getElementById(groupId).querySelectorAll('.hrv-chip,.hrv-mood')
      .forEach(function(x){x.classList.remove('on');});
    c.classList.add('on');
  });
}
initChips('techChips'); initChips('durChips'); initChips('moodChips');

/* Save record */
document.getElementById('btnHrvSave').addEventListener('click',function(){
  var hrv=parseInt(document.getElementById('regHrv').value,10);
  var tech=document.querySelector('#techChips .hrv-chip.on');
  var dur=document.querySelector('#durChips .hrv-chip.on');
  var mood=document.querySelector('#moodChips .hrv-mood.on');
  var rec={
    id:Date.now(), date:todayStr(),
    hrv:(hrv>=10&&hrv<=250)?hrv:null,
    technique:tech?tech.dataset.v:null,
    duration:dur?parseInt(dur.dataset.v):null,
    mood:mood?parseInt(mood.dataset.v):null
  };
  var value=document.getElementById('regHrv').value;
  if(value && !(hrv>=10&&hrv<=250)){notifyApp('Escribe un HRV entre 10 y 250 ms, o deja el campo vacío.');return;}
  if(!addRecord(rec)) return;
  document.getElementById('regHrv').value='';
  switchTab('dashboard');
});

/* Delete all */
document.getElementById('btnClearAll').addEventListener('click',function(){
  if(confirm('¿Borrar todos los registros?')){ saveRecords([]); renderHistorial(); renderDashboard(); }
});

/* Back */


/* Dashboard */
function renderDashboard(){
  var recs=getRecords();
  var withHrv=recs.filter(function(r){return typeof r.hrv==='number'&&Number.isFinite(r.hrv)&&r.hrv>=10&&r.hrv<=250;});
  var sevenAgo=todayStr(new Date(Date.now()-6*24*60*60*1000));

  // Stats
  var prom=withHrv.length?Math.round(withHrv.reduce(function(s,r){return s+r.hrv;},0)/withHrv.length):'—';
  var last7=withHrv.filter(function(r){return r.date>=sevenAgo;});
  var avg7=last7.length?Math.round(last7.reduce(function(s,r){return s+r.hrv;},0)/last7.length):'—';
  // Streak
  var dates=[...new Set(recs.map(function(r){return r.date;}))].sort();
  var streak=0, check=todayStr();
  for(var i=dates.length-1;i>=0;i--){
    if(dates[i]===check){ streak++; check=todayStr(new Date(new Date(check+'T12:00:00').getTime()-86400000)); }
    else break;
  }
  document.getElementById('statProm').textContent=prom;
  document.getElementById('stat7d').textContent=avg7;
  document.getElementById('statRacha').textContent=streak||'—';

  // Chart
  var byDate={};
  withHrv.forEach(function(r){
    if(!byDate[r.date]) byDate[r.date]=[];
    byDate[r.date].push(r.hrv);
  });
  var chartDates=Object.keys(byDate).sort().slice(-30);
  var chartData=chartDates.map(function(d){
    var vals=byDate[d];
    return{date:d,hrv:Math.round(vals.reduce(function(s,v){return s+v;},0)/vals.length)};
  });
  var svg=document.getElementById('hrvChartSvg');
  var none=document.getElementById('hrvChartNone');
  if(chartData.length<1){ svg.style.display='none'; none.style.display=''; }
  else { svg.style.display=''; none.style.display='none'; drawHRVChart(chartData); }

  // Last session
  var last=recs.length?recs[recs.length-1]:null;
  var lcard=document.getElementById('lastSessCard');
  if(last){ lcard.style.display='';
    document.getElementById('lastHrvVal').textContent=last.hrv||'—';
    var techStr=(last.technique||last.med_mode||'')+' · '+(last.duration||last.med_dur||0)+' min';
    document.getElementById('lastTech').textContent=techStr||'—';
    document.getElementById('lastDate').textContent=fmtDate(last.date);
  } else { lcard.style.display='none'; }
}

function drawHRVChart(data){
  var svg=document.getElementById('hrvChartSvg');
  var W=300,H=110,PL=30,PR=10,PT=8,PB=22;
  var cW=W-PL-PR, cH=H-PT-PB;
  var vals=data.map(function(d){return d.hrv;});
  var minV=Math.min.apply(null,vals), maxV=Math.max.apply(null,vals);
  if(maxV===minV){minV-=10;maxV+=10;}
  var pad=Math.max(Math.round((maxV-minV)*0.2),4);
  minV-=pad; maxV+=pad;
  var n=data.length;
  function xf(i){return n>1?PL+i/(n-1)*cW:PL+cW/2;}
  function yf(v){return PT+cH-(v-minV)/(maxV-minV)*cH;}

  var html='';
  // Horizontal grid lines (4 levels)
  for(var g=0;g<4;g++){
    var gv=minV+(maxV-minV)*g/3;
    var gy=yf(gv);
    html+='<line x1="'+PL+'" y1="'+gy.toFixed(1)+'" x2="'+(W-PR)+'" y2="'+gy.toFixed(1)+'" stroke="rgba(237,231,217,0.07)" stroke-width="1"/>';
    html+='<text x="'+(PL-4)+'" y="'+(gy+3).toFixed(1)+'" fill="#b0c8ca" font-size="7.5" text-anchor="end" font-family="Manrope,sans-serif">'+Math.round(gv)+'</text>';
  }
  // Line
  var path=data.map(function(d,i){return(i===0?'M':'L')+xf(i).toFixed(1)+','+yf(d.hrv).toFixed(1);}).join(' ');
  // Area fill
  var area=path+' L'+xf(n-1).toFixed(1)+','+(H-PB)+' L'+xf(0).toFixed(1)+','+(H-PB)+' Z';
  html+='<path d="'+area+'" fill="rgba(168,195,160,0.07)"/>';
  html+='<path d="'+path+'" fill="none" stroke="#a8c3a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>';
  // Dots (open circles matching screenshot)
  data.forEach(function(d,i){
    html+='<circle cx="'+xf(i).toFixed(1)+'" cy="'+yf(d.hrv).toFixed(1)+'" r="3" fill="#1a1a2e" stroke="#a8c3a0" stroke-width="1.5" opacity="0.9"/>';
  });
  // Date labels (first, last, middle if many)
  var labelIdx=[0];
  if(n>4) labelIdx.push(Math.floor(n/2));
  if(n>1) labelIdx.push(n-1);
  labelIdx=labelIdx.filter(function(v,i,a){return a.indexOf(v)===i;});
  labelIdx.forEach(function(i){
    html+='<text x="'+xf(i).toFixed(1)+'" y="'+(H-4)+'" fill="#b0c8ca" font-size="7.5" text-anchor="middle" font-family="Manrope,sans-serif">'+fmtDateShort(data[i].date)+'</text>';
  });
  svg.innerHTML=html;
}

/* Historial */
function renderHistorial(){
  var recs=getRecords().slice().reverse();
  var el=document.getElementById('histList');
  var cnt=document.getElementById('histCnt');
  cnt.textContent=recs.length+' registro'+(recs.length===1?'':'s');
  el.innerHTML='';
  if(!recs.length){
    el.innerHTML='<p style="font-family:Josefin Sans,sans-serif;font-size:0.875rem;color:#b0c8ca;text-align:center;padding:24px 0;letter-spacing:0.5px">Sin registros aún</p>';
    return;
  }
  recs.forEach(function(r){
    var item=document.createElement('div'); item.className='hrv-hitem';
    var techStr=escapeHTML(r.technique||r.med_mode||'Sesión')+' · '+escapeHTML(r.duration||r.med_dur||0)+' min';
    item.innerHTML=
      '<div class="hrv-hi-hrv"><span class="hrv-hi-num">'+escapeHTML(r.hrv||'—')+'</span>'
      +'<span class="hrv-hi-ms">ms</span></div>'
      +'<div class="hrv-hi-info"><span class="hrv-hi-tech">'+techStr+'</span>'
      +'<span class="hrv-hi-date">'+fmtDate(r.date)+'</span></div>'
      +(r.mood?'<span class="hrv-hi-mood">'+MOODS[r.mood]+'</span>':'')
      +'<button class="hrv-hi-del" aria-label="Eliminar registro" data-id="'+r.id+'">&#10005;</button>';
    item.querySelector('.hrv-hi-del').addEventListener('click',function(){
      var id=parseInt(this.dataset.id);
      saveRecords(getRecords().filter(function(x){return x.id!==id;}));
      renderHistorial(); renderDashboard();
    });
    el.appendChild(item);
  });
}

document.getElementById('btnHrvBack').addEventListener('click', goHome);

/* ── FRECUENCIAS & MEDITAR ── */
function showFreqMed(){
  showScreen('freqmed');
}
function hideFreqMed(){
  document.getElementById('freqmed').classList.add('below');
}
function switchFmTab(idx){
  if(idx===0 && medState && medState.on) medStop();
  [0,1].forEach(function(i){
    var b=document.getElementById('fmTab'+i);b.classList.toggle('active',i===idx);b.setAttribute('aria-pressed',String(i===idx));
    document.getElementById('fmPanel'+i).classList.toggle('active',i===idx);
  });
  setNav(idx===1?'navMed':'navFreq');
}
document.getElementById('btnFmBack').addEventListener('click', goHome);

/* ── BOTTOM NAV ── */
function setNav(id){
  ['navHome','navFreq','navMed','navData'].forEach(function(n){
    var el=document.getElementById(n);el.classList.toggle('on',n===id);
    if(n===id) el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');
  });
}
function goHome(){
  if(medState.on) medStop();
  showScreen('setup');setNav('navHome');
}
function navTo(where){
  if(medState.on && where!=='med') medStop();
  if(where==='data'){showHRV();setNav('navData');}
  else{showFreqMed();switchFmTab(where==='med'?1:0);setNav(where==='med'?'navMed':'navFreq');}
}

function showScreen(id){
  ['setup','sess','hrv','freqmed'].forEach(function(name){
    var el=document.getElementById(name),selected=name===id;
    el.classList.remove('out');el.classList.toggle('below',!selected);
    el.style.display=selected?'':'none';
    el.setAttribute('aria-hidden',String(!selected));
    el.inert=!selected;
  });
  document.body.dataset.section=id;
  window.scrollTo({top:0,behavior:'instant'});
  var current=document.getElementById(id);current.setAttribute('tabindex','-1');current.focus({preventScroll:true});
}

/* ── MEDITAR ── */
var medCfg={mode:0,dur:10,snd:0};
var medState={on:false,paused:false,elapsed:0,total:0,interval:null,guideIdx:0};
var medAudioEl=null;
var medGuideAudioEl=null;
var MED_SND=['Lluvia2.mp3','olas.mp3','fuego.mp3','viento.mp3','cuencos.mp3'];
var MED_GUIDE_AUDIO=['silencio.mp3','bodyscan.mp3','gratitud.mp3','visualizacion.mp3'];

var MED_MODES=[
  {name:'Silencio',       icon:'🧘'},
  {name:'Body Scan',      icon:'🧘'},
  {name:'Gratitud',       icon:'☀️'},
  {name:'Visualización',  icon:'⛺'}
];

var MED_PHRASES=[
  'Cada momento de quietud te acerca más a ti mismo.',
  'La paz que encontraste aquí siempre estará contigo.',
  'Has dedicado tiempo a lo más importante: tú.',
  'La mente descansada ve con claridad lo que el ruido oculta.',
  'Has plantado una semilla de calma que seguirá creciendo.',
  'El silencio interior es el mayor regalo que puedes darte.'
];

// Guidance: f = fraction of session duration when text appears
var MED_GUIDES=[
  [ // Silencio
    {f:0.04,t:'Cierra los ojos. Siente tu respiración.'},
    {f:0.22,t:'Deja pasar los pensamientos sin seguirlos.'},
    {f:0.45,t:'Vuelve siempre al ritmo suave de tu aliento.'},
    {f:0.66,t:'Estás en paz. Solo existe este momento.'},
    {f:0.86,t:'Permite que todo sea exactamente como es.'}
  ],
  [ // Body Scan
    {f:0.05,t:'Lleva tu atención a los pies y los dedos…'},
    {f:0.18,t:'Sube lentamente por tobillos y pantorrillas…'},
    {f:0.32,t:'Rodillas y muslos. Siente el peso del cuerpo…'},
    {f:0.46,t:'Abdomen y espalda baja. Respira aquí…'},
    {f:0.60,t:'Pecho y corazón. Nota cada latido…'},
    {f:0.73,t:'Hombros, brazos, manos. Suelta toda tensión…'},
    {f:0.86,t:'Cuello, mandíbula, frente. Todo se relaja.'}
  ],
  [ // Gratitud
    {f:0.05,t:'Piensa en tres cosas que agradeces hoy.'},
    {f:0.22,t:'Alguien que te ha dado amor o apoyo.'},
    {f:0.38,t:'Una fortaleza o habilidad que valoras en ti.'},
    {f:0.54,t:'Un momento de belleza que viviste.'},
    {f:0.70,t:'Siente la gratitud expandirse en tu pecho.'},
    {f:0.86,t:'Mereces todo el amor que das a los demás.'}
  ],
  [ // Visualización
    {f:0.05,t:'Imagina un lugar que te traiga calma y paz…'},
    {f:0.20,t:'Siente la textura del suelo bajo tus pies…'},
    {f:0.36,t:'Escucha los sonidos de ese lugar…'},
    {f:0.52,t:'Siente el aire en tu piel, la temperatura…'},
    {f:0.68,t:'Eres libre aquí. Nada puede hacerte daño.'},
    {f:0.85,t:'Lleva esta paz contigo al abrir los ojos.'}
  ]
];

function medBell(freq,dur){
  try{
    var ctx=getCtx(),osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);osc.type='sine';osc.frequency.value=freq;
    gain.gain.setValueAtTime(.07,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+dur);
    osc.start();osc.stop(ctx.currentTime+dur);
    medChimes.push(osc);
    osc.onended=function(){medChimes=medChimes.filter(function(x){return x!==osc;});osc.disconnect();gain.disconnect();};
  }catch(e){}
}

var medAudioCtx=null,medSource=null,medChimes=[];
var medAmbientGain=null;

function medGetCtx(){
  medAudioCtx=getCtx();return medAudioCtx;
}
function medSetAmbientGain(val,rampSec){
  if(!medAmbientGain||!medAudioCtx) return;
  var g=medAmbientGain.gain;
  g.cancelScheduledValues(medAudioCtx.currentTime);
  g.setValueAtTime(g.value,medAudioCtx.currentTime);
  if(rampSec) g.linearRampToValueAtTime(val,medAudioCtx.currentTime+rampSec);
  else g.setValueAtTime(val,medAudioCtx.currentTime);
}
function medStopGuideAudio(){
  if(medGuideAudioEl){try{medGuideAudioEl.pause(); medGuideAudioEl.src='';}catch(e){} medGuideAudioEl=null;}
}
function medStartGuideAudio(modeIdx){
  medStopGuideAudio();
  if(modeIdx===0) return;
  var a=new Audio(MED_GUIDE_AUDIO[modeIdx]);medGuideAudioEl=a;
  medSetAmbientGain(.05,.5);
  a.addEventListener('ended',function(){if(medGuideAudioEl===a) medSetAmbientGain(.22,2);});
  // Begin inside the user's tap, including Safari's audio permission gesture.
  a.play().catch(function(){
    if(medGuideAudioEl===a&&medState.on){medSetAmbientGain(.22,1);notifyApp('La voz no pudo reproducirse. Puedes seguir la guía en pantalla.');}
  });
}
function medStopAudio(){
  if(medAudioEl){medAudioEl.pause();medAudioEl.removeAttribute('src');medAudioEl.load();medAudioEl=null;}
  if(medSource){try{medSource.disconnect();}catch(e){}medSource=null;}
  if(medAmbientGain){try{medAmbientGain.disconnect();}catch(e){}medAmbientGain=null;}
}
function medStartAudio(sndIdx){
  medStopAudio();if(sndIdx<0) return;
  var a=new Audio(MED_SND[sndIdx]);a.loop=true;a.volume=.22;medAudioEl=a;
  try{
    var ctx=medGetCtx();a.volume=1;
    medSource=ctx.createMediaElementSource(a);medAmbientGain=ctx.createGain();medAmbientGain.gain.value=0;
    medSource.connect(medAmbientGain);medAmbientGain.connect(ctx.destination);medSetAmbientGain(.22,1);
  }catch(e){a.volume=.22;}
  a.play().catch(function(){if(medAudioEl===a&&medState.on) notifyApp('No se pudo reproducir el ambiente. Puedes continuar sin sonido.');});
}

function medFmt(s){var m=Math.floor(s/60),ss=s%60;return m+':'+(ss<10?'0':'')+ss;}

function medUpdateRing(elapsed,total){
  var frac=total>0?Math.min(1,elapsed/total):0;
  var el=document.getElementById('medRingFg');
  if(el) el.style.strokeDashoffset=(515.22*(1-frac));
}

function medSpeak(text){
  try{
    if(!window.speechSynthesis) return;
    speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(text);
    u.lang='es-ES'; u.rate=0.76; u.pitch=1.12; u.volume=0.88;
    // Prefer a high-quality female voice (Monica es-ES, Paulina es-MX)
    var voices=speechSynthesis.getVoices();
    var best=voices.find(function(v){return /Monica|Paulina/i.test(v.name);})
      ||voices.find(function(v){return v.lang.startsWith('es')&&v.localService;})
      ||voices.find(function(v){return v.lang.startsWith('es');});
    if(best) u.voice=best;
    speechSynthesis.speak(u);
  }catch(e){}
}
function medShowGuide(text){
  var el=document.getElementById('medGuideText');
  el.textContent=text;el.classList.add('show');
}

function medTick(){
  if(!medState.on||medState.paused) return;
  medState.elapsed=Math.min(medState.total,Math.floor((medState.elapsedMs+Math.max(0,Date.now()-medState.segmentStartedAt))/1000));
  var rem=Math.max(0,medState.total-medState.elapsed);
  document.getElementById('medElapsedDisp').textContent=medFmt(medState.elapsed);
  document.getElementById('medTimeDisp').textContent=medFmt(rem)+' restantes';
  medUpdateRing(medState.elapsed,medState.total);
  var guides=MED_GUIDES[medCfg.mode],guide=null;
  while(medState.guideIdx<guides.length&&medState.elapsed>=Math.floor(guides[medState.guideIdx].f*medState.total)) guide=guides[medState.guideIdx++];
  if(guide) medShowGuide(guide.t);
  if(medState.elapsed>=medState.total) medComplete();
}

function medComplete(){
  if(!medState.on) return;
  clearInterval(medState.interval);medState.on=false;medState.paused=false;
  medStopAudio();medStopGuideAudio();
  medChimes.forEach(function(o){try{o.stop();}catch(e){}});
  if(medCfg.snd>=0||medCfg.mode!==0) medBell(396,2);
  addRecord({id:Date.now(),date:todayStr(),med_mode:MED_MODES[medCfg.mode].name,med_dur:medCfg.dur,med_snd:medCfg.snd,elapsed_seconds:medState.total,completed:true});
  document.getElementById('medCtrl').style.display='none';
  document.getElementById('medGuideBox').style.display='none';
  var done=document.getElementById('medDone');done.style.display='';done.style.opacity='1';
  document.getElementById('medDonePhrase').textContent=MED_PHRASES[Math.floor(Math.random()*MED_PHRASES.length)];
  document.getElementById('medDoneStats').textContent=MED_MODES[medCfg.mode].name+' · '+medCfg.dur+' minutos';
  renderMedHist();
}

function medStart(){
  if(medState.on) return;
  medChimes.forEach(function(o){try{o.stop();}catch(e){}});
  medState.elapsed=0;medState.elapsedMs=0;medState.segmentStartedAt=Date.now();medState.total=medCfg.dur*60;
  medState.paused=false;medState.on=true;medState.guideIdx=0;
  medStartAudio(medCfg.snd);
  if(medCfg.snd>=0||medCfg.mode!==0) medBell(528,1.2);
  medStartGuideAudio(medCfg.mode);
  document.getElementById('medSetup').style.display='none';document.getElementById('btnMedStart').style.display='none';document.getElementById('medDone').style.display='none';
  document.getElementById('medModeLabel').textContent=MED_MODES[medCfg.mode].name;
  ['medModeLabel','medRingWrap','medGuideBox','medCtrl'].forEach(function(id){document.getElementById(id).style.display='';});
  document.getElementById('medElapsedDisp').textContent='0:00';
  document.getElementById('medTimeDisp').textContent=medFmt(medState.total)+' restantes';medUpdateRing(0,medState.total);
  medShowGuide('Acomódate. Este momento es para ti.');
  document.getElementById('btnMedPause').innerHTML='&#9646;&#9646; Pausa';
  clearInterval(medState.interval);medState.interval=setInterval(medTick,250);
  document.getElementById('btnMedPause').focus({preventScroll:true});
}

function medPause(){
  if(!medState.on) return;
  if(!medState.paused){
    medState.elapsedMs+=Math.max(0,Date.now()-medState.segmentStartedAt);medState.paused=true;
    if(medAudioEl) medAudioEl.pause();if(medGuideAudioEl) medGuideAudioEl.pause();
    medChimes.forEach(function(o){try{o.stop();}catch(e){}});
  }else{
    medState.segmentStartedAt=Date.now();medState.paused=false;
    try{medGetCtx();}catch(e){}
    if(medGuideAudioEl&&!medGuideAudioEl.ended) medGuideAudioEl.play().catch(function(){notifyApp('La voz no pudo reanudarse.');});
    if(medAudioEl) medAudioEl.play().catch(function(){notifyApp('El sonido no pudo reanudarse.');});
  }
  document.getElementById('btnMedPause').innerHTML=medState.paused?'&#9654; Reanudar':'&#9646;&#9646; Pausa';
}

function medStop(){
  clearInterval(medState.interval);medState.on=false;medState.paused=false;
  medStopAudio();medStopGuideAudio();
  medChimes.forEach(function(o){try{o.stop();}catch(e){}});
  ['medCtrl','medGuideBox','medModeLabel','medRingWrap','medDone'].forEach(function(id){document.getElementById(id).style.display='none';});
  document.getElementById('medSetup').style.display='';document.getElementById('btnMedStart').style.display='';
}

function renderMedHist(){
  var recs=getRecords().filter(function(r){return r.med_mode;});
  recs.sort(function(a,b){return b.id-a.id;}); recs=recs.slice(0,5);
  var el=document.getElementById('medHistList'); if(!el) return;
  if(!recs.length){
    el.innerHTML='<div style="color:#b0c8ca;font-family:\'Josefin Sans\',sans-serif;font-size:0.875rem;letter-spacing:0px;padding:8px 4px">Sin sesiones aún</div>';
    return;
  }
  el.innerHTML=recs.map(function(r){
    return '<div class="med-hist-item"><div class="med-hist-icon">&#129496;</div><div class="med-hist-info"><div class="med-hist-mode">'+escapeHTML(r.med_mode)+'</div><div class="med-hist-date">'+escapeHTML(r.date)+'</div></div><div class="med-hist-dur">'+escapeHTML(r.med_dur)+' min</div></div>';
  }).join('');
}

// Wire selectors
document.querySelectorAll('.med-mode').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.med-mode').forEach(function(x){x.classList.remove('on');});
    this.classList.add('on'); medCfg.mode=parseInt(this.dataset.m);
  });
});
document.querySelectorAll('.med-dur-btn').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.med-dur-btn').forEach(function(x){x.classList.remove('on');});
    this.classList.add('on'); medCfg.dur=parseInt(this.dataset.d);
  });
});
document.querySelectorAll('.med-snd').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.med-snd').forEach(function(x){x.classList.remove('on');});
    this.classList.add('on'); medCfg.snd=parseInt(this.dataset.s);
  });
});
document.getElementById('btnMedStart').addEventListener('click',medStart);
document.getElementById('btnMedPause').addEventListener('click',medPause);
document.getElementById('btnMedStop').addEventListener('click',medStop);
document.getElementById('btnMedAgain').addEventListener('click',function(){
  document.getElementById('medDone').style.display='none';
  document.getElementById('medModeLabel').style.display='none';
  document.getElementById('medRingWrap').style.display='none';
  document.getElementById('medSetup').style.display='';
  document.getElementById('btnMedStart').style.display='';
});

// Accessible state for the retained selector controls.
function syncPressed(){
  document.querySelectorAll('.med-mode,.med-dur-btn,.med-snd,.hrv-chip,.hrv-mood,.hrv-tab').forEach(function(el){el.setAttribute('aria-pressed',String(el.classList.contains('on')));});
}
document.addEventListener('click',syncPressed);
document.querySelectorAll('.hrv-mood').forEach(function(el,i){el.setAttribute('aria-label',['Muy inquieto','Desanimado','Neutral','Bien','En calma'][i]);});
document.querySelectorAll('#hrv,#freqmed').forEach(function(el){el.lang='es';});
document.getElementById('medGuideText').setAttribute('aria-live','polite');
document.getElementById('medElapsedDisp').setAttribute('role','timer');
document.getElementById('hrvChartSvg').setAttribute('role','img');
document.getElementById('hrvChartSvg').setAttribute('aria-label','Tendencia del promedio diario de HRV, en milisegundos');
document.addEventListener('visibilitychange',function(){if(!document.hidden){if(state.on)runPhase();if(medState.on)medTick();}});
window.addEventListener('pagehide',function(){
  if(state.on){clearInterval(tSess);state.on=false;}
  document.body.classList.remove('sess-active');document.getElementById('btnBegin').disabled=false;
  clearTimeout(state.finishTimer);stopAmbience();medStop();
  activeChimes.forEach(function(o){try{o.stop();}catch(e){}});
  document.querySelectorAll('.yt-wrap video').forEach(function(v){v.pause();});
});
window.addEventListener('pageshow',function(e){if(e.persisted){showScreen('setup');setNav('navHome');}});
syncPressed();setNav('navHome');
