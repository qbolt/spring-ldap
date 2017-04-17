/*
  Reduce Side Effects
  Minimize Mutability
  More readable code
  Less bugs
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
