import { APP_CONFIG } from './config.js';
import { Manager } from './services/index.js';
import { renderList } from './ui/render.js';
import { bindEvents } from './ui/events.js';

const manager = new Manager();

document.getElementById('app-title').textContent = APP_CONFIG.APP_NAME;

const list = document.getElementById('entity-list');

renderList(manager.getAll(), list);
bindEvents(manager, renderList);

// Dynamic Import
document.getElementById('reports-btn').addEventListener('click', async () => {
  try {
    const { generateReport } = await import('./features/reports.js');
    const report = generateReport(manager.getAll());

    document.getElementById('report-container').innerHTML = `
      <h3>Report</h3>
      Total Items: ${report.total}<br>
      Total Quantity: ${report.totalQuantity}kg<br>
      Average: ${report.average.toFixed(2)}kg
    `;
  } catch (error) {
    console.error('Error loading report module:', error);
  }
});