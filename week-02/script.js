// ===============================
// Estado Global
// ===============================

let lots = [];
let editingId = null;

// ===============================
// Persistencia
// ===============================

const loadItems = () => {
  const data = localStorage.getItem("agriculturalLots");
  return data ? JSON.parse(data) : [];
};

const saveItems = (items) => {
  localStorage.setItem("agriculturalLots", JSON.stringify(items));
};

// ===============================
// CRUD
// ===============================

const createItem = (itemData) => {
  const newItem = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: null,
    ...itemData
  };

  lots = [...lots, newItem];
  saveItems(lots);
  render();
};

const updateItem = (id, updates) => {
  lots = lots.map(item =>
    item.id === id
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );

  saveItems(lots);
  render();
};

const deleteItem = (id) => {
  lots = lots.filter(item => item.id !== id);
  saveItems(lots);
  render();
};

const toggleItemActive = (id) => {
  lots = lots.map(item =>
    item.id === id
      ? { ...item, active: !item.active }
      : item
  );

  saveItems(lots);
  render();
};

// ===============================
// Filtros y Búsqueda
// ===============================

const applyFilters = () => {
  const status = statusFilter.value;
  const category = categoryFilter.value;
  const priority = priorityFilter.value;
  const search = searchInput.value.toLowerCase();

  let filtered = [...lots];

  if (status === "active") filtered = filtered.filter(i => i.active);
  if (status === "inactive") filtered = filtered.filter(i => !i.active);
  if (category) filtered = filtered.filter(i => i.category === category);
  if (priority) filtered = filtered.filter(i => i.priority === priority);
  if (search)
    filtered = filtered.filter(i =>
      i.name.toLowerCase().includes(search) ||
      i.description.toLowerCase().includes(search)
    );

  return filtered;
};

// ===============================
// Estadísticas
// ===============================

const getStats = (items) => {
  return items.reduce((acc, item) => {
    acc.total++;
    if (item.active) acc.active++;
    else acc.inactive++;
    acc.totalHarvest += Number(item.harvestKg);
    return acc;
  }, { total: 0, active: 0, inactive: 0, totalHarvest: 0 });
};

// ===============================
// Renderizado
// ===============================

const renderItem = (item) => `
  <div class="card ${item.priority} ${item.active ? "" : "inactive"}">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <p><strong>Finca:</strong> ${item.farm}</p>
    <p><strong>Región:</strong> ${item.region}</p>
    <p><strong>Producción:</strong> ${item.harvestKg} kg</p>
    <p><strong>Calidad:</strong> ${item.qualityScore}</p>

    <button onclick="toggleItemActive(${item.id})">Estado</button>
    <button onclick="editItem(${item.id})">Editar</button>
    <button onclick="deleteItem(${item.id})">Eliminar</button>
  </div>
`;

const renderStats = (stats) => {
  statsContainer.innerHTML = `
    <p>Total: ${stats.total}</p>
    <p>Activos: ${stats.active}</p>
    <p>Inactivos: ${stats.inactive}</p>
    <p>Producción Total: ${stats.totalHarvest} kg</p>
  `;
};

const render = () => {
  const filtered = applyFilters();
  list.innerHTML = filtered.map(renderItem).join("");
  renderStats(getStats(filtered));
};

// ===============================
// Edición
// ===============================

const editItem = (id) => {
  const item = lots.find(i => i.id === id);
  if (!item) return;

  name.value = item.name;
  description.value = item.description;
  farm.value = item.farm;
  region.value = item.region;
  harvestKg.value = item.harvestKg;
  qualityScore.value = item.qualityScore;
  category.value = item.category;
  priority.value = item.priority;

  editingId = id;
};

// ===============================
// Eventos
// ===============================

lotForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newData = {
    name: name.value,
    description: description.value,
    farm: farm.value,
    region: region.value,
    harvestKg: harvestKg.value,
    qualityScore: qualityScore.value,
    category: category.value,
    priority: priority.value,
    active: true
  };

  if (editingId) {
    updateItem(editingId, newData);
    editingId = null;
  } else {
    createItem(newData);
  }

  lotForm.reset();
});

statusFilter.addEventListener("change", render);
categoryFilter.addEventListener("change", render);
priorityFilter.addEventListener("change", render);
searchInput.addEventListener("input", render);

// ===============================
// Inicialización
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  lots = loadItems();
  render();
});
