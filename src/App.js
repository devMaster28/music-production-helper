import logo from './logo.svg';
import './App.css';
import GeneralStructure from './components/GeneralStructure';
import SongStructure from './components/SongStructure';
import StructureDetail from './components/StructureDetail';
import Instrument from './components/Instrument';
import Structure from './components/Structure';

function App() {
  return (
    <div className="App" style={{padding:20 , height:'100%'}}>
      <GeneralStructure></GeneralStructure>
      <SongStructure></SongStructure>
      {//<StructureDetail></StructureDetail>
        <Structure></Structure> 
      }
      <div style={{position:'fixed', bottom:10 }}>
        <button > Play</button>
        <button> Exportar</button>
      </div>  
    </div>
  );
}

export default App;
