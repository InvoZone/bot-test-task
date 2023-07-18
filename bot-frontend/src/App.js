import {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [oppertunities, setOppertunities] = useState('');
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
          setOppertunities(data?.priceImpact1);
          setLoading(false); // Mark loading as false once data is received
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Error fetching data:', error);
          setLoading(false); // Mark loading as false to handle the error state
        });
    }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      Oppertunities:  
      {
        oppertunities
      }

    </div>
  );
}

export default App;
