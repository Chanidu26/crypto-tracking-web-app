import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [coindata, setCoindata] = useState([]);
  const [search, setSearch] = useState("")

  const fetchData = async () => {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: false
        }
      }
    );
    setCoindata(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);
 
  const filteredCoins = coindata.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
  
  return (
    <div className="App">
      <h1>Largest Crypto MarketPlace</h1>
      <div className='search'>
        <input type="text" placeholder="Search..." className="search-bar" onChange={(e)=>setSearch(e.target.value) } />
        <button className="search-button">Search</button>
      </div>
      <div className='coins'>
      {filteredCoins.map((coin) => (
          <div key={coin.id} className='coin'>
            <h2>{coin.name}</h2>
            <img  style = {{ width: '100px', height: '100px' }} src={coin.image} alt={coin.name} />
            <p>{coin.symbol.toUpperCase()}</p>
            <p>Price: ${coin.current_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
