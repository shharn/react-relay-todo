import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import {
  List
} from 'rmwc';

class TodoList extends Component {
  _renderChildren() {
    const todoLength = this.props.viewer.todos.edges.length;
    return this.props.viewer.todos.edges.map((edge, index) => <Todo key={edge.node.id} todo={edge.node} viewer={this.props.viewer} last={todoLength === index + 1}/>)
  }

  render() {
    return (
      <List>
        {this._renderChildren()}
      </List>
    )
  }
}

TodoList.propTypes = {
  viewer: PropTypes.object.isRequired
};

export default createFragmentContainer(
  TodoList, 
  graphql`
    fragment TodoList_viewer on User {
      todos(first:2147483647) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            isDone
            title
            ...Todo_todo
          }
        }
      }
      id
      totalCount
      completedCount
      ...Todo_viewer
    }
  `
);