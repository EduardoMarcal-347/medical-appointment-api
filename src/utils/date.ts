export const parseTimeToUTC = (timeString: string): Date => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const currentDate = new Date();
  return new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hours,
      minutes,
      seconds,
    ),
  );
};
