import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  createFragmentContainer,
  graphql 
} from 'react-relay';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import ToggleTodoStatusMutation from '../mutations/ToggleTodoStatusMutation';

const dividerStyle = {
  marginLeft: 15,
  marginRight: 15
};

class Todo extends Component {
  constructor(props) {
    super(props)
    this._toggleStatus = this._toggleStatus.bind(this)
  }
  
  _toggleStatus(event, isInputChecked) {
    ToggleTodoStatusMutation.commit(
      this.props.relay.environment,
      isInputChecked,
      this.props.todo,
      this.props.viewer
    );
  }

  _createCheckbox() {
    return <Checkbox 
      defaultChecked={this.props.todo.isDone}
      onCheck={this._toggleStatus}
      />;
  }

  render() {
    return (
      <div>
        <Divider style={dividerStyle}/>
        <ListItem 
          primaryText={this.props.todo.title}
          leftCheckbox={this._createCheckbox()} />
         {this.props.last ? <Divider style={dividerStyle}/> : void 0}
      </div>
    )
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  last: PropTypes.bool.isRequired,
  relay: PropTypes.object.isRequired,
  viewer: PropTypes.object
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