
import React from 'react';
import * as Tone from 'tone'

import Vex  from "vexflow";
import Note from "./Note";
import * as config from '../config.json'
import { Dropdown } from './Dropdown';
import { Rhythm } from '../libs/Rhythm';


const onPlay = (harmony, rhythm)=> {
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

    const song = createStructure(harmony,rhythm)
    var notas = song.notes
    var duraciones = song.durations

    //    const myMelody = createStructure(harmony,rhythm)
    const myMelody = Rhythm.mergeDurationsAndPitch(duraciones, notas);
        console.log("myMelody:", myMelody)
    const part = new Tone.Part(function(time, value){
        //the value is an object which contains both the note and the duration
        console.log("time dentro loaded:",time,"\n valor:", value)
        //sampler.triggerAttackRelease(value.notes, value.duration, time);
        sampler.triggerAttackRelease(value.note, value.duration, time);
    }, myMelody)


    Tone.loaded().then(() => {
        part.start()
        console.log("part lenght",part)
    })
    Tone.Transport.bpm.value = 90
    Tone.Transport.start();
    
}

function createStructure(harmony,rhythm){
    var notes = []
    var durations = []
    harmony.map((chord) => {
        
        rhythm.map( (element,i) => {
            switch (chord){

                case "I":
                    notes.push(["C4", "E4", "G4"])
                    durations.push(+element+"n")
                   
                    
                    break;
                case "IV":
                    notes.push(["C4", "F4", "G4"])
                    durations.push(+element+"n")
                    
                    break
                case "V":
                    notes.push( ["B3","E4","G4" ])
                    durations.push(+element+"n")
                    
                    
                    break
                case "VI":
                    notes.push(["C4", "E4","A4"])
                    durations.push(+element+"n")
                    // song.push({
                    //     "time":"+" +element+"n",
                    //     "notes": ["C4", "E4","A4"],
                    //     "duration":element+"n"
                    // })
                    
                    break
                default:

            }
        })
    })

    return {
        "notes": notes,
        "durations":durations
    }
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
        
        const titleRhythm = ["Ritmo 1", "Ritmo 2", "ritmo 3", "ritmo 4"]

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
            
            
            <button style={{marginTop:40}} onClick={() =>onPlay(harmony,rhythm)}> play</button>
    
        </div>

    }
   
}