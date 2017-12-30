import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import '../css/TodoList.css';

class TodoList extends Component {
  _renderChildren() {
    const todoLength = this.props.viewer.todos.edges.length;
    return this.props.viewer.todos.edges.map((edge, index) => <Todo key={edge.node.id} todo={edge.node} viewer={this.props.viewer} last={todoLength === index + 1}/>)
  }

  render() {
    return (
      <div style={{height: ' 86%'}}>
        <List style={{height: '100%'}}>
          <Subheader>Tasks</Subheader>
          <Divider style={{marginLeft: 15, marginRight: 15}}/>
          <div className="listItems">
            {this._renderChildren()}
          </div>
        </List>
      </div>
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