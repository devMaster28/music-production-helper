import { Dropdown } from "./Dropdown";
import { TitledDropDown } from "./TitledDropDown";

export default function GeneralStructure (){

    function handleGenre(indexGenre){
        console.log("indexGenre",indexGenre)
    }

    return<div>
       <input type="text" style={{border:'none', outline:'none' , fontSize:20 , marginLeft:60, marginTop:20, marginBottom:20 , color:"#5bc0de"}}  placeholder="Titulo de la Canción" />
        <div style={{display: "flex", justifyContent:'space-between'}}>
       
            <TitledDropDown 
                title="Genero"
                list={["Pop", "Roc", "Electronica"]}
                callback={handleGenre}>
                
            </TitledDropDown>
            <TitledDropDown 
                title="Estructura"
                list={["Estructura1", "Estructura2"]}
                callback={handleGenre}>
                
            </TitledDropDown>
            <TitledDropDown 
                title="Tonalidad"
                list={["Do M", "la m","solM"]}
                callback={handleGenre}>
                
            </TitledDropDown>
        </div>
    </div>

   
}