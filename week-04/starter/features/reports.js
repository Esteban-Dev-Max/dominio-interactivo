export const generateReport = items => {
  const total = items.length;
  const totalQuantity = items.reduce(
    (sum, { quantity }) => sum + Number(quantity),
    0
  );

  const average = total ? totalQuantity / total : 0;

  return { total, totalQuantity, average };
};