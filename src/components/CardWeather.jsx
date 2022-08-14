import axios from 'axios';

import React, {useEffect,useState} from 'react'

const CardWeather = ({lat, lon} )=> {

const [weather, setWeather]=useState()
const [temperture, setTemperature]=useState()
     const[isCelsius,setIsCelsius]=useState(true);

useEffect(()=> {
 
    if (lat) { 
    const APIKey= '679df0754d4f5e994a71b6203cf2f0e1'
    const URL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
    axios.get(URL)
    .then(res=>{
    
        setWeather(res.data)

    const temp={
        celsius: `${Math.round(res.data.main.temp-273.15)}°F`,
        Farenheit: `${Math.round((res.data.main.temp-273.15)*9/5 +32 )}°F`

    }
     
     setTemperature(temp) 
     setIsLoading(false);

    })
    .catch (err=>console.log(err))

    }}, [lat, lon])

    const handleClick=()=>setIsCelsius(!isCelsius)


return (

   <article>
      <h1>Wheater App</h1>
      <h2>{`${weather?.name},${weather?.sys.country}`}</h2>

        <div>
       <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
       
         <div>
         <h3> "{weather?.weather[0].description}"</h3>
           

            <ul>
              <li><span>Wind Speed: </span>{weather?.wind.speed} m/s</li>  
              <li><span>Clouds</span>{weather?.clouds.all}%</li>  
              <li><span>Pressure: </span>{weather?.main.pressure} hPa</li>  
            </ul>
         </div>

        </div>
        <h2>{isCelsius? temperture?.celsius: temperture?.Farenheit}</h2>
    <button className='push' onClick={handleClick}>{isCelsius?'Change to °F': 'Change to °C'}
    </button>
     </article>
   

)

}
export default CardWeather