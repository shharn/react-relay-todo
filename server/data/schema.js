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
  connectionFromArray
} from 'graphql-relay';

import { 
  Todo, 
  User 
} from './dataType';

import { 
  getTodo, 
  getUser, 
  getAllTodo 
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

const { connectionType: todoConnection } = connectionDefinitions({ nodeType: todoType });
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

const schema = new GraphQLSchema({
  query: queryType
});

export default schema;