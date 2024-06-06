import type { Pokemon } from "@/modules/pokemon/interfaces/pokemon.interface"

describe('Pokemon Interface', () => {

    test('should have the correct types', async () => {

        const pokemon: Pokemon = { id: 1, name: 'bulbasaur' }

        expect(pokemon.id).toEqual(expect.any(Number))
        expect(pokemon.name).toEqual(expect.any(String))
    })
})