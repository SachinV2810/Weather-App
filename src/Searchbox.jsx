import './Searchbox.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function({updateInfo}){
    let url="https://api.openweathermap.org/data/2.5/weather";
    let [city,Setcity]=useState("");
    let [err,seterr]=useState(false);
    let handleChange=(evt)=>{
        Setcity(evt.target.value);
    }
    let handleSubmit=async(evt)=>{
        
        try{
            seterr(false);
            evt.preventDefault();
        let res=await fetch(`${url}?q=${city}&appid=${import.meta.env.VITE_REACT_API_KEY}&units=metric`);
        let jsonRes=await res.json();
        let result={
            city:city,
            temp:jsonRes.main.temp,
            temp_min:jsonRes.main.temp_min,
            temp_max:jsonRes.main.temp_max,
            humidity:jsonRes.main.humidity,
            feelslike:jsonRes.main.feels_like,
            weather:jsonRes.weather[0].description
        }
        updateInfo(result);
        
        Setcity("")}catch(err){
            seterr(true);
            Setcity("")
        };
    }

    let InstaClick=()=>{
        window.open("https://www.instagram.com/sachinv2810/");
    }
    let linkClick=()=>{
        window.open("https://www.linkedin.com/in/sachin-varma-2b053127b/");
    }
    const actions = [
  { icon: <InstagramIcon />, name: 'Instagram',act:InstaClick },
  {icon:<LinkedInIcon/> ,name:'Linkedin',act:linkClick}
];


    return(
        <div className="searchbox">
            <h2 style={{color:"yellowgreen"}}>Search for the Weather</h2>
            <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="City Name" variant="filled" color="secondary" style={{backgroundColor:"rgba(255,255,255,0.2)"}} required value={city} onChange={handleChange} />
            <br></br><br></br>
            <Button variant="contained" type='submit'>Search</Button>
            <br></br><br></br>
            {err&&<Alert severity="info" style={{width:"300px"}}>No such place exist in our api</Alert>}
            </form>
            <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
          onClick={action.act}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
        </div>
        
    )
}