const formatDate = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = dateString.getFullYear();
  const month = months[dateString.getMonth()];
  const date = dateString.getDate();
  return `${month} ${date}, ${year}`;
};
export default formatDate;
