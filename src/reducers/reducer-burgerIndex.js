export default function (state = 15, action) {
  //define default value ^
  switch(action.type) {
    case 'BURGER_INDEX':
      return action.payload;
      break;
  }
  return state;
}