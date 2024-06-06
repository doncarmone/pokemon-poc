<template>
    <section class="mt-5 flex flex-col">
        <button v-for="{ name, id } in options" :key="id" @click="$emit('selectedOption', id)"
            :disabled="blockSelection" :class="[{
                'correct': blockSelection && id === options.find(p => p.id === randomPokemon.id)?.id,
                'incorrect': blockSelection && id !== options.find(p => p.id === randomPokemon.id)?.id
            }, 'capitalize disabled:shadow-noe disabled:bg-gray-100']">
            {{ name }}
        </button>
    </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
    options: Pokemon[];
    randomPokemon: Pokemon;
    blockSelection: boolean;
}

defineProps<Props>();

defineEmits<{
    selectedOption: [id: number]
}>();
</script>

<style scoped>
button {
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer text-center transition-all hover:bg-gray-100;
}

.correct {
    @apply bg-blue-500 text-white;
}

.incorrect {
    @apply bg-red-300 opacity-70;
}
</style>