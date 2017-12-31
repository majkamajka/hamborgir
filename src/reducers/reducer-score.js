export default function (state = 0, action) {
  switch(action.type) {
    case 'UPDATE_SCORE':
      return action.payload;
      break;
  }
  return state;
}