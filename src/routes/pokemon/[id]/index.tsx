import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

//routeloader se ejecuta del lado del servidor
export const usePokemonID = routeLoader$<number>(({params, redirect}) => {

    const id = Number(params.id);
    if (isNaN(id)) {
        redirect(302, '/')
    }

    if (id < 1 || id > 1000) {
        redirect(302, '/')
    }

    return id;
});

export default component$(() => {

    //const location = useLocation(); //este hook devuelve toda la informacion de la url y la petición

    const pokemonId = usePokemonID();

    return(
    <>
        <span class="text-5xl">Pokemon: {pokemonId.value} </span>

        <PokemonImage id={pokemonId.value} 
            isVisible
        />
    </>
    );
});