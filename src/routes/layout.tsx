import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';


export default component$(() => {
  useStyles$(styles); //despues de este hook se aplican los estilos de manera global
  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
