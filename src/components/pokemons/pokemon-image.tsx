import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
    id   : number | string;
    size?: number;
    backImage?: boolean;
    isVisible?: boolean;
}


export const PokemonImage = component$(({ 
    id = 1, 
    size = 200, 
    backImage = false,
    isVisible = true,
}: Props ) => {

    const imageLoaded = useSignal(false);
    
    useTask$(({ track })=> { //track es una función que se ejecuta cuando se actualiza el componente
        track( () => id );

        imageLoaded.value = false;
    });

    const imageUrl = useComputed$(() => {

        return (backImage)
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;

    });

    // let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;

    // if ( backImage ) {
    //     imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`;
    // }



    return (
        <div class="flex items-center justify-center"
            style={{ width: `${ size }px`, height: `${ size }px` }}>
            { !imageLoaded.value && <span>Cargando... </span> }
            
            <img 
                src={ imageUrl.value } 
                alt="Pokemon Sprite" 
                style={{ width: `${ size }px` }}
                onLoad$={ () => {
                    // setTimeout(() => {
                        imageLoaded.value = true;
                    // }, 2000);
                }}
                class={[{
                    'hidden': !imageLoaded.value,
                    'brightness-0': !isVisible
                }, 'transition-all']} 
            />
        </div>
    )
});