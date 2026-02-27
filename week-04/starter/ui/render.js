export const renderList = (items, container) => {
  container.innerHTML = '';

  items.forEach(({ id, name, quantity, category }) => {
    container.innerHTML += `
      <li>
        ${name} - ${quantity}kg (${category})
        <button data-id="${id}">Delete</button>
      </li>
    `;
  });
};