
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

    Tone.Transport.bpm.value = 200

    Tone.loaded().then(() => {
        const now = Tone.now()
        harmony.map((chord, i) => {
            console.log(chord)
            console.log(harmony)
            switch (chord){
                case "I":
                    sampler.triggerAttack(["C4", "E4", "G4"], now +i/2)
                    break;
                case "IV":
                    sampler.triggerAttack(["C4", "F4", "G4"], now +i/2)

                    break
                case "V":
                    sampler.triggerAttack(["B3","E4","G4" ], now+i)

                    break
                case "VI":
                    sampler.triggerAttack(["C4", "E4","A4"], now+i/2)
                    break
                default:
                    sampler.triggerAttack(["C5"], now +i/2)

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
            selectedIndex:0,
            selectedRhythm:0
        }
        
    }
    createNotes(acord, rhythm){
        const VF = Vex.Flow;

        const {Accidental, StaveNote} = Vex.Flow;
        var notes = [
          ];
          console.log(rhythm)
        rhythm.map( element => {

            switch (acord){
                case "I":
                    notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: element }))
                    break;
                case "IV":
                    notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4", "f/4", "a/4"], duration: element }))
                    break
                case "V":
                    notes.push(new VF.StaveNote({clef: "treble", keys: ["b/3", "e/4", "g/4"], duration: element }))
                    break
                case "VI":
                    notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "a/4"], duration: element }))
                    break
                default:
                    notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: element }))
            }     

        })
        
        return notes
    }

    handleCallback = (index)=>{
        this.setState(
            {selectedIndex:index }
        )
    }

    handleRhythm = (index)=>{
        this.setState(
            {selectedRhythm:index }
        )
    }

    render(){
        const VF = Vex.Flow;

        const {Accidental, StaveNote} = Vex.Flow;


        const harmony = config.genders[0].harmony[this.state.selectedIndex].parts
        const rhythm = config.genders[0].rhythms[this.state.selectedRhythm].detail
        var harm = []
        harmony.map( part => {
            harm.push(this.createNotes(part ,rhythm ))
        
        })
            
    
        const list = ["I-IV-V-VI" , "I-V-VI-IV", "VI-IV-I-V ", "IV-I-V-VI " ]
        
        const titleRhythm = ["Ritmo 1", "Ritmo 2", "ritmo 3"]

        return <div style={{width:'100%' , display:'flex', flexDirection:'column', flexWrap:'wrap'}}>
            
            <div> Estructura harmonica</div>
            
            <Dropdown  
                title="Estructures"
                indexSelected= {this.state.selectedIndex}
                list={list}
                callback = {this.handleCallback}
                
            />
            <Dropdown  
                title="Ritmos"
                indexSelected= {this.state.selectedRhythm}
                list={titleRhythm}
                callback = {this.handleRhythm}
                
            />
            <div style={{ width:'100%' , display: 'flex', justifyContent:'space-between' }}>
            {harm.map( (c, i) =><div style={{width:310, height:100}}>  < Note chord={c} refname={i} /> </div>)
            }
            </div>
            
            
            <button style={{marginTop:40}} onClick={() =>onPlay(harmony)}> play</button>
    
        </div>

    }
   
}