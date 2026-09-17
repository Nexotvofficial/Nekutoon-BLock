const RESOURCES = [
  { id: 1, name: "Astra Shaders", category: "shaders", version: "1.21.4", downloads: "2.4M", rating: 4.9, hue: "160,90%,55%" },
  { id: 2, name: "LumaCraft Shaders", category: "shaders", version: "1.20.6", downloads: "986K", rating: 4.8, hue: "200,90%,55%" },
  { id: 3, name: "Voidlight Texture Pack", category: "texturepacks", version: "1.21", downloads: "641K", rating: 4.7, hue: "270,80%,55%" },
  { id: 4, name: "Frost King Skin", category: "skins", version: "1.21.3", downloads: "512K", rating: 4.8, hue: "195,90%,60%" },
  { id: 5, name: "Ember Warrior Skin", category: "skins", version: "1.20.6", downloads: "398K", rating: 4.6, hue: "10,85%,55%" },
  { id: 6, name: "Nether Overhaul Mod", category: "mods", version: "1.21", downloads: "1.1M", rating: 4.9, hue: "20,90%,55%" },
  { id: 7, name: "Simplex Texture Pack", category: "texturepacks", version: "1.20.4", downloads: "753K", rating: 4.7, hue: "140,70%,55%" },
  { id: 8, name: "Realistic Water Mod", category: "mods", version: "1.21.2", downloads: "820K", rating: 4.8, hue: "205,85%,55%" },
  { id: 9, name: "Solstice Shaders", category: "shaders", version: "1.19.4", downloads: "310K", rating: 4.5, hue: "35,90%,55%" }
];

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
