export class Todo {};
export class User {};

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
};

const createTodo = (title) => {
  let newTodo = new Todo();
  newTodo.id = nextTodoId++;
  newTodo.title = title;
  newTodo.isDone = false;
  todos[newTodo.id] = newTodo;
  addTodoToUser(0, newTodo.id);
  return newTodo;
};

const addTodoToUser = (userId, todoId) => {
  const targetUser = user[userId];
  targetUser.todos.push(todoId);
  targetUser.totalCount = targetUser.totalCount + 1;
};

const getUser = () => {
  return user[0];
};

const getAllTodo = () => {
  let items = [];
  for (let id in todos) {
    items.push(todos[id]);
  }
  return items;
};

const updateTodo = (id, title, isDone) => {
  let target = todos[id];
  target.title = title || target.title;
  target.isDone = isDone != null ? isDone : target.isDone;
  return target;
};

const deleteTodo = (todoId, userId) => {
  let newTodos = {},
    oldTodo = todos[todoId];
  for (let key in todos) {
    if (key !== todoId) {
      newTodos[key] = todos[key];
    }
  }
  todos = newTodos;
  deleteTodoFromUser(userId, todoId);
  return oldTodo;
};

const deleteTodoFromUser = (userId, oldTodo) => {
  let targetUser = user[userId];
  targetUser.todos = user[userId].todos.filter(id => id !== oldTodo.id);
  targetUser.totalCount -= 1;
  if (targetUser.completedCount < 1) {
    throw new Error('Cannot delete todo Id from the user who has no completed tasks');
  }
  targetUser.completedCount = oldTodo.isDone ? targetUser.completedCount - 1 : targetUser.completedCount;
};

const updateUser = (id, totalCount, isDone) => {
  let target = user[id];
  target.totalCount = totalCount | target.totalCount;
  target.completedCount = isDone ? target.completedCount + 1: target.completedCount - 1;
  return target;
};

export {
  getTodo,
  createTodo,
  getUser,
  getAllTodo,
  updateTodo,
  updateUser,
  deleteTodo
};