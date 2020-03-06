import Input from "../elements/Input";
import RootElement from "../elements/RootElement";
import RootComponent from "../../components/RootComponent";
import HeadingElement from "../elements/Heading";
import HeadingComponent from '../../components/widgets/Heading';
import Column from "../elements/Column";
import Section from "../elements/Section";
import SectionComponent from "../../components/SectionComponent";
import ColumnComponent from "../../components/ColumnComponent";


export default class ElementsManger {

  constructor(){
    this.elements = {};
    // this.elements[Input.getName()] = Input;
    //список элементов
    this.elements[RootElement.getName()] = RootElement;
    this.elements[HeadingElement.getName()] = HeadingElement;
    this.elements[Column.getName()] = Column;
    this.elements[Section.getName()] = Section;
    //список компонентов
    this.components = {};
    this.components[RootElement.getName()] = RootComponent;
    this.components[HeadingElement.getName()] = HeadingComponent;
    this.components[Section.getName()] = SectionComponent;
    this.components[Column.getName()] = ColumnComponent;
  }

  getElements(){
    return this.elements;
  }

  getElementClass(name){
    if(! this.elements[name] ){
      throw 'Не найден элемент с именем ' + name;
    }
    return this.elements[name];
  }

  getComponentClass(name){
    if(! this.components[name] ){
      throw 'Не найден компонент с именем ' + name;
    }
    return this.components[name];
  }

  getWidgetsList(){
    if(! this.widgetList){
      this.widgetList = [];
      for(let elementName in this.elements){
        if(this.elements.hasOwnProperty(elementName)
            && this.elements[elementName].getType() === 'widget' ){
          this.widgetList.push(this.elements[elementName]);
        }
      }
    }
    return this.widgetList;
  }

}
