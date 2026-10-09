// Load one device-appropriate video after the page has painted.
const video=document.querySelector('#hero-video');
const videoButton=document.querySelector('#video-toggle');
const label=document.querySelector('#video-label');
const videoNotice=document.querySelector('#video-notice');
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const connection=navigator.connection;
let manuallyPaused=false, explicitPlayback=false, blocked=false;
let inView=false, pageReady=false, playPending=null;
video.muted=true;
video.defaultMuted=true;
function automaticMotionAllowed(){return !motionPreference.matches&&!connection?.saveData;}
function canPlay(){return pageReady&&inView&&!document.hidden&&!manuallyPaused&&!blocked&&(explicitPlayback||automaticMotionAllowed());}
function updateVideo(){
 const paused=video.paused;
 label.textContent=paused?'Play video':'Pause video';
 videoButton.setAttribute('aria-label',paused?'Play background video':'Pause background video');
 videoButton.querySelector('span').textContent=paused?'▷':'Ⅱ';
 const needsChoice=!explicitPlayback&&!automaticMotionAllowed();
 videoNotice.hidden=!(inView&&!document.hidden&&!manuallyPaused&&paused&&(blocked||needsChoice));
 videoNotice.querySelector('span').textContent=video.error?'The video could not load. Try again.':needsChoice?'Motion is paused to respect your device preferences.':'Tap play to start the background video.';
}
function setVideoSource(){
 if(video.getAttribute('src'))return;
 video.src=window.matchMedia('(max-width: 900px)').matches?video.dataset.mobileSrc:video.dataset.desktopSrc;
 video.load();
}
function syncPlayback(){
 if(!canPlay()){
   if(!video.paused)video.pause();
   updateVideo();
   return;
 }
 if(playPending||!video.paused)return;
 setVideoSource();
 video.muted=true;
 playPending=(async()=>{
   let interrupted=false;
   try{await video.play();if(!canPlay())video.pause();}
   catch(error){interrupted=error.name==='AbortError';if(canPlay()&&!interrupted)blocked=true;}
   finally{playPending=null;updateVideo();if(interrupted&&canPlay())queueMicrotask(syncPlayback);}
 })();
}
function playByChoice(){
 explicitPlayback=true;manuallyPaused=false;blocked=false;
 if(video.error)video.load();
 syncPlayback();
}
video.addEventListener('play',updateVideo);
video.addEventListener('pause',updateVideo);
video.addEventListener('error',()=>{blocked=true;updateVideo();});
videoButton.addEventListener('click',()=>{
 if(video.paused)playByChoice();
 else{manuallyPaused=true;syncPlayback();}
});
document.querySelector('#video-retry').addEventListener('click',playByChoice);
document.addEventListener('visibilitychange',syncPlayback);
motionPreference.addEventListener?.('change',syncPlayback);
connection?.addEventListener?.('change',syncPlayback);
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{
   inView=entries[0].isIntersecting;syncPlayback();
 },{threshold:0});
 observer.observe(document.querySelector('.hero-media'));
}else{
 // Older browsers still pause on tab changes and honour manual controls.
 inView=true;
}
requestAnimationFrame(()=>requestAnimationFrame(()=>{pageReady=true;syncPlayback();}));
updateVideo();
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.querySelectorAll('a,button').forEach(item=>item.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('.project').forEach(p=>p.hidden=button.dataset.filter!=='all'&&p.dataset.category!==button.dataset.filter);}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}});
const projects={atlas:{title:'Atlas AI',summary:'An AI knowledge assistant concept for teams with information scattered across tools.',challenge:'Make internal information easier to find while keeping answers grounded in approved knowledge.',approach:'Connect selected knowledge sources, retrieve relevant information, and present concise answers with source references and clear access rules.',stack:['AI agents','Retrieval augmented generation','API integrations']},flow:{title:'FlowOps',summary:'An operations concept that brings routine sales and delivery workflows into one connected process.',challenge:'Reduce repetitive data entry and missed handoffs between CRM, project management, and communication tools.',approach:'Map the workflow, connect the required tools, and automate task creation, record updates, notifications, and exception handling.',stack:['Workflow automation','CRM APIs','Event driven integrations']}};
const projectDialog=document.querySelector('#project-dialog'),briefDialog=document.querySelector('#brief-dialog');
function openDialog(dialog){document.querySelectorAll('dialog[open]').forEach(d=>d.close());dialog.showModal();document.body.classList.add('dialog-open');}
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>{const p=projects[b.dataset.project];document.querySelector('#project-dialog-title').textContent=p.title;document.querySelector('#project-summary').textContent=p.summary;document.querySelector('#project-challenge').textContent=p.challenge;document.querySelector('#project-approach').textContent=p.approach;const stack=document.querySelector('#project-stack');stack.replaceChildren(...p.stack.map(s=>{const item=document.createElement('span');item.textContent=s;return item;}));openDialog(projectDialog);}));
document.querySelectorAll('.open-brief').forEach(b=>b.addEventListener('click',()=>openDialog(briefDialog)));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open');});dialog.addEventListener('click',e=>{if(e.target===dialog){const bounds=dialog.getBoundingClientRect();if(e.clientX<bounds.left||e.clientX>bounds.right||e.clientY<bounds.top||e.clientY>bounds.bottom)dialog.close();}});});
const quotes=[{text:'They made a complex product feel simple. The process was clear, the communication was thoughtful, and every detail had a purpose.',author:'Product Lead',company:'Sample SaaS company'},{text:'The team connected our tools into a workflow that finally made sense. We could spend more time on customers and less time moving information around.',author:'Operations Director',company:'Sample services company'},{text:'Our vision became an interactive experience people could actually explore. The balance between design and performance stood out from the start.',author:'Brand Manager',company:'Sample commerce company'}];
let quoteIndex=0;function showQuote(index){quoteIndex=(index+quotes.length)%quotes.length;const q=quotes[quoteIndex];document.querySelector('#quote-text').textContent=q.text;document.querySelector('#quote-author').textContent=q.author;document.querySelector('#quote-company').textContent=q.company;document.querySelector('#quote-count').textContent=`0${quoteIndex+1} / 03`;}
document.querySelector('#quote-prev').addEventListener('click',()=>showQuote(quoteIndex-1));document.querySelector('#quote-next').addEventListener('click',()=>showQuote(quoteIndex+1));
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#brief-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const values=Object.fromEntries(new FormData(form));const text=`BINARY BRAINS — PROJECT BRIEF\n\nName: ${values.name}\nCompany: ${values.company||'Not specified'}\nService: ${values.service}\n\nProject idea:\n${values.idea}\n\nPreferred timeline: ${values.timeline||'Not specified'}\nBudget range: ${values.budget||'Not specified'}\n\nThis brief was prepared locally. No inquiry has been sent.\n`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='binary-brains-project-brief.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);document.querySelector('#brief-message').textContent='Your brief is ready. Save it and share it with your team.';});
