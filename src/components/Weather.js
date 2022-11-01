import React, { useRef } from 'react'


function Weather( props  ) {
    const inputRef = useRef(null);
    const daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    const day = new Date();
    let index = day.getDay() ;
   
  return (
    <div className='container'>
    <div className='row weather col-sm-12 col-lg-6  mx-auto'>
        <div className='inputDiv input-group mb-4 '>
           <input
            ref={inputRef}
            onKeyDown={props.handleKeyDown}
            type='search'
            className='searchInput form-control p-2 px-3'/> 
            <button
            onClick={props.handleKeyDown}
            className="btn searchBtn  fs-4" type="button">Search</button>
        </div> 
        {props.response != null ?  
         <section className='d-flex weatherInfo  justify-content-between'>
            <div className='d-flex gap-5'> 
            
                  <img 
                    src={` http://openweathermap.org/img/wn/${props.response.weather[0].icon}@2x.png`}
                    className="img-fluid w-img"
                    />
                 <div >
                    <p className='temp fs-1'>{props.response.main.temp.toFixed()}°C</p>
                    <p>Humidity: {props.response.main.humidity}%</p>
                    <p>Wind: {(props.response.wind.speed * 3.6).toFixed()}  km/h</p>
                </div>
            </div>
            <div>
                <p className='fs-1 text-end'>{props.response.name}</p>
                <p className='text-end'>{daysName[day.getDay()]}</p>
                <p className='text-end'>{props.response.weather[0].description}</p>
            </div>
        </section> 
                    : null}
            <br /> 
        <section>
            <div className='d-flex justify-content-between mt-5'>
            { props.fiveDaysForecast ? 
            props.fiveDaysForecast.map((item , key   ) =>{
                index++;
                if(index === 8){
                    index = 1;
                }
               return  (
                <div key={key}> 
                    <p>{daysName[index - 1]}</p>
                    <img 
                    src={` http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                    />
                    <p >{item.havaDurumu}</p>
                </div>
                     )
            } ) : null}
            </div>
        </section>

            </div>
      </div>
  )
}
export default Weather ;