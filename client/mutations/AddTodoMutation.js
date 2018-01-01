import {
  commitMutation,
  graphql
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

let tempID = 0;

const mutation = graphql`
  mutation AddTodoMutation($input: AddTodoMutationInput!) {
    addTodo(input: $input) {
      todoEdge {
        cursor
        node {
          id
          title
          isDone
        }
      }
      viewer {
        id
        totalCount
      }
    }
  }
`;

function sharedUpdater(store, user, newEdge) {
  const userProxy = store.get(user.id);
  console.log(userProxy);
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'TodoList_todos'
  );
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
}

function commit(
  environment,
  title,
  user
) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          title
        }
      },
      onError: (error) => {
        console.log('error occured - ', error);
      },
      updater: (store) => {
        const payload = store.getRootField('addTodo');
        const newEdge = payload.getLinkedRecord('todoEdge');
        sharedUpdater(store, user, newEdge);
      },
      optimisticUpdater: (store) => {
        const id = 'client:newTodo:' + tempID++;
        const node = store.create(id, 'Todo');
        node.setValue(title, 'title');
        node.setValue(id, 'id');
        const newEdge = store.create(
          'client:newEdge:' + tempID++,
          'TodoEdge'
        );
        newEdge.setLinkedRecord(node, 'node');
        sharedUpdater(store, user, newEdge);
        const userProxy = store.get(user.id);
        userProxy.setValue(
          userProxy.getValue('totalCount') + 1,
          'totalCount'
        );
      }
    }
  )
}

export default { commit };