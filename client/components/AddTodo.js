import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddTodoDialog from './AddTodoDialog';
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay';
import '../css/AddTodo.css';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
    this._toggleEditMode = this._toggleEditMode.bind(this)
  }

  _toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  render() {
    return (
      <div className="addTodoContainer">
        <FloatingActionButton mini={true} style={{textAlign: 'center', margin: '0 auto'}} onClick={this._toggleEditMode}>
          <ContentAdd />
        </FloatingActionButton>
        { this.state.editMode ?
            <AddTodoDialog viewer={this.props.viewer} open={this.state.editMode} closeDialog={this._toggleEditMode} /> :
            void 0
        }
      </div>
    )
  }
}

AddTodo.propTypes = {
  viewer: PropTypes.object.isRequired
};

export default createFragmentContainer(
  AddTodo,
  graphql`
    fragment AddTodo_viewer on User {
      id
      completedCount
      ...AddTodoDialog_viewer
    }
  `
);