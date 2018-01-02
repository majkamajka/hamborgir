export default function (state = 1000, action) {
  switch(action.type) {
    case 'INCREASE_SPEED':
      return action.payload;
      break;
  }
  return state;
};
