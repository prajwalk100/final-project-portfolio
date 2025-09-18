// Simple script: loads projects, handles contact form, and theme toggle
const projects = [
  {id:1,title:'Responsive Portfolio',desc:'A multi-page portfolio with responsive layout.',img:'images/project1.jpg'},
  {id:2,title:'Task Manager',desc:'Vanilla JS task manager with localStorage.',img:'images/project2.jpg'},
  {id:3,title:'Mini E‑commerce',desc:'Products listing + cart simulation.',img:'images/project3.jpg'}
];

function createProjectCard(p){
  const el = document.createElement('article');
  el.className = 'project';
  el.innerHTML = `
    <img loading="lazy" src="${p.img}" alt="${p.title} screenshot"/>
    <h4>${p.title}</h4>
    <p>${p.desc}</p>
  `;
  return el;
}

function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  projects.forEach(p=> grid.appendChild(createProjectCard(p)));
}

document.addEventListener('DOMContentLoaded',()=>{
  renderProjects();

  // contact form -> save to localStorage (demo)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const messages = JSON.parse(localStorage.getItem('messages')||'[]');
    messages.push({...data, created: new Date().toISOString()});
    localStorage.setItem('messages', JSON.stringify(messages));
    status.textContent = 'Message saved locally — demo only.';
    form.reset();
    setTimeout(()=> status.textContent = '', 3000);
  });

  // theme toggle
  const btn = document.getElementById('themeToggle');
  const current = localStorage.getItem('theme') || 'light';
  if(current === 'dark') document.documentElement.setAttribute('data-theme','dark');
  btn.addEventListener('click', ()=>{
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if(isDark){
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme','light');
    } else {
      document.documentElement.setAttribute('data-theme','dark');
      localStorage.setItem('theme','dark');
    }
  });
});