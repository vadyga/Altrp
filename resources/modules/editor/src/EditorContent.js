import React, {Component} from "react";
import {hot} from "react-hot-loader/index";
import NewSection from "./js/components/NewSection";
import {getEditor} from "./js/helpers";
import {Provider} from 'react-redux'
import store from '../src/js/store/store'
import RootElement from "./js/classes/elements/RootElement";
import Styles from "./js/components/Styles";

class EditorContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editorWindow = React.createRef();
    store.subscribe(this.currentElementListener.bind(this));
    window.altrpEditorContent = this;
  }

  currentElementListener(data){
    let currentElement = store.getState().currentElement.currentElement;
    if(currentElement instanceof RootElement && currentElement !== this.state.rootElement){
      this.setState({
        rootElement: currentElement,
      })
    }
  }

  // log(e){
  //   e.preventDefault();
  //   console.log(e);
  // }
  //
  // onDragOver (e) {
  //   let event = e ;
  //   event.stopPropagation();
  // }
  //
  // onDragEnter  (e) {
  //   let event = e ;
  //   event.stopPropagation();
  // }


  componentDidMount() {
    let rootElement = getEditor().modules.templateDataStorage.getRootElement();
    this.setState({
      rootElement
    })
  }

  render() {
    return <Provider store={store}>
      <div className="editor-content d-flex flex-column justify-center align-content-center"
                  ref={this.editorWindow}>
        {
          this.state.rootElement ? React.createElement(
              this.state.rootElement.componentClass,{
                children: this.state.rootElement.children,
                element:this.state.rootElement,
              }
          ) : ''
        }
        <NewSection />
      </div>
      <Styles/>
    </Provider>;
  }
}

let _export;
if (process.env.NODE_ENV === 'production') {
  _export = EditorContent
} else {
  _export = hot(module)(EditorContent);
}
export default EditorContent