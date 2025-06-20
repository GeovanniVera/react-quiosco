export const formatQuantity = (quantity) => {
  // Convert strings to numbers, use 0 for invalid inputs
  const value = typeof quantity === 'string' ? parseFloat(quantity) : Number(quantity);
  if (isNaN(value)) {
    return '$0.00';
  }
  return value.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
  });
};