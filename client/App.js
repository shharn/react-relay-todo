import React from 'react';
import ReactDOM from 'react-dom';
import environment from './config/environment';
import { 
  QueryRenderer,
  graphql
} from 'react-relay';
import TodoApp from './components/TodoApp.js';


const rootNode = document.createElement('div');
if (document.body) {
  document.body.appendChild(rootNode);
}

ReactDOM.render(
  <QueryRenderer
    environment={environment}
    query={graphql`
      query AppQuery {
        viewer {
          ...TodoApp_viewer
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (error) {
        return <div>Error : {error.stack}</div>;
      }
      if (props) {
        return <TodoApp viewer={props.viewer} />;
      }
      return <div>Loading...</div>;
    }}
  />,
  rootNode
);

// if (module.hot) {
//   module.hot.accept('./route', () => {

//   });
// }