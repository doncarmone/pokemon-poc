import { GameStatus } from "@/modules/pokemon/interfaces/game-status.enum"

describe('Gamestatus enum', () => {
    test('should have a values of playing', async () => {
        expect(GameStatus.Playing).toBe('playing')
        expect(GameStatus.Win).toBe('win')
        expect(GameStatus.Lost).toBe('lost')
    })
})