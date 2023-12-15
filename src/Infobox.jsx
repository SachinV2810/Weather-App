import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
export default function({info}){
    let rain_img_url="https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=";
    let summer_img_url="https://www.nu-heat.co.uk/wp-content/uploads/2022/05/Summer-heating.jpg";
    let winter_img_url="https://media.istockphoto.com/id/614332492/photo/snow-storm.jpg?s=612x612&w=0&k=20&c=UT779vnlT6q5tRGHR_JbweEC8L0tHbXMeogrAqJeQSo=";
    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:"50px"}}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={info.temp>20?summer_img_url:info.humidity>=90?rain_img_url:winter_img_url}
        style={{width:"contain"}}
      />
      <CardContent style={{textAlign:"center"}}>
        <Typography gutterBottom variant="h5" component="div">
          {info.city}&nbsp;&nbsp;{info.temp>20?<WbSunnyIcon></WbSunnyIcon>:info.humidity>=90?<ThunderstormIcon></ThunderstormIcon>:<AcUnitIcon></AcUnitIcon>}
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"span"}>
          <p>{info.temp}&deg;C</p>
          <p>Humidity={info.humidity}%</p>
          <p>Max.Temperature={info.temp_max}</p>
          <p>Min.Temperature={info.temp_min}</p>
          <p>The weather can be described as <i>{info.weather}</i> and feels Like {info.feelslike}&deg;C</p>
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}