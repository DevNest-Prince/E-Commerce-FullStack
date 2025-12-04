export function formatDate(date) {
  // Ensure the input is a Date object
  const d = new Date(date);

  const options = {
    weekday: 'short', // e.g., "Sun"
    month: 'short',   // e.g., "Jan"
    day: '2-digit',   // e.g., "01"
  };

  return d.toLocaleDateString('en-US', options);
}
