*


















/*
  Goals when writing declaratively
  --------------------------------
  Reduce Side Effects
  Minimize Mutability
  More readable code
  Less bugs
  --------------------------------
*/

// Imperative (How it happens)
const numbers = [4, 2, 3, 6]
let total = 0
for (let i = 0; i < numbers.length; i++) {
  total += numbers[i]
}

// Declarative (What happens)
const numbers = [4, 2, 3, 6]
numbers.reduce((total, current) => total + current) // Let 'reduce' handle how it happens.

/****************************************************/

// Declarative
function double (arr) {
  let results = []
  for (let i = 0; i < arr.length; i++){
    results.push(arr[i] * 2)
  }
  return results
}

// Imperative
const double = arr => arr.map((item) => item * 2)

/****************************************************/

// Declarative
function add (arr) {
  let result = 0
  for (let i = 0; i < arr.length; i++){
    result += arr[i]
  }
  return result
}

// Imperative
const add => arr => arr.reduce((prev, current) => prev + current, 0)











/********************************************************/

import $ from 'jquery'

// Imperative
$('#myButton').on('click', function() {
  $(this).toggleClass('highlight')

  if ($(this).text() === 'Add Highlight') {
    $(this).text('Remove Highlight')
  } else {
    $(this).text('Add Highlight')
  }
})

// Declarative
<MyButton
  onClick={this.handleToggleHighlight}
  highlight={this.state.highlight}/>

// Instead of the state living in the DOM, it lives in the component itself (or the redux store)


















.
