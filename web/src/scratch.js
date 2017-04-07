const makePerson = (name = 'noname', age) => ({ name, age })
const sayHello = ({ name }) => console.log(`Hello ${name}`)

const person = makePerson('Quinton', 22);
sayHello(person)
