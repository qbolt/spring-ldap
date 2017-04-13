import { SET_CURRENT_ORG } from '../actions'

const org = (state = '', action) => {
  switch (action.type) {
    case SET_CURRENT_ORG:
      return {
          orgId: action.orgId,
          employees: action.org
      }

    default:
      return state
  }
}

export default org
