import { mount } from "@vue/test-utils";
import PokemonOptions from '@pokemon/components/PokemonOptions.vue';

describe('PokemonOptions', () => {

    const options = [
        { id: 1, name: 'Bulbasaur 1' },
        { id: 2, name: 'Bulbasaur 2' },
        { id: 3, name: 'Bulbasaur 3' },
        { id: 4, name: 'Bulbasaur 4' },
    ]
    test('should ', async () => {
        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                blockSelection: false,
                randomPokemon: options[0]
            }
        })
        const buttons = wrapper.findAll('button');
        expect(buttons.length).toBe(options.length);

        buttons.forEach((button, i) => {
            expect(button.text()).toBe(options[i].name)
        })
    })

    test('should emit selectedOption event when a button is clicked ', async () => {

        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                blockSelection: false,
                randomPokemon: options[0]
            }
        })
        const [b1, b2, b3, b4] = wrapper.findAll('button');

        await b1.trigger('click');
        expect(wrapper.emitted('selectedOption')?.[0]).toEqual([options[0].id])
    })

    test('should disable buttons when blockSelection prop a is true ', async () => {

        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                blockSelection: true,
                randomPokemon: options[0]
            }
        })
        const buttons = wrapper.findAll('button');

        buttons.forEach(async (button) => {
            const attributes = Object.keys(button.attributes());
            expect(attributes).toContain('disabled');
        })
    })

    test('should apply correct style to buttons with correct answers', async () => {
        const correctAnswer = 0;
        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                blockSelection: true,
                randomPokemon: options[correctAnswer]
            }
        })

        const buttons = wrapper.findAll('button');

        buttons.forEach((button, i) => {
            if (i === correctAnswer) {
                expect(button.classes('correct')).toBe(true)
            } else {
                expect(button.classes('incorrect')).toBe(true)
            }
        })
    })


})