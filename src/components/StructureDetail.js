

import Vex  from "vexflow";
import Notes from "./Notes";
export default function StructureDetail (){
    const VF = Vex.Flow;


    const {Accidental, StaveNote} = Vex.Flow;
    
    var notes = [
        new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "q" }),
        new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
        new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
        new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
      ];
      
    const chord1 = [new StaveNote({
        keys: ["c/0", "e/4", "g#/8"],
        duration: "w",
    }).addAccidental(0, new Accidental("bb")).addAccidental(2, new Accidental("#"))];

    return <div style={{width:'100%' , display:'flex', flexDirection:'column'}}>
        
        <div> Estructura harmonica</div>

        <Notes chord={notes} />

    </div>
}