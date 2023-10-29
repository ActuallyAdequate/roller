import {useEffect} from 'react'
import './App.css';
import { DataSetSelect } from './components/DataSetSelect';

function App() {

  useEffect(() => {
    if(window.electron) {
      window.electron.socket.onConnect(([userID]) => {
        console.log(`User ${userID} connected`);
      })
      window.electron.socket.onDisconnect(([userID]) => {
        console.log(`User ${userID} disconnected`);
      })
    }
    
  }, [])

  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          Server
        </p>
        <DataSetSelect/>
      </header>
    </div>
  );
}

export default App;
