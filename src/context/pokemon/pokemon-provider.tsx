
import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type PokemonGameState, PokemonGameContext } from './pokemon-game.context';
import { type PokemonListState, PokemonListContext } from './pokemon-list.context';

export const PokemonProvider = component$(() => {

      //crea el store de pokemon-game
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 5,
    showBackImage: false,
    isPokemonVisible: true,

  });
  
  //crea el store de pokemon-list
  const pokemonList = useStore<PokemonListState>({
      currentPage: 1,
      isLoading: false,
      pokemons: [],
    });
    
    //carga el contexto  de pokemon-game
    useContextProvider(PokemonGameContext, pokemonGame);
  //carga el contexto de pokemon-list
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    //TODO: implementar leer de localstorage
    if (localStorage.getItem('pokemon-game')) {
      //const savedPokemonGame = JSON.parse(localStorage.getItem('pokemon-game')!); //carga normal
      const {
        isPokemonVisible = true,
        pokemonId = 1,
        showBackImage = false,
      } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState; //carga con type
        pokemonGame.isPokemonVisible = isPokemonVisible;
        pokemonGame.pokemonId = pokemonId;
        pokemonGame.showBackImage = showBackImage;
        
      
    }


  });

  useVisibleTask$(({track}) => { //el trac hace seguimiento de los cambios a las variables u objetos que se le pasan
    track(() => [pokemonGame.isPokemonVisible, pokemonGame.pokemonId, pokemonGame.showBackImage]);

    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  });
  
  
    return <Slot />;
});