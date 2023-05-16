import { $, component$, useOnDocument, useStore, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { type SmallPokemon } from '~/interfaces';


interface PokemonPageState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {

    const pokemonState = useStore<PokemonPageState>({
      currentPage: 0,
      isLoading: false, //useTask falso porque se ejecuta del lado del servidor la primera vez
      //isLoaded: true, //userVisibleTask verdadero porque se ejecuta del lado del cliente unicamente
      pokemons: [],
    });

    // //useVisibleTask$(async() => { //se ejecuta del lado del cliente unicamente una unica vez cuando se carga la pagina
    // useVisibleTask$(async({ track }) => { //track es una funcion que se ejecuta cada vez que se cambia el valor de la variable
    //   track(() => pokemonState.currentPage); //se carga dentro de la funcion el seguimiento a la variable currentPage para que se ejecute cuando cambie

    //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
    //   pokemonState.pokemons = pokemons;
    // });

        //se ejecuta tanto del lado de cliente como del lado del servidor
        useTask$(async({ track }) => { //track es una funcion que se ejecuta cada vez que se cambia el valor de la variable
          track(() => pokemonState.currentPage); //se carga dentro de la funcion el seguimiento a la variable currentPage para que se ejecute cuando cambie
          
          //pokemonState.isLoading = true;

          const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
          //pokemonState.pokemons = pokemons; //carga nuevamente con cada llamado a la api
          pokemonState.pokemons= [...pokemonState.pokemons, ...pokemons]; //carga los datos de la api en la variable pokemons

          pokemonState.isLoading = false;
        });

        useOnDocument('scroll', $(() => {
            const maxScroll = document.body.scrollHeight 
            const currentScroll = window.scrollY + window.innerHeight;

            if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
              pokemonState.isLoading = true;
              pokemonState.currentPage++;
            }
        }));

    return (
    <>
        <div class="flex flex-col">
          <span class="text-5xl">Status - Lista desde el cliente</span>
          <span>Pagina actual (offset): {pokemonState.currentPage}</span>
          <span>Esta cargando la página: </span>

        </div>

        <div class="mt-10">
          {/* <button onClick$={() => pokemonState.currentPage--}
            class="btn btn-primary mr-2">
            Anteriores
          </button> */}
          <button  onClick$={() => pokemonState.currentPage++}
            class="btn btn-primary mr-2">
            Siguientes
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {
            pokemonState.pokemons.map(({name, id}) => (

              <div key = {name} class="m-5 flex flex-col justify-center items-center">
                <PokemonImage id={id} />
                <span class='capitalize'>{name}</span>
              </div>
            ))
            }
        </div>
    </>
    );
});



export const head: DocumentHead = {
    title: 'PokeQwik - Cliente',
    meta: [
      {
        name: 'Pagia para carga Cliente',
        content: 'Seccion de carga Cliente',
      },
    ],
  };

