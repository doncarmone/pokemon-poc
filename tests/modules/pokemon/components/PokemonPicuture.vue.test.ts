import { mount } from "@vue/test-utils";
import PokemonPicture from '@pokemon/components/PokemonPicture.vue';

describe('PokemonPicture', () => {
    test('should render hidden image when showPokemon prop is false', async () => {
        const wrapper = mount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: false

            }
        })
        expect(wrapper.find('.brightness-0').exists()).toBe(true)
    })

    test('should render hidden image when showPokemon prop is true', async () => {
        const wrapper = mount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: true

            }
        })
        expect(wrapper.find('.fade-in').exists()).toBe(true)
    })
})
