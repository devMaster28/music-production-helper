import { Midi } from '@tonejs/midi'
import Vex from "vexflow";


export default class Sheet{
    
    static convertMidi(path) {

        const fs = window.require('fs');
        const midiData = fs.readFileSync(path)
        const midi = new Midi(midiData)
    
        const bpm = Math.round(midi.header.tempos[0].bpm)

        console.log(midi)
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
                duration: (1 / closest) * 4,
                relativeDuration: closest,
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


}
