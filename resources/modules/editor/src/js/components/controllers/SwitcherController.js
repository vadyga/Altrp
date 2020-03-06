import React, {Component} from "react";
import {connect} from "react-redux";
import {settingToState} from "../../helpers";
import DynamicIcon from '../../../svgs/dynamic.svg'

class SwitcherController extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    // console.log(value);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || false;
    this.state = {value};

  }
  componentDidUpdate(){
    this.props.currentElement.setSettingValue(this.props.controlId, this.state.value);
  }
  componentDidMount(){
    // this.props.currentElement.setSettingValue(this.props.controlId, this.state.value);
  }
  toggle(){
    this.setState({
      value:!this.state.value
    })
  }
  render(){
    let switcherClasses=`control-switcher control-switcher_${ this.state.value ? 'on' : 'off' }`;
    return <div className="controller-container controller-container_switcher">
      <div className="controller-container__label">
        {this.props.label}
      </div>
      <div className={switcherClasses} onClick={this.toggle}>
        <div className="control-switcher__on-text">ON</div>
        <div className="control-switcher__caret"/>
        <div className="control-switcher__off-text">OFF</div>

      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(SwitcherController);