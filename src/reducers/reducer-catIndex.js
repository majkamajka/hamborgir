export default function (state = 0, action) {
  //define default value ^
  switch(action.type) {
    case 'CAT_INDEX':
      return action.payload;
      break;
  }
  return state;
}