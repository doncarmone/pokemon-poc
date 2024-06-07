<template>
    <section v-if="isLoading || randomPokemon?.id === null"
        class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere</h1>
        <h3 class="animate-pulse">Cargando pokemons</h3>
    </section>
    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="mt-5">Quien es este pokemon?</h1>
        <div class="h-20">
            <button data-test-id="btn-new-game"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition-all hover:bg-blue-600"
                v-if="gameStatus !== GameStatus.Playing" @click="getNextRound(4)">Next</button>
        </div>
        <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />
        <PokemonOptions :options="pokemonOptions" @selected-option="checkAnswer" :random-pokemon="randomPokemon"
            :block-selection="gameStatus !== GameStatus.Playing" />
    </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@pokemon/components/PokemonPicture.vue'
import PokemonOptions from '@pokemon/components/PokemonOptions.vue'
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { gameStatus, randomPokemon, pokemonOptions, isLoading, checkAnswer, getNextRound } = usePokemonGame();

</script>