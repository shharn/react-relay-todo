import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { 
  createFragmentContainer, 
  graphql 
} from 'react-relay';
import TodoList from './TodoList'
// import AddTodo from './AddTodo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

const paperStyle = {
  height: 500,
  width: 400,
  maxWidth: 500,
  minWidth: 230,
  margin: '1rem auto'
};

class TodoApp extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Paper style={paperStyle} zDepth={3} rounded={false}>
            <TodoList viewer={this.props.viewer} />
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}

TodoApp.propTypes = {
  viewer: PropTypes.object.isRequired
};

export default createFragmentContainer(TodoApp, {
  viewer: graphql`
    fragment  TodoApp_viewer on User {
      id
      totalCount
      ...TodoList_viewer
    }
  `
});
