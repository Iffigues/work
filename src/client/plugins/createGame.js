export const GAME_WIDTH = 10;
export const GAME_HEIGHT = 20;

export const createGame = (isOtherUser) => {
  return {
    game: Array.from(Array(GAME_HEIGHT), () => 
      new Array(GAME_WIDTH).fill([0, 'clear'])
    ),
    isOtherUser: isOtherUser
  }
}
