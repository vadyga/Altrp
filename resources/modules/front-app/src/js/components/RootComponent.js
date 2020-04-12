import React, {Component} from "react";
import ElementWrapper from "./ElementWrapper";

class RootComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      children: props.children,
      settings: props.element.getSettings()
    };
    props.element.component = this;
  }

  render(){
    return<div className="sections-wrapper">{
      this.state.settings.number
    }
      {this.state.children.map(
          section => <ElementWrapper key={section.getId()} component={section.componentClass} element={section}/>
      )}
    </div>
  }
}

export default RootComponent;