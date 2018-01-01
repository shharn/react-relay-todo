import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation ToggleTodoStatusMutation($input: ToggleTodoStatusMutationInput!) {
    toggleTodoStatus(input: $input) {
      todo {
        id
        isDone
      }
      viewer {
        id
        completedCount
      }
    }
  }
`;

function getOptimisticResponse(isDone, todo, user) {
  const viewerPayload = {id: user.id};
  if (user.completedCount != null) {
    viewerPayload.completedCount = isDone ?
      user.completedCount + 1 :
      user.completedCount - 1;
  }
  return {
    toggleTodoStatus: {
      todo: {
        id: todo.id,
        isDone: isDone
      },
      viewer: viewerPayload
    }
  };
}

function commit(
  environment,
  isDone,
  todo,
  user
) {
  return commitMutation(
    environment,
    {
      mutation, 
      variables: {
        input: {isDone, id: todo.id}
      },
      optimisticResponse: getOptimisticResponse(isDone, todo, user)
    }
  );
}

export default { commit };