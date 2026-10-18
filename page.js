// Sections remain usable without JavaScript.
function revealHash(){
  let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
  const target=document.getElementById(id);if(!target)return;
  let node=target;while(node){if(node.tagName==='DETAILS')node.open=true;node=node.parentElement;}
  requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
}
window.addEventListener('hashchange',revealHash);revealHash();
const toggleAll=document.getElementById('toggle-all');
const sections=[...document.querySelectorAll('#topics > details')];
function updateToggle(){
  if(!toggleAll)return;
  const allOpen=sections.every(section=>section.open);
  toggleAll.textContent=allOpen?'すべて閉じる':'すべて開く';
  toggleAll.setAttribute('aria-expanded',String(allOpen));
}
if(toggleAll){
  toggleAll.hidden=false;
  toggleAll.addEventListener('click',()=>{
    const open=!sections.every(section=>section.open);
    sections.forEach(section=>section.open=open);
    updateToggle();
  });
  sections.forEach(section=>section.addEventListener('toggle',updateToggle));
  updateToggle();
}
let beforePrint=[];
window.addEventListener('beforeprint',()=>{beforePrint=[...document.querySelectorAll('details')].map(node=>[node,node.open]);beforePrint.forEach(([node])=>node.open=true);});
window.addEventListener('afterprint',()=>{beforePrint.forEach(([node,open])=>node.open=open);beforePrint=[];});
