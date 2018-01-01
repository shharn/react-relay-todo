import { 
  commitMutation,
  graphql
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation DeleteTodoMutation($input: DeleteTodoMutationInput!) {
    deleteTodo(input: $input) {
      todo {
        id
        title
        isDone
      }
      viewer {
        id
        totalCount
        completedCount
      }
    }
  }
`;

function sharedUpdater(store, user, deletedId) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'TodoList_todos'
  );
  ConnectionHandler.deleteNode(
    conn,
    deletedId
  );
}

function commit(
  environment,
  todoId,
  user
) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          todoId: todoId,
          userId: user.id
        }
      },
      updater: store => {
        const payload = store.getRootField('deleteTodo');
        const todoRecord = payload.getLinkedRecord('todo');
        sharedUpdater(store, user, todoRecord.getValue('id'));
      },
      optimisticUpdater: store => {
        sharedUpdater(store, user, todoId);
      }
    }
  );
}

export default { commit };