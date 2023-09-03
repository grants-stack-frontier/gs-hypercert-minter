import { format, fromUnixTime } from 'date-fns';

export const toYear = (date: number) => {

  if(date === 0 || date === undefined) {
    return "Indefinite";
  }

 if (!isNaN(date) && date !== Infinity && date !== -Infinity ) {
  const dateObject = fromUnixTime(date);
  const formattedDate = format(dateObject, 'yyyy-MM-dd');
  return formattedDate;
 }

  console.error("Invalid timestamp:", date);
  return null;
}
