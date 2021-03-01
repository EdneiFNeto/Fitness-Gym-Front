import { format } from 'date-fns';

const dateActual = format(
  new Date(), 
  "'Dia' dd 'de' MMMM', às ' HH:mm'h'"
);

export { dateActual }