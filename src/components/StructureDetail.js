
import React , {Component}from 'react';
import * as Tone from 'tone'

import Vex  from "vexflow";
import Note from "./Note";
import * as config from '../config.json'
import { Dropdown } from './Dropdown';
import { Rhythm } from '../libs/Rhythm';
import {TabBar} from './TabBar';
import { Midi } from '@tonejs/midi'

const onPlay = (harmony, presong)=> {
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
        "A5": "mp3Notes/a5.mp3",
    }).toDestination();

    const song = createStructure(harmony, presong)
    var notas = song.notes
    var duraciones = song.durations

    //    const myMelody = createStructure(harmony,rhythm)
    const myMelody = Rhythm.mergeDurationsAndPitch(duraciones, notas);
    const part = new Tone.Part(function(time, value){
        //the value is an object which contains both the note and the duration
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
const writeMidi = async (harmony,presong) =>{
    const fs = window.require('fs');
    var midi = new Midi()
    // add a track
    const track = midi.addTrack()

    const song = createStructure(harmony, presong)
    var notas = song.notes
    var duraciones = song.durations

    //    const myMelody = createStructure(harmony,rhythm)
    const myMelody = Rhythm.mergeDurationsAndPitch(duraciones, notas);
    console.log(myMelody)
    for (let index = 0; index < myMelody.length; index++) {
        
        track.addNote({
            name : myMelody[index].note,
            time : myMelody[index].time,
            duration: Tone.Time( myMelody[index].duration)
          }) 
        
    }

    fs.writeFileSync("output.mid", new Buffer(midi.toArray()))
}

const  onPlayMidi =  async (path)=>  {
    const fs = window.require('fs');
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
        "A5": "mp3Notes/a5.mp3",
        "A#4": "mp3Notes/a-4.mp3",
        "C#4": "mp3Notes/c-4.mp3",
        "D#4": "mp3Notes/d-4.mp3",
        "F#4": "mp3Notes/f-4.mp3",
        "G#4": "mp3Notes/g-4.mp3",
    }).toDestination();
    const midiData = fs.readFileSync(path)
    const midi = new Midi(midiData)
    //const midi = await Midi.fromUrl(path)
    console.log(midi)
    //    const myMelody = createStructure(harmony,rhythm)
    const part = new Tone.Part(function(time, value){

        //the value is an object which contains both the note and the duration
        //sampler.triggerAttackRelease(value.notes, value.duration, time);
        sampler.triggerAttackRelease(value.pitch+"4", value.duration,time);
    },  midi.tracks[1].notes)


    Tone.loaded().then(() => {
        part.start()
       
    })
    Tone.Transport.bpm.value = 90
    Tone.Transport.start();
    
  
    
}

  
function createStructure(harmony,presong){

    var notes = []
    
    var durations = []
    harmony.map((chord, index) => {
        const rhythm = config.genders[0].rhythms[presong.rhythms[index]].detail
        const melody = config.genders[0].notes[presong.melody[index]].detail 
        rhythm.map( (element,i) => {    
            switch (chord){

                case "I":
                    if(melody[i] == 1){
                        notes.push(["C4"])
                    }
                    if(melody[i] == 3){
                        notes.push(["E4"])
                    }
                    if(melody[i] == 5){
                        notes.push(["G4"])

                    }
                    //notes.push(["C4", "E4", "G4"])

                    durations.push(+element+"n")
                   
                    break;                      
                case "IV":
                    if(melody[i] == 1){
                        notes.push(["C4"])
                    }
                    if(melody[i] == 3){
                        notes.push(["F4"])
                    }
                    if(melody[i] == 5){
                        notes.push(["A5"])

                    }
                    durations.push(+element+"n")
                    
                    break
                case "V":
                    if(melody[i] == 1){
                        notes.push(["B3"])
                    }
                    if(melody[i] == 3){
                        notes.push(["E4"])
                    }
                    if(melody[i] == 5){
                        notes.push(["G4"])

                    }
                    durations.push(+element+"n")
                                     
                    break
                case "VI":

                    if(melody[i] == 1){
                        notes.push(["C4"])
                    }
                    if(melody[i] == 3){
                        notes.push(["E4"])
                    }
                    if(melody[i] == 5){
                        notes.push(["A5"])

                    }
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
export default class StructureDetail extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            selectedIndex:0,
            selectedRhythm:0,
            selectedMelody:0,
            tabVisible:false,
            chord:0,
            song:{
                harmony:["I","IV","V","VI"],
                rhythms:[0,0,0,0],
                melody:[0,0,0,0]
            },
            midi:null
        }
        
    }

    
    createNotes(acord, rhythm, melody){
        const VF = Vex.Flow;

        const {Accidental, StaveNote} = Vex.Flow;
        var notes = [
          ];
        rhythm.map( (element, index) => {

            switch (acord){
                case "I":
                    if(melody[index] == 1){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: element }))
                    }
                    if(melody[index] == 3){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: element }))
                    }
                    if(melody[index] == 5){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: element }))
                    }
                    break;
                case "IV":
                    if(melody[index] == 1){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: element }))
                    }
                    if(melody[index] == 3){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: element }))
                    }
                    if(melody[index] == 5){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: element }))
                    }
                    break
                case "V":
                    if(melody[index] == 1){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["b/3"], duration: element }))
                    }
                    if(melody[index] == 3){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: element }))
                    }
                    if(melody[index] == 5){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: element }))
                    }
                    break
                case "VI":
                    if(melody[index] == 1){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: element }))
                    }
                    if(melody[index] == 3){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: element }))
                    }
                    if(melody[index] == 5){
                        notes.push(new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: element }))
                    }
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
        var copySong = this.state.song
        copySong.rhythms[this.state.chord]= index
        this.setState(
            {song:copySong }
        )
    }

    handleMelody = (index)=>{
        var copySong = this.state.song
        copySong.melody[this.state.chord]= index
        this.setState(
            {song:copySong }
        )
    }

    handleTabUser = (index)=>{
        
        if(index == this.state.chord){
            this.setState(
                {tabVisible:!this.state.tabVisible }
            )
        }else{
            this.setState(
                {chord:index,
                tabVisible:true }
            )
        }
        
    }
    render(){
       
        const VF = Vex.Flow;

        const {Accidental, StaveNote} = Vex.Flow;


        const harmony = config.genders[0].harmony[this.state.selectedIndex].parts
        

        var harm = []
        harmony.map( (part, index) => {
            const rhythm = config.genders[0].rhythms[this.state.song.rhythms[index]].detail
            const melody = config.genders[0].notes[this.state.song.melody[index]].detail 
            harm.push(this.createNotes(part ,rhythm, melody ))
        
        })
            
        
        const list = ["I-IV-V-VI" , "I-V-VI-IV", "VI-IV-I-V ", "IV-I-V-VI " ]
        
        const titleRhythm = ["Ritmo 1", "Ritmo 2", "ritmo 3", "ritmo 4"]

        console.log("midi", this.state.midi)
        
        return <div style={{width:'100%' , display:'flex', flexDirection:'column', flexWrap:'wrap'}}>
            
            
            <Dropdown  
                title="Estructura harmonica"
                indexSelected= {this.state.selectedIndex}
                list={list}
                callback = {this.handleCallback}
                
            />
           
            <div style={{ width:'100%' , display: 'flex', justifyContent:'space-between' }}>
            {harm.map( (c, i) =>{
                const selected = this.state.chord == i && this.state.tabVisible
                return <div onClick={()=>this.handleTabUser(i)} >  
                    < Note chord={c} refname={i} selected={selected} /> 
                    
                </div>})}
            </div>
            
            {this.state.tabVisible &&<TabBar callbackAccompaniment = {this.handleMelody} index={0} callbackRhythm={this.handleRhythm} 
                        updateTabUser={this.handleTabUser}
            ></TabBar> }

            
            {<button style={{marginTop:40}} onClick={() =>onPlay(harmony,this.state.song)}> play</button>}

            <p>Play midi</p>
            <input
                id="midi_input"
                className="none"
                type="file"
               
            />

            {<button style={{marginTop:40}} onClick={() =>onPlayMidi(this.state.midi)}> playMidi</button>}

            <p>generar midi</p>
            {<button style={{marginTop:40}} onClick={() =>writeMidi(harmony,this.state.song)}> generar</button>}


        </div>

    }
    componentDidUpdate(prevState){
        console.log("entra")
        const fileInput = document.getElementById('midi_input');
        console.log("file", fileInput)
        fileInput.onchange = (e) => {
            const selectedFile = fileInput.files[0];
            console.log(selectedFile);
            this.setState({midi: selectedFile.path})
        }
    }
   
}