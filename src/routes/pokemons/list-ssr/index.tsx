import { component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { type SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({query,redirect, pathname}) => {
  
  ///validar que el offset sea un numero y que este entre 0 y 1000
  const offset = Number(query.get('offset'));
  if (isNaN(offset)) {
      redirect(302, pathname)
  }

  if (offset < 0 || offset > 1000) {
      redirect(302, pathname)
  }

  return await getSmallPokemons(offset);

  //se hace la peticion a la api
  // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
  // const data = await resp.json() as PokemonListResponse;

  // return data.results;

});




export default component$(() => {

    const pokemons = usePokemonList();
    const location = useLocation();

    const currentOffset = useComputed$( () => {
      //const offset = location.url.searchParams.get('offset');
      const offset = new URLSearchParams(location.url.search).get('offset');
      return offset ? parseInt(offset) : 0;

      //return 100;
    })

    return (
    <>
        <div class="flex flex-col">
          <span class="text-5xl">Status</span>
          <span>Pagina actual (offset): {currentOffset}</span>
          <span>Esta cargando la página: {location.isNavigating ? 'Si' : 'No'}</span>

        </div>

        <div class="mt-10">
          <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
            class="btn btn-primary mr-2">
            Anteriores
          </Link>
          <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
            class="btn btn-primary mr-2">
            Siguientes
          </Link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {
            pokemons.value.map(({name, id}) => (

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
    title: 'PokeQwik - SSR',
    meta: [
      {
        name: 'Pagia para carga SSR',
        content: 'Seccion de carga SSR',
      },
    ],
  };