import React from "react";

/**
 * DropDown of the general settigs of the project
 */
export class TitledDropDown extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isListOpen: false,
            headerTitle: this.props.title,
            indexSelected: null
          }
        
        
    }
    onTrigger = (index) => {
        this.props.callback(index);
        this.selectItem(index)
    }

    toggleList = () => {
        this.setState(prevState => ({
          isListOpen: !prevState.isListOpen
       }))
     }
    
     selectItem = ( index) => {
        this.setState({
          headerTitle: this.props.list[index],
          isListOpen: false,
          indexSelected: index
        });
      }
      
    render(){

        const { isListOpen, headerTitle } = this.state;
        const { list } = this.props;

        const isSelected = this.state.indexSelected != null
        return  <div style={{ flexDirection:"row",}}>
        
        <button
          type="button"
          style={{backgroundColor:"white" , borderWidth:0 ,fontSize:16 , outline:"none"}}
          onClick={this.toggleList}
        >
          <div style={{color:isSelected? "#5bc0de":"gray"}} >{headerTitle}</div>
          
        </button>
        {isListOpen && (
          <div 
            role="list"
            className="dd-list"
            style={{ display: "flex" ,flexDirection:"column" }}
          >
            {list.map((item,index) => (
              <button
                type="button"
                className="dd-list-item"
                style={{backgroundColor:"white" , color:"black", borderWidth:0, marginLeft:10, marginRight:10, outline:"none", fontSize:14}}
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