import React, { Component } from 'react'
import PropTypes from 'prop-types'
import chalk from 'chalk';
import RaisedButton from 'material-ui/RaisedButton';
import { fullWhite } from 'material-ui/styles/colors';
import Done from 'material-ui/svg-icons/action/Done';
import Close from 'material-ui/svg-icons/navigation/Close';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class AddTodoDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    };
    this._handleChange = this._handleChange.bind(this)
    this._submitInput = this._submitInput.bind(this)
  }
  
  _handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  _submitInput() {
    console.log(chalk.blue(this.state.inputValue));
    this.props.closeDialog();
  }

  render() {
    const actions = [
      <RaisedButton 
        primary={true} 
        key="AddTodoDialog:submitButton" 
        onClick={this._submitInput}
        icon={<Done color={fullWhite} />} 
        style={{margin: 10}}/>,
      <RaisedButton 
        primary={true} 
        key="AddTodoDialog:closeButton" 
        onClick={this.props.closeDialog}
        icon={<Close color={fullWhite} />} 
        style={{margin: 10}} />
    ];
    return (
      <div>
        <Dialog  
          title="Create a Task"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.closeDialog}
          actionsContainerStyle={{textAlign: 'center'}}>
          <TextField 
            value={this.state.inputValue} 
            onChange={this._handleChange}
            floatingLabelText="Your Todo Content"/>
        </Dialog>
      </div>
    )
  }
}

AddTodoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired
};

export default AddTodoDialog;