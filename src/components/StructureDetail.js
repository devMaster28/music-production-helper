
import React from 'react';
import * as Tone from 'tone'

import Vex  from "vexflow";
import Note from "./Note";
import * as config from '../config.json'
import { Dropdown } from './Dropdown';

const onPlay = (harmony)=> {
    const sampler = new Tone.Sampler({
        "B3": "mp3Notes/b3.mp3",
        "A4": "mp3Notes/a4.mp3",
        "B4": "mp3Notes/b4.mp3",
        "C4": "mp3Notes/c4.mp3",
        "D4": "mp3Notes/d4.mp3",
        "E4": "mp3Notes/e4.mp3",
        "F4": "mp3Notes/f4.mp3",
        "G4": "mp3Notes/g4.mp3",
        "C5": "mp3Notes/c5.mp3",
    }).toDestination();

    
    Tone.loaded().then(() => {
        const now = Tone.now()
        harmony.map((chord, i) => {
            console.log(chord)
            console.log(harmony)
            switch (chord){
                case "I":
                    sampler.triggerAttack(["C4", "E4", "G4"], now +i)
                    break;
                case "IV":
                    sampler.triggerAttack(["C4", "F4", "G4"], now +i)

                    break
                case "V":
                    sampler.triggerAttack(["B3","E4","G4" ], now+i)

                    break
                case "VI":
                    sampler.triggerAttack(["C4", "E4","A4"], now+i)
                    break
                default:
                    sampler.triggerAttack(["C5"], now +i)

            }      
            
        })
            
    })
        
        /*
        sampler.triggerAttack(["C5"], now);
        sampler.triggerAttack(["D4"], now +1);
        sampler.triggerAttack(["C4", "E4", "G4"], now +2);*/
   

    

}


export default class StructureDetail extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            selectedIndex:0
        }
        
    }
    createNotes(acord){
        const VF = Vex.Flow;

        const {Accidental, StaveNote} = Vex.Flow;
        var notes = [
          ];
          console.log(acord)

        switch (acord){
            case "I":
                notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }))
                break;
            case "IV":
                notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4", "f/4", "a/4"], duration: "q" }))
                break
            case "V":
                notes.push(new VF.StaveNote({clef: "treble", keys: ["b/3", "e/4", "g/4"], duration: "q" }))
                break
            case "VI":
                notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "a/4"], duration: "q" }))
                break
            default:
                notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }))
        }      
          
        
        
        return notes
    }

    handleCallback = (index)=>{
        this.setState(
            {selectedIndex:index }
        )
    }
    render(){
        const VF = Vex.Flow;

        const {Accidental, StaveNote} = Vex.Flow;


         const harmony = config.genders[0].harmony[this.state.selectedIndex].parts

         var harm = []
         harmony.map( part => {
            harm.push(this.createNotes(part))
        
         })
            
    
        const list = ["I-IV-V-VI" , "I-V-VI-IV", "VI-IV-I-V ", "IV-I-V-VI " ]
          

        return <div style={{width:'100%' , display:'flex', flexDirection:'column', flexWrap:'wrap'}}>
            
            <div> Estructura harmonica</div>
            
            <Dropdown  
                title="Estructures"
                indexSelected= {this.state.selectedIndex}
                list={list}
                callback = {this.handleCallback}
                
            />
            <div style={{ width:'100%' , display: 'flex', justifyContent:'space-between' }}>
            {harm.map( (c, i) =><div style={{width:310, height:100}}>  < Note chord={c} refname={i} /> </div>)
            }
            </div>
            
            
            <button style={{marginTop:40}} onClick={() =>onPlay(harmony)}> play</button>
    
        </div>

    }
   
}