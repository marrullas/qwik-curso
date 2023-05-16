import { component$, Slot, useStyles$ } from '@builder.io/qwik';

import styles from './styles.css?inline';



export default component$(() => {
  useStyles$(styles); //despues de este hook se aplican los estilos de manera global


  return (
    <Slot/>
  );
});
