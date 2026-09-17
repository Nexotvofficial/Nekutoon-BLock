// RESOURCES viene de data.js (generado por generator.py a partir de resources.yaml)

const grid = document.getElementById("resourceGrid");
const searchInput = document.getElementById("searchInput");
const catGrid = document.getElementById("catGrid");
const emptyMsg = document.getElementById("emptyMsg");

let activeCategory = "all";

function renderCard(item) {
  return `
    <article class="card">
      <div class="card-thumb" style="background:linear-gradient(135deg, hsl(${item.hue}) 0%, #12141a 90%)"></div>
      <div class="card-body">
        <h3>${item.name}</h3>
        <div class="card-meta">
          <span>${item.version}</span>
          <span class="rating">★ ${item.rating}</span>
        </div>
        <div class="card-meta">
          <span>${item.downloads} descargas</span>
        </div>
        <button class="card-download" data-id="${item.id}">Descargar</button>
      </div>
    </article>
  `;
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = RESOURCES.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesQuery = item.name.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  grid.innerHTML = filtered.map(renderCard).join("");
  emptyMsg.hidden = filtered.length !== 0;
}

catGrid.addEventListener("click", (e) => {
  const btn = e.target.closest(".cat-card");
  if (!btn) return;
  catGrid.querySelectorAll(".cat-card").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.cat;
  render();
});

searchInput.addEventListener("input", render);

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".card-download");
  if (!btn) return;
  const item = RESOURCES.find(r => r.id === Number(btn.dataset.id));
  alert(`Descargando "${item.name}"... (conecta este botón a tu backend/repo real de archivos)`);
});

document.getElementById("scrollToGrid").addEventListener("click", () => {
  document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
});

render();
