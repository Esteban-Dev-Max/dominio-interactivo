// Clase base abstracta
class AgriculturalItem {
  #id;
  #name;
  #active;
  #location;
  #dateCreated;

  constructor(name, location) {
    if (new.target === AgriculturalItem) {
      throw new Error("Abstract class cannot be instantiated");
    }

    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#location = location;
    this.#active = true;
    this.#dateCreated = new Date();
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get isActive() { return this.#active; }
  get location() { return this.#location; }
  get dateCreated() { return this.#dateCreated; }

  set location(value) {
    if (value.length < 3) throw new Error("Invalid location");
    this.#location = value;
  }

  activate() { this.#active = true; }
  deactivate() { this.#active = false; }

  getType() {
    return this.constructor.name;
  }

  getInfo() {
    throw new Error("Must implement getInfo()");
  }
}

// Subclases
class CropBatch extends AgriculturalItem {
  #cropType;

  constructor(name, location, cropType) {
    super(name, location);
    this.#cropType = cropType;
  }

  getInfo() {
    return `Crop Type: ${this.#cropType}`;
  }
}

class FertilizerApplication extends AgriculturalItem {
  #fertilizer;

  constructor(name, location, fertilizer) {
    super(name, location);
    this.#fertilizer = fertilizer;
  }

  getInfo() {
    return `Fertilizer: ${this.#fertilizer}`;
  }
}

class PestControlRecord extends AgriculturalItem {
  #pest;

  constructor(name, location, pest) {
    super(name, location);
    this.#pest = pest;
  }

  getInfo() {
    return `Pest Controlled: ${this.#pest}`;
  }
}

// Clase principal
class TraceabilitySystem {
  #items = [];

  static {
    this.VERSION = "1.0.0";
    this.MAX_ITEMS = 1000;
  }

  addItem(item) {
    if (this.#items.length >= TraceabilitySystem.MAX_ITEMS) {
      throw new Error("Max items reached");
    }
    this.#items.push(item);
  }

  removeItem(id) {
    this.#items = this.#items.filter(item => item.id !== id);
  }

  findItem(id) {
    return this.#items.find(item => item.id === id);
  }

  searchByName(query) {
    return this.#items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  filterByType(type) {
    if (type === "all") return this.#items;
    return this.#items.filter(item => item.getType() === type);
  }

  getAll() {
    return this.#items;
  }

  getStats() {
    return {
      total: this.#items.length,
      active: this.#items.filter(i => i.isActive).length
    };
  }
}

// ====== DOM ======
const system = new TraceabilitySystem();

const form = document.getElementById("itemForm");
const list = document.getElementById("itemList");
const stats = document.getElementById("stats");
const search = document.getElementById("search");
const filterType = document.getElementById("filterType");

function render(items) {
  list.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.className = item.isActive ? "" : "inactive";
    li.innerHTML = `
      <strong>${item.name}</strong> (${item.getType()})<br>
      ${item.getInfo()}<br>
      Location: ${item.location}
      <br>
      <button onclick="toggle('${item.id}')">Toggle</button>
      <button onclick="removeItem('${item.id}')">Delete</button>
    `;
    list.appendChild(li);
  });

  const data = system.getStats();
  stats.textContent = `Total: ${data.total} | Active: ${data.active}`;
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;
  const extra = document.getElementById("extra").value;

  let item;

  if (type === "CropBatch") {
    item = new CropBatch(name, location, extra);
  } else if (type === "FertilizerApplication") {
    item = new FertilizerApplication(name, location, extra);
  } else {
    item = new PestControlRecord(name, location, extra);
  }

  system.addItem(item);
  render(system.getAll());
  form.reset();
});

function removeItem(id) {
  system.removeItem(id);
  render(system.getAll());
}

function toggle(id) {
  const item = system.findItem(id);
  item.isActive ? item.deactivate() : item.activate();
  render(system.getAll());
}

search.addEventListener("input", () => {
  render(system.searchByName(search.value));
});

filterType.addEventListener("change", () => {
  render(system.filterByType(filterType.value));
});