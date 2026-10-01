(function(){
  const root=document.documentElement;
  let saved=null;
  try{saved=localStorage.getItem('federico-theme');}catch(_error){}
  root.dataset.theme=saved==='light'?'light':'dark';
  const button=document.querySelector('[data-theme-toggle]');
  if(button){
    const sync=()=>{const light=root.dataset.theme==='light';const english=root.lang==='en';button.setAttribute('aria-label',english?(light?'Use dark theme':'Use light theme'):(light?'Attiva tema scuro':'Attiva tema chiaro'));button.setAttribute('aria-pressed',String(light));};
    button.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='light'?'dark':'light';try{localStorage.setItem('federico-theme',root.dataset.theme);}catch(_error){}sync();});
    sync();
  }
  // Language routes are derived from the shared stylesheet URL so previews and Pages work alike.
  const stylesheet=document.querySelector('link[rel="stylesheet"][href*="site.css"]');
  const headerTools=document.querySelector('.header-tools');
  if(stylesheet&&headerTools){
    const docsRoot=new URL('../',stylesheet.href);
    const current=new URL(location.href);
    if(current.href.startsWith(docsRoot.href)){
      let route=current.href.slice(docsRoot.href.length).split(/[?#]/,1)[0];
      if(!route||route.endsWith('/'))route+='index.html';
      const english=route.startsWith('en/');
      const language=document.createElement('a');
      language.className='utility-link';
      language.href=new URL(english?route.slice(3):'en/'+route,docsRoot).href;
      language.lang=english?'it':'en';
      language.hreflang=english?'it':'en';
      language.textContent=english?'IT':'EN';
      language.setAttribute('aria-label',english?'Leggi in italiano':'Read in English');
      headerTools.insertBefore(language,headerTools.firstChild);
    }
  }
  const githubButton=document.querySelector('[data-github-notice]');
  const githubFeedback=document.getElementById('github-feedback');
  if(githubButton&&githubFeedback){
    githubButton.addEventListener('click',()=>{
      githubFeedback.hidden=false;
      githubButton.setAttribute('aria-expanded','true');
    });
  }
})();
