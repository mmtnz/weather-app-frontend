import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DailyGraph from "./graphs/DailyGraph";
import HourlyGraph from "./graphs/HourlyGraph";

const WeatherDashboard = ({weatherData}) => {  

    const [dataType, setDataType] = useState('temp');
    const [isDaily, setIsDaily] = useState(true);
    console.log(weatherData);


    return(
        <>           
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
        </>
    )
};
export default WeatherDashboard;