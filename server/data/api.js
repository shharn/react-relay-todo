let todos = {
  0: {
    id: 0,
    title: 'Test Todo 1',
    isDone: false
  },
  1: {
    id: 1,
    title: 'Test Todo 2',
    isDone : true
  }
};

let user = {
  0: {
    id: 0,
    name: 'John Doe',
    todos: [0, 1]
  }
};

let nextTodoId = 2;
// let nextUserId = 1;

const getTodo = (id) => {
  return todos[id];
}

const createTodo = (title, isDone) => {
  let newTodo = new Todo(nextTodoId++, title, isDone);
  todos[newTodo.id] = newTodo;
  return newTodo;
}

const getUser = () => {
  return user[0];
}

const getAllTodo = () => {
  let items = [];
  for (let id in todos) {
    items.push(todos[id]);
  }
  return items;
}

export {
  getTodo,
  createTodo,
  getUser,
  getAllTodo
}