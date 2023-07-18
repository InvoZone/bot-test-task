import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState('');
  const [pair1, setPair1] = useState('');
  const [pair2, setPair2] = useState('');
  const [oppr, setOppr] = useState('');
  const [priceUSDC, setPriceUSDC] = useState();
  const [priceUSDT, setPriceUSDT] = useState();
  const [loading, setLoading] = useState(true);

  useEffect
    (() => {
      // Fetch data from the server
      fetch('http://localhost:3001/webhook')
        .then((response) => {
          // Check if the response is successful
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Parse the response body as JSON
          return response.json();
        })
        .then((data) => {
          // Update the state with the fetched data
          setData(data?.maindata);
          setPair1(data?.maindata[0]);
          setPair2(data?.maindata[1]);
          setOppr(data?.maindata[2]);
          setPriceUSDC(data?.maindata[3]);
          setPriceUSDT(data?.maindata[4]);

          setLoading(false); // Mark loading as false once data is received
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Error fetching data:', error);
          setLoading(false); // Mark loading as false to handle the error state
        });
    }, []);

  if (loading) {
    return <div className="App">
      <h1 style={{ textAlign: "center", marginTop: "20%" }}>
        Loading...
      </h1>
    </div>;
  }

  return (
    <div className="App" >
      <h1>Bot Test Task</h1>

      <h2 style={{ textAlign: "center", marginTop: "20%" }}>
        Pool Address: USDC - USDT on Uniswap:
        <p>{pair1}</p>
        Pool Address: USDC - USDT on Pancakeswap:
        <p>{pair2}</p>

        Oppertunity:
        <p>{oppr}</p>

        1 USDC Price on Uniswap:
        <p>{priceUSDC} USDT</p>

        {priceUSDC} USDT Price on Pancakeswap:
        <p>{priceUSDT} USDC</p>
      </h2>
      {/* 
      <button style={{color: "white", backgroundColor: "black", borderRadius: "20px", width: "200px", height: "50px", fontSize: "18px"}} onClick={} >
        Get Oppertunities
      </button> */}

    </div>
  );
}

export default App;
