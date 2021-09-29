import './App.css';
import React, {useState} from 'react';

function App() {
  return (
    <ButtonColorAlternator />
  );
}

const ButtonColorAlternator = () => {
  const color = ['green', 'lightblue', 'red', 'pink', 'grey', 'rebeccapurple', 'yellow'];
  const [currentColor, nextColor] = useState(0);
  return (
    <button style={{backgroundColor: color[currentColor]}} onClick={() => {nextColor((currentColor + 1) % color.length)}}>Change Color</button>
  )

}

export default App;
