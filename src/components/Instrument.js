import React, { Component } from 'react';
import Note from './Note';
import Vex from "vexflow";
import Sheet from '../libs/Sheet';
import MusicPlayer from '../libs/MusicPlayer';

export default class Instrument extends Component {

    constructor(props){
        super(props)
        this.state = {
            playing: false,
            isMidi:false,
            notes:null
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
        var notes = []

        var prenotes = this.state.notes
        var midiIndex = 0
        for (let index = 0; index < 1; index++) {
            var notasPentagrama = []
            var tempoCompas = 0
            while (tempoCompas < 4) {
                const note = Sheet.createNote(prenotes[midiIndex])
                notasPentagrama.push(note)
                tempoCompas = tempoCompas + prenotes[midiIndex].relativeDuration
                midiIndex++
            }
            notes.push(notasPentagrama)
        }

        return notes
    }
      
    
    render(){
        
        console.log(this.state)
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
                    </div>
                    
                    <div style={{}}>
                        {this.state.playing? <Pause  onPlayerClick={this.handlePlayerClick} /> : <Play style={{with:'20px', height:'20px'}} onPlayerClick={this.handlePlayerClick} />}                     
                    </div>
                </div> 
            
                <Note chord={this.state.notes? notes[0]: notes} />
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