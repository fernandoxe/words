export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
};
