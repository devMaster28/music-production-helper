import React, { Component } from 'react';
import Note from './Note';
import Vex from "vexflow";
import Sheet from '../libs/Sheet';
import MusicPlayer from '../libs/MusicPlayer';
import { TabBar } from './TabBar';
import * as Config from '../config.json'

export default class Instrument extends Component {

    constructor(props){
        super(props)
        this.state = {
            playing: false,
            isMidi:false,
            notes:null
        }
    }

    handleRhythm = (index) => {
        var copySong = this.state.notes.filter( note => note.bar == 0)
        
        console.log("C",copySong)
        var selectedRhythm = Config.genders[0].rhythms[index].detail
        var notes = Sheet.updateRhytmFromMidi(copySong, selectedRhythm)
        this.setState(
            { notes: notes }
        )
    }

    handleTabUser = (index) => {

        if (index == this.state.chord) {
            this.setState(
                { tabVisible: !this.state.tabVisible }
            )
        } else {
            this.setState(
                {
                    chord: index,
                    tabVisible: true
                }
            )
        }

    }

    handlePlayerClick = () => {
        if (!this.state.playing) {
          this.setState({playing: true})
          if(this.state.isMidi){
              MusicPlayer.onPlayMidi(this.state.midi)
          }
        } else {
          this.setState({playing: false})
        }
      }
    
    
    generateNotes(){
        var notes = [[]]
        var prenotes = this.state.notes
        for (let index = 0; index < prenotes.length; index++) {
            
            if(prenotes[index].bar < 2){
                const note = Sheet.createNote(prenotes[index])
                if(typeof notes[prenotes[index].bar] == 'undefined'){
                    notes.push([])
                }
                
                notes[prenotes[index].bar].push(note)

                
            }
        }
        return notes
    }
      
    
    render(){
        
        const VF = Vex.Flow;
        const notes = this.state.notes? this.generateNotes():  [new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })]
        return<div style={{with: '100%' , borderColor:"#5bc0de", borderWidth:2, borderRadius:10, display:"flex", borderStyle:'solid'}}>
            <input type="text" style={{border:'none', outline:'none' , fontSize:16 , color:"#5bc0de" }}  placeholder="nombre del instrumento" />
            <div style={{display:'flex', flexDirection:"column" , flexGrow:2}}> 
                <div style={{ display:'flex', marginTop:10, justifyContent:'space-between', marginRight:20}}>
                    <div>
                        Estructuras                       
                    </div>                 
                    <div style={{display:'flex' ,flexDirection:'column', }}>
                        <label >Leer Midi
                            <input
                                id="midi_input"
                                className="none"
                                type="file"
                                style={{opacity:0}}/>
                        </label>
                        <div>
                            <label>
                            Tonalidad:Acorde
                            </label>
                            <input
                                id="midi_Chord"
                                className="none"
                                type="text"
                                />
                        </div>
                        
                    </div>
                    
                    <div style={{}}>
                        {this.state.playing? <Pause  onPlayerClick={this.handlePlayerClick} /> : <Play style={{with:'20px', height:'20px'}} onPlayerClick={this.handlePlayerClick} />}                     
                    </div>
                </div> 
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                    {notes.map((c, i) => {
                            console.log(notes)
                            return <div onClick={() => this.handleTabUser(i)} >
                                  <Note chord={this.state.notes? notes[i]: notes} refname={i}  />
                        </div>
                    })}
                  
                </div>
                       
                {this.state.tabVisible && <TabBar callbackAccompaniment={this.handleMelody} index={0} callbackRhythm={this.handleRhythm}
                        updateTabUser={this.handleTabUser}
                    ></TabBar>}
            </div> 
        </div>
    }
    componentDidMount(){
        this.forceUpdate()
    }

    componentDidUpdate(prevState){
        const fileInput = document.getElementById('midi_input');
        fileInput.onchange = (e) => {
            const selectedFile = fileInput.files[0];
            console.log(selectedFile);
            let convertedMidi = Sheet.convertMidi(selectedFile.path)
            this.setState({ midi: selectedFile.path , isMidi:true, notes:convertedMidi})
        }
    }
}


const Play = ({onPlayerClick}) => {
    return (
        <svg className="button" viewBox="0 0 60 60" onClick={onPlayerClick} style={{with:'25', height:'25'}}>
          <polygon points="0,0 50,30 0,60" />
        </svg>
    )
}

const Pause = ({onPlayerClick}) => {
    return (
      <svg className="button" viewBox="0 0 60 60" onClick={onPlayerClick} style={{with:'25', height:'25'}}>
        <polygon points="0,0 15,0 15,60 0,60" />
        <polygon points="25,0 40,0 40,60 25,60" />
      </svg>
    )
  }