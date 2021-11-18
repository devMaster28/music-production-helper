import React from "react";
import  {Dropdown}  from './Dropdown';

export class TabBar extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        selectedmelody:0
    }
    
  }
  handleRhythm = (index)=>{
    this.setState(
        {selectedmelody:index }
    )
    this.props.callback(index)
  }

    
    render(){
        var buttons = []
        for (var i = 0; i < 4; i++) {
            buttons.push(<button className='indent' key={i}>_</button>);
        }
        const titleRhythm = ["acompañamiento 1", "acompañamiento 2"]

        
      return(
        <div className="tabs">
         <Tabs>
           <Tab label="Ritmo">   
             <div>
                <div>
                    {buttons } 
                </div>
                <div>
                    {buttons } 
                </div>
                <div>
                    {buttons } 
                </div>
                <div>
                    {buttons } 
                </div>
               <p>Tab 1 content</p>
             </div>
           </Tab>
           <Tab label="Estructura">
             <div>
               
             <Dropdown  
                title="Melodia"
                indexSelected= {this.state.selectedmelody}
                list={titleRhythm}
                callback = {this.handleRhythm}
                
            />

             </div>
           </Tab>
         </Tabs>
        </div>
        
      )
    }
  }
  
  class Tabs extends React.Component{
    state ={
      activeTab: this.props.children[0].props.label
    }
    changeTab = (tab) => {
  
      this.setState({ activeTab: tab });
    };
    render(){
      
      let content;
      let buttons = [];
      return (
        <div>
          {React.Children.map(this.props.children, child =>{
            buttons.push(child.props.label)
            if (child.props.label === this.state.activeTab) content = child.props.children
          })}
           
          <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab}/>
          <div className="tab-content">{content}</div>
          
        </div>
      );
    }
  }
  
  const TabButtons = ({buttons, changeTab, activeTab}) =>{
     
    return(
      <div className="tab-buttons">
      {buttons.map(button =>{
         return <button className={button === activeTab? 'active': ''} onClick={()=>changeTab(button)}>{button}</button>
      })}
      </div>
    )
  }
  
  const Tab = props =>{
    return(
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }
   