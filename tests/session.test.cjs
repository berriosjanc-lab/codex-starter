const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'calma.js'), 'utf8');
function loadFunctions(names, additions = {}) {
  const context = vm.createContext({ ...additions });
  for (const name of names) {
    const match = source.match(new RegExp('function ' + name + '\\([^\\n]*\\)\\s*\\{[\\s\\S]*?\\n\\}'));
    assert.ok(match, `Function ${name} exists`);
    vm.runInContext(match[0], context);
  }
  return context;
}
function fakeOutputs() {
  const values = new Map();
  return { getElementById(id) {
    if (!values.has(id)) values.set(id, { style: {}, classList: { add() {}, remove() {} } });
    return values.get(id);
  }};
}

test('All four breathing patterns follow their own phase boundaries', () => {
  const c = loadFunctions(['breathingFrame']);
  vm.runInContext(source.match(/var PATS_BASE = \[[\s\S]*?\n\];/)[0], c);
  for (const pattern of c.PATS_BASE) {
    let elapsed = 0;
    pattern.phases.forEach((phase, index) => {
      const frame = c.breathingFrame(elapsed, pattern.phases);
      assert.equal(frame.index, index);
      assert.equal(frame.position, 0);
      assert.equal(c.breathingFrame(elapsed + phase.d - .01, pattern.phases).index, index);
      elapsed += phase.d;
    });
    assert.equal(c.breathingFrame(elapsed, pattern.phases).index, 0);
    assert.equal(c.breathingFrame(elapsed, pattern.phases).cycle, 1);
    assert.equal(c.breathingFrame(elapsed * 12 + 1, pattern.phases).cycle, 12);
  }
});

test('The circle expands, holds, contracts, and rests with the breathing phase', () => {
  const c = loadFunctions(['breathingFrame']);
  const phases = [{t:'inhale',d:4},{t:'hold',d:4},{t:'exhale',d:4},{t:'holdout',d:4}];
  assert.equal(c.breathingFrame(0, phases).scale, .58);
  assert.equal(c.breathingFrame(4, phases).scale, 1);
  assert.equal(c.breathingFrame(7.9, phases).scale, 1);
  assert.ok(Math.abs(c.breathingFrame(10, phases).scale - .79) < 1e-9);
  assert.equal(c.breathingFrame(12, phases).scale, .58);
});

test('Meditation catches up after timer throttling and completes only once', () => {
  let now = 111000, completed = 0;
  const state = {on:true,paused:false,total:180,elapsedMs:10000,segmentStartedAt:100000,guideIdx:0};
  const c = loadFunctions(['medTick'], {
    medState:state, medCfg:{mode:0}, MED_GUIDES:[[]], Date:{now:()=>now},
    document:fakeOutputs(),medFmt:String,medUpdateRing(){},medShowGuide(){},
    medComplete(){completed++;state.on=false;}
  });
  c.medTick();assert.equal(state.elapsed,21);
  now = 400000;c.medTick();assert.equal(state.elapsed,180);assert.equal(completed,1);
  c.medTick();assert.equal(completed,1);
});

test('Pausing freezes elapsed time; resuming excludes time spent paused', () => {
  let now = 5000, plays = 0, pauses = 0;
  const state = {on:true,paused:false,total:180,elapsedMs:0,segmentStartedAt:0,guideIdx:0};
  const audio = {pause(){pauses++;},play(){plays++;return Promise.resolve();}};
  const c = loadFunctions(['medPause','medTick'], {
    medState:state,Date:{now:()=>now},document:fakeOutputs(),medAudioEl:audio,
    medGuideAudioEl:null,medChimes:[],medGetCtx(){},notifyApp(){},medCfg:{mode:0},
    MED_GUIDES:[[]],medFmt:String,medUpdateRing(){},medShowGuide(){},medComplete(){}
  });
  c.medPause();assert.equal(state.elapsedMs,5000);assert.equal(pauses,1);
  now=105000;c.medTick();assert.equal(state.elapsedMs,5000);
  c.medPause();assert.equal(plays,1);
  now=108000;c.medTick();assert.equal(state.elapsed,8);
});

test('Stopping meditation cancels its timer and stops both audio sources', () => {
  let timers=0,ambient=0,voice=0,chimes=0;
  const state={on:true,paused:true,interval:42};
  const c=loadFunctions(['medStop'],{
    medState:state,clearInterval(id){assert.equal(id,42);timers++;},
    medStopAudio(){ambient++;},medStopGuideAudio(){voice++;},
    medChimes:[{stop(){chimes++;}}],document:fakeOutputs()
  });
  c.medStop();assert.equal(state.on,false);assert.equal(state.paused,false);
  assert.deepEqual([timers,ambient,voice,chimes],[1,1,1,1]);
});

test('Ending a breathing session records actual duration, without duplicates', () => {
  let record;
  const state={on:true,startedAt:0};
  const document=fakeOutputs();document.querySelectorAll=()=>[];
  document.getElementById('hrvInput').value='42';
  const c=loadFunctions(['finish'],{
    state,cfg:{dur:3,pat:{name:'Calmar la mente'}},Date:{now:()=>30500},
    document,LANG:'es',T:{es:{complete:'Sesión completa'}},
    clearTimeout(){},clearInterval(){},tBegin:null,tPhase:null,tSess:1,
    todayStr:()=> '2026-09-05',addRecord(r){record=r;},stopAmbience(){},
    activeChimes:[],fmt:String,setTimeout(){return 1;}
  });
  c.finish();assert.equal(record.elapsed_seconds,30);assert.equal(record.duration,.51);
  assert.equal(record.completed,false);assert.equal(record.hrv,42);
  record=null;c.finish();assert.equal(record,null);
});

test('Existing local records survive and malformed storage does not crash the app', () => {
  let stored='[{"id":1,"date":"2026-09-05","med_mode":"Gratitud","med_dur":5}]';
  let message='';
  const c=loadFunctions(['getRecords','saveRecords'],{
    localStorage:{getItem:()=>stored,setItem(){throw new Error('full');}},
    notifyApp(m){message=m;}
  });
  assert.equal(c.getRecords()[0].med_mode,'Gratitud');
  stored='broken json';assert.equal(c.getRecords().length,0);
  stored='{}';assert.equal(c.getRecords().length,0);
  assert.equal(c.saveRecords([]),false);assert.ok(message);
});

test('Silence never creates an audio imitation of a vibration', () => {
  let calls=0;
  const c=loadFunctions(['haptic'],{soundOn:false,navigator:{vibrate(){calls++;}}});
  c.haptic('inhale');assert.equal(calls,0);
  c.soundOn=true;c.haptic('inhale');assert.equal(calls,1);
});

test('User record text is escaped before being placed in history markup', () => {
  const c=loadFunctions(['escapeHTML']);
  assert.equal(c.escapeHTML('<img src=x onerror="alert(1)">'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
});
