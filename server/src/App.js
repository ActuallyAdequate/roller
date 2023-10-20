import {useEffect} from 'react'
import './App.css';

function App() {

  useEffect(() => {
    window.electron.socket.onConnect(([userID]) => {
      console.log(`User ${userID} connected`);
    })
    window.electron.socket.onDisconnect(([userID]) => {
      console.log(`User ${userID} disconnected`);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          Server
        </p>
      </header>
    </div>
  );
}

export default App;
