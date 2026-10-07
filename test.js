const E=require("./core.js");
function ok(x,m){if(!x)throw new Error(m)}
let s=E.empty();
E.record(s,"Probability","concept",20,"2026-01-01T00:00:00Z");
E.record(s,"Algebra","procedure",50,"2026-01-01T00:01:00Z");
ok(s.events.length===2,"events");
ok(E.recommendation(s).cause==="concept","recommendation");
const topics=E.byTopic(s);
ok(topics.Probability.events===1,"topic event");
ok(topics.Algebra.evidence>0,"topic evidence");
const ins=E.instructorInsight(s);
ok(ins.events===2,"insight count");
ok(ins.topTopic==="Probability","priority topic");
ok(E.serialize(s).includes('"schema": 2'),"schema");
console.log("ALL TESTS PASSED");
