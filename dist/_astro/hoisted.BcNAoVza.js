import"./hoisted.BQCfQBYH.js";const p=document.getElementById("lex-data"),d=p.dataset.base,c=JSON.parse(atob(p.dataset.taxonomy)),l={};for(const e of Object.keys(c))l[e]={sort:"alpha",collapsed:!1};function n(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function m(e){const s=document.getElementById(`list-${e}`);if(!s)return;const a=[...c[e]];l[e].sort==="alpha"?a.sort((o,t)=>o.term.localeCompare(t.term)):a.sort((o,t)=>t.poems.length-o.poems.length||o.term.localeCompare(t.term)),s.innerHTML=a.map(({term:o,poems:t})=>{const r=`${e}-${o.replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"")}`,g=t.map(i=>`<a href="${d}/poem/${n(i.slug)}">${n(i.title)}</a>`).join(`
`);return`<div>
  <div class="lex-term-row" data-id="${r}">
    <span class="lex-term-name">${n(o)}</span>
    <span class="lex-term-meta">
      <a class="lex-browse-link"
         href="${d}/browse?term=${encodeURIComponent(o)}&cats=${e}"
         title="Filter in Browse"
         onclick="event.stopPropagation()">browse</a>
      <span class="lex-term-count">${t.length}</span>
      <span class="lex-chevron">▶</span>
    </span>
  </div>
  <div class="lex-poem-list" id="poems-${r}">${g}</div>
</div>`}).join(""),s.querySelectorAll(".lex-term-row").forEach(o=>{o.addEventListener("click",()=>{const t=document.getElementById(`poems-${o.dataset.id}`);t&&(t.classList.toggle("open"),o.classList.toggle("open"))})})}document.querySelectorAll(".sort-btn").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.key,a=e.dataset.sort;if(l[s].sort===a)return;l[s].sort=a,document.querySelectorAll(`.sort-btn[data-key="${s}"]`).forEach(t=>{t.classList.toggle("active",t.dataset.sort===a)}),document.getElementById(`list-${s}`)?.querySelectorAll(".lex-poem-list.open, .lex-term-row.open").forEach(t=>t.classList.remove("open")),m(s)})});document.querySelectorAll(".collapse-btn").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.key,a=document.getElementById(`block-${s}`);l[s].collapsed=!l[s].collapsed,a.classList.toggle("collapsed",l[s].collapsed)})});for(const e of Object.keys(c))m(e);
