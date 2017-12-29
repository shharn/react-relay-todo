import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import AddTodoDialog from './AddTodoDialog';

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
        <Button raised theme={['secondary-bg']} style={{fontSize:'1.8rem', textAlign: 'center', margin: '0 auto', display: 'block'}} onClick={this._toggleEditMode}>+</Button>
        <AddTodoDrawer editMode={this.state.editMode} toggleEditMode={this._toggleEditMode} />
      </div>
    )
  }
}
