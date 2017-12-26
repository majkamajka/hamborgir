export default function (state = 1, action) {
  //define default value ^
  switch(action.type) {
    case 'CAT_INDEX':
      return action.payload;
      break;
  }
  return state;
}