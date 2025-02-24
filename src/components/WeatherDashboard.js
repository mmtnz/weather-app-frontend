import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DailyGraph from "./graphs/DailyGraph";
import HourlyGraph from "./graphs/HourlyGraph";

const WeatherDashboard = ({weatherData}) => {
    const [data2,] = useState([
        { time: '6 AM', tempMax: 12, tempMin: 8 },
        { time: '9 AM', tempMax: 16, tempMin: 10 },
        { time: '12 PM', tempMax: 21, tempMin: 15 },
        { time: '3 PM', tempMax: 24, tempMin: 18 },
        { time: '6 PM', tempMax: 20, tempMin: 15 },
        { time: '9 PM', tempMax: 15, tempMin: 10 },
    ]);
    

    const [dataType, setDataType] = useState('temp');
    const [isDaily, setIsDaily] = useState(true);
    console.log(weatherData);


    return(
        <div>
            <h2 className="mt-1">Weather Data</h2>
            
            <div className="data-type-selector">
                <label>
                    <input
                        type="radio"
                        value="temp"
                        name="temp"
                        checked={"temp" === dataType}
                        onChange={() => setDataType("temp")}
                        defaultChecked
                    />
                    Temperature
                </label>
                <label>
                    <input
                        type="radio"
                        value="rain"
                        name="rain"
                        checked={"rain" === dataType}
                        onChange={() => setDataType("rain")}
                    />
                    Rain
                </label>
                
                <label htmlFor="daily">
                    <input type="checkbox" id="daily" name="daily" value="daily" checked={!isDaily} onChange={() => {setIsDaily(!isDaily)}}/>
                    Show data per hour
                </label>
            </div>
            
            {isDaily ? (
                <DailyGraph weatherData={weatherData} dataType={dataType}/>
            ) : (
                <HourlyGraph weatherData={weatherData} dataType={dataType}/>
            )}
        </div>
    )
};
export default WeatherDashboard;