import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLSchema,
} from 'graphql';

import {
  globalIdField,
  nodeDefinitions,
  fromGlobalId,
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  mutationWithClientMutationId,
  cursorForObjectInConnection
} from 'graphql-relay';

import { 
  Todo, 
  User 
} from './dataType';

import { 
  getTodo, 
  getUser, 
  getAllTodo,
  updateTodo,
  updateUser,
  createTodo,
  deleteTodo
} from './api';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Todo') {
      return getTodo(id);
    } else if ( type === 'User') {
      return getUser();
    } else {
      throw new Error('Invalid Type');
    }
  },
  (obj) => {
    if (obj instanceof Todo) {
      return todoType;
    } else if (obj instanceof User) {
      return userType;
    } else {
      throw new Error('Invalid Type');
    }
  }
)

const todoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'Todo Item',
  fields: () => ({
    id: globalIdField(),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      name: 'Todo\'s title'
    },
    isDone: {
      type: new GraphQLNonNull(GraphQLBoolean),
      name: 'Is it done?'
    }
  }),
  interfaces: [ nodeInterface ]
});

const { 
  connectionType: todoConnection,
  edgeType: todoEdgeType 
} = connectionDefinitions({ nodeType: todoType });
const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: globalIdField(),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      name: 'User name'
    },
    todos: {
      type: todoConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getAllTodo(), args)
    },
    totalCount: {
      type: GraphQLInt,
      resolve: () => getAllTodo().length
    },
    completedCount: {
      type: GraphQLInt,
      resolve: () => getAllTodo().filter(todo => todo.isDone).length
    }
  }),
  interfaces: [ nodeInterface ]
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ( {
    viewer: {
      type: userType,
      resolve: () => getUser()
    },
    node: nodeField
  })
});

const toggleTodoStatusMutation = mutationWithClientMutationId({
  name: 'ToggleTodoStatusMutation',
  inputFields: {
    isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    todo: {
      type: todoType
    },
    viewer: {
      type: userType
    }
  },
  mutateAndGetPayload: ({isDone, id}) => {
    const realId = fromGlobalId(id).id;
    const updatedTodo = updateTodo(realId, null, isDone);
    const updatedViewer = updateUser(0, null, isDone);
    return {
      todo: updatedTodo,
      viewer: updatedViewer
    };
  }
});

const addTodoMutation = mutationWithClientMutationId({
  name: 'AddTodoMutation',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    todoEdge: {
      type: todoEdgeType,
      resolve: ( { todo } ) => {
        return {
          cursor: cursorForObjectInConnection(getAllTodo(), todo),
          node: todo
        };
      }
    },
    viewer: {
      type: userType,
      resolve: () => getUser()
    }
  },
  mutateAndGetPayload: ( { title } ) => {
    const todo = createTodo(title);
    return {
      todo
    };
  }
});

const deleteTodoMutation = mutationWithClientMutationId({
  name: 'DeleteTodoMutation',
  inputFields: {
    todoId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    todo: {
      type: todoType
    },
    viewer: {
      type: userType,
      resolve: () => getUser()
    }
  },
  mutateAndGetPayload: ( { todoId, userId } ) => {
    let realTodoId = fromGlobalId(todoId).id,
          realUserId = fromGlobalId(userId).id;
    const todo = deleteTodo(realTodoId, realUserId);
    return {
      todo
    };
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    toggleTodoStatus: toggleTodoStatusMutation,
    addTodo: addTodoMutation,
    deleteTodo: deleteTodoMutation
  })
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

export default schema;