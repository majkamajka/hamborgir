export const catIndex = (index) => { //entire functtion is action creator
  return { //<- this is action
    type: 'CAT_INDEX',
    payload: index
  }
};