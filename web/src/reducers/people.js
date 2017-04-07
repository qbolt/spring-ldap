const people = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PEOPLE':
      return {
        people: action.people
      }
    default:
      return state;
  }
}

export default people
