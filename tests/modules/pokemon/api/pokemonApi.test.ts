import { pokemonApi } from "@/modules/pokemon/api/pokemonApi"

describe('Pokemonapi', () => {
    test('should be configured as expected', async () => {
        const baseUrl = 'https://pokeapi.co/api/v2/'

        expect(pokemonApi.defaults.baseURL).toBe(baseUrl)
    })
})