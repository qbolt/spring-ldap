import { REQUEST_QUERY, RECEIVE_QUERY_RESULTS } from '../actions'

const query = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case REQUEST_QUERY:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_QUERY_RESULTS:
      return {
        ...state,
        isFetching: false,
        items: action.results,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export default query
