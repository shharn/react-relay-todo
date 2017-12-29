import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  createFragmentContainer,
  graphql 
} from 'react-relay';

import {
  ListItem,
  ListItemText,
  Checkbox,
  ListDivider,
  ListGroup
} from 'rmwc';

class Todo extends Component {
  render() {
    return (
      <ListGroup>
        <ListDivider/>
        <ListItem>
          <ListItemText>{this.props.todo.title}</ListItemText>
          <div style={{position: 'absolute', right: 0, marginRight: 35}}>
            <Checkbox defaultChecked={this.props.todo.isDone}></Checkbox>
          </div>
        </ListItem>
        {this.props.last ? <ListDivider/> : void 0}
      </ListGroup>
    )
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  last: PropTypes.bool.isRequired
};

export default createFragmentContainer(
  Todo,
  {
    viewer: graphql`
      fragment Todo_viewer on User {
        id
        totalCount
        completedCount
      }
    `,
    todo: graphql`
      fragment Todo_todo on Todo{
        id
        title
        isDone
      }
    `
  }
);