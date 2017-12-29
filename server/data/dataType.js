// @flow
class Todo {
  id: number;
  title: string;
  isDone: boolean;

  consturctor(id: number, title: string, isDone: boolean) {
    this.id = id;
    this.title = title;
    this.isDone = isDone;
  }
}

class User {
  id: number;
  name: string;
  todos: Array<number>;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.todos = [];
  }
}

export { Todo, User }