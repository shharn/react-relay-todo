import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Button,
  TemporaryDrawer,
  TemporaryDrawerContent,
  TemporaryDrawerHeader,
  FormField,
  TextField,
  Typography
 } from 'rmwc';
import chalk from 'chalk';

class AddTodoDrawer extends Component {
  constructor(props) {
    super(props)
    
  }
  
  _submitInput() {
    console.log(chalk.blue(this.input));
  }

  render() {
    return (
      <TemporaryDrawer
          open={this.props.editMode}
          onClose={this.toggleEditMode}
        >
          <TemporaryDrawerHeader style={{backgroundColor:'#f6f6f6'}}>
            <Typography use="title">Create a New Card</Typography>
          </TemporaryDrawerHeader>
          <TemporaryDrawerContent style={{paddingLeft: '16px'}}>
            <FormField>
              <TextField label="Enter the card content" id="title" onChange={(e) => console.log(e)}/>
            </FormField>
          </TemporaryDrawerContent>
          <Button onClick={this._submitInput}>Submit</Button>
        </TemporaryDrawer>
    )
  }
}

AddTodoDrawer.propTypes = {
  editMode: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired
};

export default AddTodoDrawer;