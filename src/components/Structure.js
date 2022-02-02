import Instrument from "./Instrument";
import React, { useState } from 'react';

export default function Structure (){

    const [instrumnents, setCount] = useState(1);
    var obj = []
    for (let index = 0; index < instrumnents; index++) {
        obj.push(index)
        
    }
    console.log(obj)
    return<div style={{display:'flex', flexDirection:'column', width:'100%'}}>
        {obj.map(()=><Instrument></Instrument>)  
        }
    </div>

   
}