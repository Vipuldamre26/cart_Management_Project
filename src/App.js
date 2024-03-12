import Carts from './components/Carts';
import './App.css';
import { useState } from 'react';

function App() {

  const [cartItems, setCartItems] = useState(4) 

  return (
    <div className="App">
      <Carts cartItems={cartItems} setCartItems={setCartItems}/>
    </div>
  );
}

export default App;
