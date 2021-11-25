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
    this.props.callbackRhythm(index)
  }

  handleAccompaniment = (index)=>{
    this.setState(
        {selectedmelody:index }
    )
    this.props.callbackAccompaniment(index)
  }
    
    render(){
        var buttons = []
        for (var i = 0; i < 4; i++) {
            buttons.push(<button className='indent' key={i}>_</button>);
        }
        const titleacompanamiento = ["acompañamiento 1", "acompañamiento 2"]

      const titleRhythm = ["Ritmo 1", "Ritmo 2", "ritmo 3", "ritmo 4"] 
      return(
        <div className="tabs">
         <Tabs >
         
           <Tab label="Ritmo" >
             <div style={{display:'flex', marginLeft:20} }>
              
              <div style={{ display:'flex', flexDirection:'column'}}> 
                {titleRhythm.map((item,index) => (
                  <button
                    type="button"
                    className="dd-list-item"
                    style={{backgroundColor:"white" , borderWidth:1, marginTop:10, width:100}}
                    key={index}
                    onClick={() =>this.handleRhythm(index)}
                  >
                    {item}
                  </button>
                ))}   

              </div>
             
           
             

            </div>
           
           </Tab>
           <Tab label="Notas">
             {<div>
               
             <Dropdown  
                title="Melodia"
                indexSelected= {this.state.selectedmelody}
                list={titleacompanamiento}
                callback = {this.handleAccompaniment}
                
            />

             </div>}
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
         return <button className={button === activeTab? 'active': ''} style={{backgroundColor:'white', marginLeft:10, marginRight:10 , borderColor:'#5bc0de '}} onClick={()=>changeTab(button)}>{button}</button>
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
   