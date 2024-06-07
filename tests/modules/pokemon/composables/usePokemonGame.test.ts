import { flushPromises } from "@vue/test-utils";
import { withSetup } from "../../../utils/with-setup";
import MockAdapter from "axios-mock-adapter";
import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame"
import { GameStatus } from "@/modules/pokemon/interfaces";
import { pokemonApi } from "@/modules/pokemon/api/pokemonApi";
import { pokemonListFake } from "../../../data/fake-pokemons";
import confetti from "canvas-confetti";

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake
})

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('usePokemonGame', () => {
  test('should initialize with the correct default values', async () => {
    const [results, app] = withSetup(usePokemonGame);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    await flushPromises();

    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toBe(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('should correctly handle nextround', async () => {

    const [results] = withSetup(usePokemonGame);

    await flushPromises();

    results.gameStatus.value = GameStatus.Win;

    results.getNextRound();

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonOptions.value.length).toBe(4);
  })

  test('should correctly handle nextround with diferent pokemons', async () => {

    const [results] = withSetup(usePokemonGame);

    await flushPromises();
    const firstPokemons = [...results.pokemonOptions.value].map(pokemon => pokemon.name);
    results.getNextRound();
    const secondPokemons = [...results.pokemonOptions.value];

    secondPokemons.forEach(pokemon => {
      expect(firstPokemons).not.toContain(pokemon.name);
    });

  })

  test('should correctly handle when lost', async () => {

    const [results] = withSetup(usePokemonGame);

    await flushPromises();

    const { checkAnswer, gameStatus } = results;

    checkAnswer(100000);
    expect(gameStatus.value).toBe(GameStatus.Lost);

  })

  test('should correctly handle when win', async () => {

    const [results] = withSetup(usePokemonGame);

    await flushPromises();

    const { checkAnswer, gameStatus, randomPokemon } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(randomPokemon.value.id);
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread: 150,
      origin: {
        y: 0.6
      }
    });
    expect(gameStatus.value).toBe(GameStatus.Win);

  })
})