import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame"
import { withSetup } from "../../../utils/with-setup";
import { GameStatus } from "@/modules/pokemon/interfaces";
import { flushPromises } from "@vue/test-utils";

describe('usePokemonGame', () => {
  test('should intinizalie with default value', async () => {

    const [results, app] = withSetup(usePokemonGame);

    // const { isLoading, checkAnswer, gameStatus, getNextRound, randomPokemon, pokemonOptions} = usePokemonGame();

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    await new Promise((r) => setTimeout(r, 2000));

    await flushPromises();
    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toBe(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String)
    });
  })
})