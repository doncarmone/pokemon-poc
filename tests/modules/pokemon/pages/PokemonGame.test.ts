import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { mount } from '@vue/test-utils';
import type { Mock } from 'vitest';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
    usePokemonGame: vi.fn(),
}));
const pokemons = [
    {
        name: 'bulbasaur',
        id: 1,
    },
    {
        name: 'ivysaur',
        id: 2,
    },
    {
        name: 'venusaur',
        id: 3,
    },
    {
        name: 'charmander',
        id: 4,
    },
]

describe('Pokemon game', () => {
    test('should initialize with default values ', async () => {

        (usePokemonGame as Mock).mockReturnValue({
            gameStatus: {
                value: GameStatus.Playing,
            },
            isLoading: {
                value: true,
            },
            pokemonOptions: {
                value: [],
            },
            randomPokemon: {
                value: undefined,
            },
            checkAnswer: vi.fn(),
            getNextRound: vi.fn(),
        });
        const wrapper = mount(PokemonGame);

        expect(wrapper.get('h1').text()).toBe('Espere');
        expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);

        expect(wrapper.get('h3').text()).toBe('Cargando pokemons')
        expect(wrapper.get('h3').classes()).toEqual(['animate-pulse']);

    })

    test('should initialize with default values ', async () => {

        (usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Playing,
            isLoading: false,
            pokemonOptions: pokemons,
            randomPokemon: pokemons.at(0),
            checkAnswer: vi.fn(),
            getNextRound: vi.fn(),
        });
        const wrapper = mount(PokemonGame);

        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`

        expect(wrapper.find('img').attributes('src')).toBe(imgUrl)

        const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100');

        console.log(buttons.length);
        expect(buttons.length).toBe(4);

        const plainPokemons = pokemons.map(pokemon => pokemon.name);

        buttons.forEach((button, index) => {
            expect(plainPokemons).toContain(button.text());
        })
    })

    test('should render button for a new game', async () => {
        (usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Win,
            isLoading: false,
            pokemonOptions: pokemons,
            randomPokemon: pokemons.at(0),
            checkAnswer: vi.fn(),
            getNextRound: vi.fn(),
        });
        const wrapper = mount(PokemonGame);

        const button = wrapper.find('[data-test-id="btn-new-game"]');

        expect(button.text()).toBe('Next');

    })

    test('should render button for a new game', async () => {

        const spyNextRound = vi.fn();

        (usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Win,
            isLoading: false,
            pokemonOptions: pokemons,
            randomPokemon: pokemons.at(0),
            checkAnswer: vi.fn(),
            getNextRound: spyNextRound,
        });
        const wrapper = mount(PokemonGame);

        const button = wrapper.find('[data-test-id="btn-new-game"]');

        button.trigger('click');

        expect(spyNextRound).toHaveBeenCalled();
        expect(spyNextRound).toHaveBeenCalledWith(4);

    })

})