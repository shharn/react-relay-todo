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
    todos: [0, 1],
    totalCount: 2,
    completedCount: 1
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

const updateTodo = (id, title, isDone) => {
  let target = todos[id];
  target.title = title || target.title;
  target.isDone = isDone != null ? isDone : target.isDone;
  return target;
}

const updateUser = (id, totalCount, isDone) => {
  let target = user[id];
  target.totalCount = totalCount | target.totalCount;
  target.completedCount = isDone ? target.completedCount + 1: target.completedCount - 1;
  return target;
}

export {
  getTodo,
  createTodo,
  getUser,
  getAllTodo,
  updateTodo,
  updateUser
}