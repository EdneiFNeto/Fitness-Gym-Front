import { format } from 'date-fns';
import add from 'date-fns/add';

const dateActual = format(
  new Date(), 
  "'Dia' dd 'de' MMMM', às ' HH:mm'h'"
);

const convertDate = (date) => {
  return format(new Date(date), "dd/MM")
}

const addMonth = (date) => {
  const newdate =  add(new Date(date), {months: 1})
  return convertDate(newdate);
}


export { dateActual, convertDate, addMonth }