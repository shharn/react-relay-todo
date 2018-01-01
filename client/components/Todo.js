import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  createFragmentContainer,
  graphql 
} from 'react-relay';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Close from 'material-ui/svg-icons/navigation/Close';
import ToggleTodoStatusMutation from '../mutations/ToggleTodoStatusMutation';

const dividerStyle = {
  marginLeft: 15,
  marginRight: 15
};

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false
    };
    this._toggleStatus = this._toggleStatus.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleClickOnIcon = this._handleClickOnIcon.bind(this)
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
      checked={this.props.todo.isDone}
      onCheck={this._toggleStatus}
      />;
  }

  _handleMouseEnter() {
    this.setState({
      isMouseOver: true
    });
  }

  _handleMouseLeave() {
    this.setState({
      isMouseOver: false
    });
  }

  _handleClickOnIcon() {
    console.log('Clicked on Icon');
  }

  render() {
    return (
      <div onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}>
        <Divider style={dividerStyle}/>
        <ListItem 
          primaryText={this.props.todo.title}
          leftCheckbox={this._createCheckbox()}
          rightIcon= {this.state.isMouseOver ? 
            <Close style={{ marginRight: 20 }} onClick={this._handleClickOnIcon}/> :
            undefined}
          />
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