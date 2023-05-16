export type PokemonListResponse = {
    count:    number;
    next:     string;
    previous: null;
    results:  BasicPokemonInfo[];
}

export type BasicPokemonInfo = {
    name: string;
    url:  string;
}
