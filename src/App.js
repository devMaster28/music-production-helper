import logo from './logo.svg';
import './App.css';
import GeneralStructure from './components/GeneralStructure';
import SongStructure from './components/SongStructure';
import StructureDetail from './components/StructureDetail';

function App() {
  return (
    <div className="App">
      <GeneralStructure></GeneralStructure>
      <SongStructure></SongStructure>
      <StructureDetail></StructureDetail>
    </div>
  );
}

export default App;
