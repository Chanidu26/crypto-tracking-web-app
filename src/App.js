
import axios from 'axios';
import { useEffect, useState } from 'react';
import Coin from './Coin';
import Loading from './Loading';
import './App.css';
import Button from 'react-bootstrap/Button';

function App() {
  const [coindata, setCoindata] = useState([]);
  const [search, setSearch] = useState("")
  const [loading ,setloading] = useState(false)

  const fetchData = async () => {
    try{
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
    setloading(false);
  } catch(error){
    console.error(error);
  }
  };

  const truncatetotwodecimals = (value) => {
    return Math.trunc(value * 100) / 100
  }


  useEffect(() => {
    setloading(true);
    fetchData();
  }, []);
 
  const filteredCoins = coindata.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="App">
      <Button variant="primary">Primary</Button>{' '}
      <h1>Largest Crypto MarketPlace</h1>
      <div className='search'>
        <input type="text" placeholder="Search..." className="search-bar" onChange={(e)=>setSearch(e.target.value) } />
        <button className="search-button">Search</button>
      </div>
       {loading? (<Loading />):(<div className='coins'>
      

      {filteredCoins?(filteredCoins.map((coin) => (
          <Coin
            key={coin.id} id={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} price={truncatetotwodecimals(coin.current_price)}/>
        ))):(
          <h1 style={{color:"white"}}>no item found</h1>
        )
        }
      </div>
)}
    </div>
  );
}

export default App;
