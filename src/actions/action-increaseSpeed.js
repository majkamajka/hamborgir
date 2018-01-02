export const increaseSpeed = (speed) => {
  return {
    type: 'INCREASE_SPEED',
    payload: speed - 100
  }
};
