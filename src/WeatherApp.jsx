import Searchbox from "./Searchbox.jsx"
import Infobox from "./Infobox.jsx"
import { useEffect, useState } from "react"



export default function(){
    const [weatherInfo ,setweatherInfo]=useState({})
    const [err,Seterr]=useState(false)
    let url="https://api.openweathermap.org/data/2.5/weather";
    useEffect(()=>{
        Seterr(false);
        const successCallback = async (position) => {
        console.log([position.coords.longitude,position.coords.latitude]);
        let url=`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${import.meta.env.VITE_REACT_API_KEY}&units=metric`;
        let res=await fetch(url);
        let jsonRes=await res.json();
        let result= {
            city:jsonRes.name,
            temp:jsonRes.main.temp,
            temp_min:jsonRes.main.temp_min,
            temp_max:jsonRes.main.temp_max,
            humidity:jsonRes.main.humidity,
            feelslike:jsonRes.main.feels_like,
            weather:jsonRes.weather[0].description
        }
        setweatherInfo(result);

    };

        const errorCallback = (error) => {
            Seterr(true);
            
        };
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        const id = navigator.geolocation.watchPosition(successCallback, errorCallback);
        navigator.geolocation.clearWatch(id);

    },[]);
    // navigator.geolocation.clearWatch(id);
    let updateInfo=(result)=>{
        setweatherInfo(result);
    }
    
    return(
        <>
        {err&&<h3 style={{color:"red",textAlign:"center"}}>Please,Allow live location or Search by city</h3>}
        <Searchbox updateInfo={updateInfo}/>
        <Infobox info={weatherInfo}/>
        </>
    )
}