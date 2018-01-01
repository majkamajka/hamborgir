export const updateScore = (score) => {
  return {
    type: 'UPDATE_SCORE',
    payload: score + 1
  }
};
