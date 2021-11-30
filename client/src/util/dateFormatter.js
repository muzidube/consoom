export default function formatDate(d) {
  const date = new Date(d);

  if (Number.isNaN(date.getTime())) {
    return d;
  }

  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  let day = date.getDate();

  if (day < 10) {
    day = `0${day}`;
  }

  return `${day} ${month[date.getMonth()]} ${date.getFullYear()}`;
}
