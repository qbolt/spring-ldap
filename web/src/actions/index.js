export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_CURRENT_ORG = 'SET_CURRENT_ORG'
export const SET_SEARCH_OPTION = 'SET_SEARCH_OPTION'
export const FETCH_QUERY = 'FETCH_QUERY'
export const REQUEST_QUERY = 'REQUEST_QUERY'
export const RECEIVE_QUERY_RESULTS = 'RECEIVE_QUERY_RESULTS'
export const REQUEST_ORG = 'REQUEST_ORG'
export const RECEIVE_ORG_RESULTS = 'RECEIVE_ORG_RESULTS'

export const setCurrentUser = (user) => {
  return { type: SET_CURRENT_USER, user }
}

export const setCurrentOrg = (orgId, org) => {
  return { type: SET_CURRENT_ORG, orgId, org }
}

export const setSearchOption = (searchOption) => {
  return { type: SET_SEARCH_OPTION, searchOption }
}

export const requestQuery = (query) => {
  return { type: REQUEST_QUERY, query}
}

export const receiveQueryResults = (results) => {
  return { type: RECEIVE_QUERY_RESULTS, results, receivedAt: Date.now() }
}

export const requestOrg = (orgId) => {
  return { type: REQUEST_ORG, orgId }
}

export const receiveOrgResults = (orgId, org) => {
  return { type: RECEIVE_ORG_RESULTS, orgId, org, receivedAt: Date.now() }
}

export const fetchQuery = (query) => {
  return (dispatch) => {
    dispatch(requestQuery(query))
    return fetch(`http://localhost:8080/api/users/query/${query}`)
      .then(response => response.json())
      .then(json => dispatch(receiveQueryResults(json)))
  }
}

export const fetchOrg = (orgId) => {
  return (dispatch) => {
    dispatch(requestOrg(orgId))
    return fetch(`http://localhost:8080/api/org/${orgId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveOrgResults(orgId, json)))
  }
}
