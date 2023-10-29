import React, { useEffect } from 'react';
import { socket } from './socket';
import './App.css';

function App() {

  useEffect(() => {
    socket.on('view:ready', (view) => {
      const viewParent = document.getElementById('view-parent');
      viewParent.innerHTML = view;
    })
  },[])

  return (
    <div className="App">
      <div id="view-parent">

      </div>
    </div>
  );
}

export default App;
