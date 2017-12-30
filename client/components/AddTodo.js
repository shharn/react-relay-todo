import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddTodoDialog from './AddTodoDialog';
import '../css/AddTodo.css';

export default class AddTodo extends Component {
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
        <AddTodoDialog open={this.state.editMode} closeDialog={this._toggleEditMode} />
      </div>
    )
  }
}
