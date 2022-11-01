import {useState , useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [city , setCity] = useState("Sumqayit");
  const [lang , setLang] = useState("en");
  const [responseApi , setResponse] = useState(null);
  const [responseApi2 , setResponse2] = useState(null)

  const url = "https://api.openweathermap.org/data/2.5/"
  const apiKey = '66b77267c803d3d9fef7e69856d6f632';
  const query = `${url}/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;
  const query2 =`${url}/forecast?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;

  function handleKeyDown (event) {
    
    if(event.key === 'Enter'){
        if(event.target.value)
          setCity(event.target.value[0].toUpperCase() + event.target.value.slice(1 , event.target.value.length).toLowerCase());
      
    }else if( event.type === 'click'){
      if(event.target.previousElementSibling.value)
      setCity(event.target.previousElementSibling.value[0].toUpperCase()+ event.target.previousElementSibling.value.slice(1 , event.target.previousElementSibling.value.length).toLowerCase());
    }
      
}

  useEffect( () => {
    
    fetch(query)
    .then( response =>  response.json())
    .then(logResponse )
  
    fetch(query2)
    .then(response2 => response2.json())
    .then(logResponse2)

  } , [city,lang,query,query2])

  function logResponse (response) {
    if(response.cod === `404`){
      setCity("Sumqayit")
    }else{
      setResponse(response);
    }
        }

      function logResponse2 (response2){
        if(response2.cod === `404`){
          setCity("Sumqayit")
        }else{
          const forecastArray = [

            {havaDurumu : 
            response2.list[0].main.temp.toFixed()  + `° / ` +
            response2.list[2].main.temp.toFixed() + `°`  ,
            icon : response2.list[4].weather[0].icon },
                          
            {havaDurumu : 
            response2.list[8].main.temp.toFixed()  + `° / ` +
            response2.list[10].main.temp.toFixed() + `°`  ,
            icon : response2.list[12].weather[0].icon },
                          
            {havaDurumu : 
            response2.list[16].main.temp.toFixed()  + `° / ` +
            response2.list[28].main.temp.toFixed() + `°`  ,
            icon : response2.list[20].weather[0].icon },
                          
            {havaDurumu : 
            response2.list[24].main.temp.toFixed()  + `° / ` +
            response2.list[26].main.temp.toFixed() + `°`  ,
            icon : response2.list[28].weather[0].icon },
                          
            {havaDurumu : 
            response2.list[32].main.temp.toFixed()  + `° / ` +
            response2.list[34].main.temp.toFixed() + `°`  ,
            icon : response2.list[36].weather[0].icon },
              
           ]
              setResponse2(forecastArray);
        }
      }

    function handleClick() {
      if(lang === 'az'){
        setLang('en')
      }else{
        setLang('az')
      }
    }

  return (
    <div className="App">
      <header className="App-header">
        <p className='text-center fw-bold fs-1'>Weather  App</p> <br />
        <Weather
        fiveDaysForecast={responseApi2}
         response={responseApi}
         handleKeyDown={handleKeyDown} />
{/*         <button onClick={handleClick}>Change language</button>
 */}      </header>
    </div>
  );
}

export default App;
