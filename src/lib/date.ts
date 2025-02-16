export function getDate() {
  const month = new Date().toLocaleDateString('ru-RU', { month: 'long' });
  const year = new Date().getFullYear();

  const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  const date = `${formattedMonth}, ${year}`;

  return date;
}
