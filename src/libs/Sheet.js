import { Midi } from '@tonejs/midi'
import Vex from "vexflow";


export default class Sheet{
    
    static convertMidi(path) {

        const fs = window.require('fs');
        const midiData = fs.readFileSync(path)
        const midi = new Midi(midiData)
    
        const bpm = Math.round(midi.header.tempos[0].bpm)
        const notes = midi.tracks[1].notes
    
        const STANDAR_DURATION = [4, 2, 1, 1 / 2, 1 / 4]
    
        var result = []
        notes.map((note, index) => {
            var durationNote = note.duration * bpm / 60
            var closest = STANDAR_DURATION.reduce(function (prev, curr) {
                return (Math.abs(curr - durationNote) < Math.abs(prev - durationNote) ? curr : prev);
            });
            var myNote = {
                name: note.pitch.toLowerCase() + "/" + note.octave,
                duration: (1 / closest) * 4,
                relativeDuration: closest
            }
            result.push(myNote)
        })
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
