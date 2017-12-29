import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { 
  createFragmentContainer, 
  graphql 
} from 'react-relay';
import TodoList from './TodoList'
import AddTodo from './AddTodo';
import '../css/TodoApp.css';
import { Typography } from 'rmwc';

class TodoApp extends Component {
  render() {
    return (
      <div className="rootContainer">
        <Typography use="title" style={{padding: '32px'}}>All Tasks</Typography>
        <TodoList viewer={this.props.viewer}/>
        <AddTodo />
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
