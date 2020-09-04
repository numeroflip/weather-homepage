import React, {useState} from 'react';




function App() {

  const [position, setPosition] = useState({latitude: undefined, longitude: undefined})
  return (
    <div>
      <h1>Hey, what's the weather today?</h1>
    </div>
  );
}

export default App;
