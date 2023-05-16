import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
//import { PokemonGameContext } from '~/context';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

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

    //const pokemonId = usePokemonID();
    //const pokemonGame = useContext( PokemonGameContext);

    const { 
        pokemonId, 
        toggleFrontBack, 
        toggleVisible, 
        isPokemonVisible,
        showBackImage
         
    } = usePokemonGame();

    return(
    <>
        <div class="mt-2">


        <span class="text-5xl">Pokemon: {pokemonId.value} </span>

        <PokemonImage id={pokemonId.value} 
            isVisible={isPokemonVisible.value}
            backImage={showBackImage.value}
        />

        <button onClick$={ toggleFrontBack }  class="btn btn-primary mr-2">
                    Voltear
                </button>

                <button onClick$={ toggleVisible }  class="btn btn-primary mr-2">
                    Revelar
                </button>
        </div>
    </>
    );
});


