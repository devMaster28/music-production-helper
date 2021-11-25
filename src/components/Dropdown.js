import React from "react";

export class Dropdown extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isListOpen: false,
            headerTitle: this.props.title,
            indexSelected: this.props.indexSelected
          }
        
        
    }
    onTrigger = (index) => {
        this.props.callback(index);
    }

    toggleList = () => {
        this.setState(prevState => ({
          isListOpen: !prevState.isListOpen
       }))
     }
    
     selectItem = (item, index) => {
        this.setState({
          headerTitle: item,
          isListOpen: false,
          indexSelected: index
        });
      }
      
    render(){

        const { isListOpen, headerTitle } = this.state;
        const { list } = this.props;

        return  <div className="dd-wrapper">
        
        <button
          type="button"
          className="dd-header"
          style={{backgroundColor:"white" , borderWidth:1}}
          onClick={this.toggleList}
        >
          <div className="dd-header-title">{headerTitle}</div>
          
        </button>
        {isListOpen && (
          <div
            role="list"
            className="dd-list"
          >
            {list.map((item,index) => (
              <button
                type="button"
                className="dd-list-item"
                style={{backgroundColor:"white" , borderWidth:1, marginLeft:10, marginRight:10}}
                key={index}
                onClick={() =>this.onTrigger(index)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
        
    }
}