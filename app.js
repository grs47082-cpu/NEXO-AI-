const KEY='nexo.tasks.v1';let tasks=JSON.parse(localStorage.getItem(KEY)||'[]');let currentFilter='all';
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function save(){localStorage.setItem(KEY,JSON.stringify(tasks));render()}
function fmtDate(d){if(!d)return 'Sem prazo';const x=new Date(d+'T12:00:00');return x.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','')}
function render(){
 const done=tasks.filter(t=>t.done).length, active=tasks.length-done, high=tasks.filter(t=>!t.done&&t.priority==='alta').length, pct=tasks.length?Math.round(done/tasks.length*100):0;
 $('#doneCount').textContent=done;$('#activeCount').textContent=active;$('#highCount').textContent=high;$('#progressCount').textContent=pct+'%';$('#progressBar').style.width=pct+'%';
 const byCat=c=>tasks.filter(t=>t.category===c).length;['pessoal','estudos','trabalho'].forEach(c=>$('#cat'+c[0].toUpperCase()+c.slice(1)).textContent=byCat(c)+(byCat(c)===1?' tarefa':' tarefas'));
 const sorted=[...tasks].sort((a,b)=>Number(a.done)-Number(b.done)||({alta:0,media:1,baixa:2}[a.priority]-({alta:0,media:1,baixa:2}[b.priority])));
 $('#dashboardTasks').innerHTML=sorted.slice(0,6).map(taskHTML).join('')||emptyHTML('Nenhuma tarefa ainda.','Crie sua primeira tarefa para começar.');
 let list=sorted;if(currentFilter==='active')list=list.filter(t=>!t.done);if(currentFilter==='done')list=list.filter(t=>t.done);if(currentFilter==='high')list=list.filter(t=>t.priority==='alta'&&!t.done);$('#allTasks').innerHTML=list.map(taskHTML).join('')||emptyHTML('Nada por aqui.','Esse filtro não possui tarefas.');
 $$('.check').forEach(b=>b.onclick=()=>toggle(b.dataset.id));$$('[data-delete]').forEach(b=>b.onclick=()=>remove(b.dataset.delete));
}
function emptyHTML(a,b){return `<div class="task" style="display:block;text-align:center;padding:30px"><strong>${a}</strong><div class="task-meta">${b}</div></div>`}
function taskHTML(t){return `<article class="task ${t.done?'done':''}"><button class="check ${t.done?'done':''}" data-id="${t.id}" aria-label="Concluir tarefa">${t.done?'✓':''}</button><div><div class="task-title">${escapeHTML(t.title)}</div><div class="task-meta">${t.category[0].toUpperCase()+t.category.slice(1)} · ${fmtDate(t.date)}</div></div><span class="badge ${t.priority}">${t.priority}</span><div class="task-actions"><button data-delete="${t.id}" aria-label="Excluir">×</button></div></article>`}
function escapeHTML(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function toggle(id){const t=tasks.find(x=>x.id===id);if(t){t.done=!t.done;save()}}
function remove(id){tasks=tasks.filter(x=>x.id!==id);save()}
function openModal(){ $('#modal').classList.remove('hidden');$('#titleInput').focus() }
function closeModal(){ $('#modal').classList.add('hidden');$('#taskForm').reset() }
$('#taskForm').onsubmit=e=>{e.preventDefault();tasks.unshift({id:crypto.randomUUID(),title:$('#titleInput').value.trim(),category:$('#categoryInput').value,priority:$('#priorityInput').value,date:$('#dateInput').value,done:false});save();closeModal()};$('#openModal').onclick=openModal;$('#openModal2').onclick=openModal;$('#closeModal').onclick=closeModal;$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');currentFilter=b.dataset.filter;render()});
function view(v){$$('.content').forEach(x=>x.classList.add('hidden'));$('#view-'+v).classList.remove('hidden');$$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===v));$('#pageTitle').textContent=v==='dashboard'?'Visão geral':v==='tasks'?'Tarefas':'Categorias';$('#sidebar').classList.remove('open')}
$$('.nav-item').forEach(b=>b.onclick=()=>view(b.dataset.view));$$('.text-button').forEach(b=>b.onclick=()=>view(b.dataset.view));$$('.category-card').forEach(b=>b.onclick=()=>{view('tasks');currentFilter='all';render()});$('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open');
$('#themeBtn').onclick=()=>document.body.classList.toggle('light');
const now=new Date();$('#today').textContent=now.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});
render();