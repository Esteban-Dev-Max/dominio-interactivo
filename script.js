// ===============================
// Dominio #82 - Sistema de Trazabilidad Agrícola
// Entidad principal: Lote Agrícola
// ===============================

const traceabilityData = {
  name: 'Lote de Café Premium',
  description:
    'Sistema de trazabilidad agrícola para el seguimiento del cultivo desde la siembra hasta la cosecha.',
  code: 'AGRO-082',
  location: {
    farm: 'Finca El Progreso',
    region: 'Antioquia'
  },
  stages: [
    { name: 'Siembra', progress: 100 },
    { name: 'Crecimiento', progress: 75 },
    { name: 'Cosecha', progress: 40 }
  ],
  stats: {
    totalHarvestKg: 1200,
    qualityScore: 4.6,
    inspections: 15
  }
};

// ===============================
// Desestructuración de datos
// ===============================

const {
  name,
  description,
  code,
  location: farmLocation,
  stages,
  stats
} = traceabilityData;

// ===============================
// PASO 4 - Cálculo de estadísticas
// ===============================

// Progreso promedio
const progressValues = stages.map(stage => stage.progress);

const averageProgress =
  progressValues.reduce((acc, value) => acc + value, 0) /
  progressValues.length;

// Etapas completadas
const completedStages = stages.filter(stage => stage.progress === 100);

// ===============================
// PASO 3 - Renderizar información
// ===============================

const infoSection = document.getElementById('info');
const stagesSection = document.getElementById('stages');
const statsSection = document.getElementById('stats');

// Información principal
infoSection.innerHTML = `
  <h2>${name}</h2>
  <p>${description}</p>
  <p><strong>Código:</strong> ${code}</p>
  <p><strong>Finca:</strong> ${farmLocation.farm}</p>
  <p><strong>Región:</strong> ${farmLocation.region}</p>
`;

// Lista de etapas
stagesSection.innerHTML = `
  <h3>Etapas del Cultivo</h3>
  <ul>
    ${stages
      .map(
        stage => `<li>${stage.name} - ${stage.progress}%</li>`
      )
      .join('')}
  </ul>
`;

// Estadísticas
statsSection.innerHTML = `
  <h3>Estadísticas</h3>
  <p><strong>Total Cosechado:</strong> ${stats.totalHarvestKg} kg</p>
  <p><strong>Calidad:</strong> ${stats.qualityScore}</p>
  <p><strong>Inspecciones:</strong> ${stats.inspections}</p>
  <p><strong>Progreso Promedio:</strong> ${averageProgress.toFixed(2)}%</p>
  <p><strong>Etapas Completadas:</strong> ${completedStages.length}</p>
`;

// ===============================
// Interactividad - Mostrar / Ocultar
// ===============================

const toggleBtn = document.getElementById('toggleBtn');
const extraInfo = document.getElementById('extraInfo');

toggleBtn.addEventListener('click', () => {
  extraInfo.classList.toggle('hidden');
});


