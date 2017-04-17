/*

  Whenever we want to update the state, we dispatch an action.
  Our UI knows exactly WHEN to update because the components are subscribed to the state and
    update anytime the state relative to that component updates.

  Core concepts of Redux and explicit mutations
  -------------
  1. Single source of truth.
  2. State is read-only (dispatch actions (objects describing what happened))
  3. Changes are made with pure functions - Reducers.
     This allows for reducer composition - composable, readable, maintable.


  No listeners, no magic variables, no dirty-checking, no inconsistencies between the UI and the data.
*/
