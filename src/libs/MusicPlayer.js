import * as Tone from 'tone'
import { Rhythm } from '../libs/Rhythm';
import { Midi } from '@tonejs/midi'

/**
 * Funtion 
 * @param {*} notes 
 * @param {*} durations 
 */

export default class MusicPlayer {

    onPlay = (notes, durations) => {
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

    

        //    const myMelody = createStructure(harmony,rhythm)
        const myMelody = Rhythm.mergeDurationsAndPitch(durations, notes);
        const part = new Tone.Part(function (time, value) {
            //the value is an object which contains both the note and the duration
            //sampler.triggerAttackRelease(value.notes, value.duration, time);
            sampler.triggerAttackRelease(value.note, value.duration, time);
        }, myMelody)


        Tone.loaded().then(() => {
            part.start()
        })
        Tone.Transport.bpm.value = 90
        Tone.Transport.start();

    }

    static onPlayMidi(path) {
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
        const part = new Tone.Part(function (time, value) {

            //the value is an object which contains both the note and the duration
            //sampler.triggerAttackRelease(value.notes, value.duration, time);
            sampler.triggerAttackRelease(value.pitch + "4", value.duration, time);
        }, midi.tracks[1].notes)


        Tone.loaded().then(() => {
            part.start()

        })
        Tone.Transport.bpm.value = 90
        Tone.Transport.start();

    }
}