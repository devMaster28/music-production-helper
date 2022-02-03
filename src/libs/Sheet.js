import { Midi } from '@tonejs/midi'
import Vex from "vexflow";


export default class Sheet{
    
    static convertMidi(path) {

        const fs = window.require('fs');
        const midiData = fs.readFileSync(path)
        const midi = new Midi(midiData)
    
        const bpm = Math.round(midi.header.tempos[0].bpm)

        const notes = midi.tracks[0].notes
    
        const STANDAR_DURATION = [4, 2, 1, 1 / 2, 1 / 4]
    
        var result = []
        notes.map((note, index) => {
            var durationNote = note.duration * bpm / 60
            var closest = STANDAR_DURATION.reduce(function (prev, curr) {
                return (Math.abs(curr - durationNote) < Math.abs(prev - durationNote) ? curr : prev);
            });
            let octave =  note.octave < 3 ? 4: note.octave
            var myNote = {
                name: note.pitch.toLowerCase() + "/" + octave,
                duration: (1 / closest) * 4, //en el compas
                relativeDuration: closest, //referencia a la negra
                bar: note.bars
            }
            result.push(myNote)
        })
        console.log("convertMidi:" ,result)
        return result
    }

    static createNote(note){
        const VF = Vex.Flow;
        if (note.name.includes("#")) {
            return new VF.StaveNote({ clef: "treble", keys: [note.name], duration: "" + note.duration + "" }).addAccidental(0, new VF.Accidental("#")
            )
        }
        return new VF.StaveNote({ clef: "treble", keys: [note.name], duration: "" + note.duration + "" })
    }

    static updateRhytmFromMidi(notesMidi, rhythm){

        var totalTempo= 0 ;
        var rhythmIndex = 0
        var notes = []

        while (totalTempo < 4){
            var relativeTempoCompas =  ( 1/ rhythm[rhythmIndex]) *4
            console.log("relativeTempo" , notesMidi.length)
            console.log("SDads", notesMidi[rhythmIndex % notesMidi.length].name)
            var myNote= {
                name: notesMidi[rhythmIndex % notesMidi.length].name,
                duration: rhythm[rhythmIndex],
                bar: notesMidi[rhythmIndex % notesMidi.length].bar               
            }
            console.log("myNote" , myNote)
            notes.push (myNote)
            
            totalTempo = totalTempo +relativeTempoCompas
            rhythmIndex ++
        }

        return notes
    }
}
