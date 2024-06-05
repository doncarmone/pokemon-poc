<template>
    <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere</h1>
        <h3 class="animate-pulse">Cargando pokemons</h3>
    </section>
    <section class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="mt-5">Quien es este pokemon?</h1>
        <PokemonPicture />
        <PokemonOptions />
    </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue'
</script>