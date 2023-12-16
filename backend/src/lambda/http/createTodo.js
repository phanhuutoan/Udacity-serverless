
export function handler(event) {
  const newTodo = JSON.parse(event.body)
  
  console.log('CREATE TODO...');

  // TODO: Implement creating a new TODO item
  return JSON.stringify({
    statusCode: 200,
    todos: newTodo
  })
}

