import {
  REQUEST_QUERY,
  RECEIVE_QUERY_RESULTS,
  REQUEST_ORG,
  RECEIVE_ORG_RESULTS
} from '../actions'

const fetch = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case REQUEST_QUERY:
      return {
        ...state,
        isFetching: true,
        lastRequested: action.requestedAt,
      }
    case RECEIVE_QUERY_RESULTS:
      return {
        ...state,
        isFetching: false,
        items: action.results,
        lastUpdated: action.receivedAt
      }
    case REQUEST_ORG:
      return {
        ...state,
        isFetching: true,
        lastRequested: action.requestedAt
      }
    case RECEIVE_ORG_RESULTS:
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

export default fetch
