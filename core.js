(function(root,factory){
  if(typeof module==="object"&&module.exports){module.exports=factory();}
  else{root.MisconceptionEngine=factory();}
})(typeof self!=="undefined"?self:this,function(){
  const LABELS={concept:"Concept selection",procedure:"Procedure",attention:"Attention / reading",confidence:"Confidence calibration"};
  const TESTS={
    concept:"Give two near-identical problems where only the governing concept changes. Ask the learner to choose the method before calculating.",
    procedure:"Give one familiar problem and require a narrated step-by-step solution. Score the first invalid transformation.",
    attention:"Give a short problem with one deliberately easy-to-miss constraint. Require the learner to restate constraints before solving.",
    confidence:"Give a medium-difficulty item, require a probability-of-correctness estimate, then compare confidence with accuracy."
  };
  function empty(){return {events:[],weights:{concept:0,procedure:0,attention:0,confidence:0}}}
  function evidence(confidence){const c=Math.max(0,Math.min(100,Number(confidence)||0));return (100-c)/100+0.5}
  function record(state,topic,cause,confidence,at){
    if(!state||!state.weights||!state.events)state=empty();
    if(!(cause in state.weights))throw new Error("Unknown cause");
    const e=evidence(confidence);
    state.weights[cause]+=e;
    state.events.unshift({topic:String(topic||"Unknown"),cause,confidence:Number(confidence)||0,evidence:e,time:at||new Date().toISOString()});
    return state;
  }
  function ranked(state){return Object.entries(state.weights).sort(function(a,b){return b[1]-a[1]})}
  function recommendation(state){
    const r=ranked(state),top=r[0][0],sum=r.reduce(function(s,x){return s+x[1]},0);
    const confidence=sum? r[0][1]/sum:0;
    return {cause:top,label:LABELS[top],test:TESTS[top],posteriorShare:confidence};
  }
  function byTopic(state){
    const out={};
    state.events.forEach(function(e){
      if(!out[e.topic])out[e.topic]={events:0,evidence:0,causes:{concept:0,procedure:0,attention:0,confidence:0}};
      out[e.topic].events+=1;
      out[e.topic].evidence+=e.evidence;
      out[e.topic].causes[e.cause]+=e.evidence;
    });
    return out;
  }
  function instructorInsight(state){
    if(!state.events.length)return {events:0,topTopic:null,dominantCause:null,dominantLabel:null,intervention:"Collect a few learner errors first."};
    const topics=byTopic(state);
    const topTopic=Object.entries(topics).sort(function(a,b){return b[1].evidence-a[1].evidence})[0][0];
    const rec=recommendation(state);
    return {
      events:state.events.length,
      topTopic:topTopic,
      dominantCause:rec.cause,
      dominantLabel:rec.label,
      evidenceShare:rec.posteriorShare,
      intervention:TESTS[rec.cause]
    };
  }
  function serialize(state){return JSON.stringify({schema:2,state},null,2)}
  return {LABELS,TESTS,empty,evidence,record,ranked,recommendation,byTopic,instructorInsight,serialize};
});