export const bindEvents = (manager, renderList) => {
  const form = document.getElementById('entity-form');
  const list = document.getElementById('entity-list');
  const search = document.getElementById('search');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    const entity = Object.fromEntries(formData.entries());
    manager.addEntity(entity);

    renderList(manager.getAll(), list);
    form.reset();
  });

  search.addEventListener('input', ({ target }) => {
    renderList(manager.search(target.value), list);
  });

  list.addEventListener('click', ({ target }) => {
    if (target.dataset.id) {
      manager.deleteEntity(Number(target.dataset.id));
      renderList(manager.getAll(), list);
    }
  });
};