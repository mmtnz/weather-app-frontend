import React, { useEffect, useState } from "react";
import {
    LineChart,
    BarChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const HourlyGraph = ({weatherData, dataType}) => {
    const [data, setData] = useState(null);
    const [maxTemp, setMaxTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [index, setIndex] = useState(0);
    
    
    useEffect(() => {
        setData(transformDataHourly(weatherData.hourly));
        // axis limits
        const maxTempValue = Math.max(...weatherData.hourly.temperature_2m);
        const minTempValue = Math.min(...weatherData.hourly.temperature_2m);
        setMaxTemp(Math.ceil(maxTempValue + 5));
        setMinTemp(Math.min(minTempValue - 5, 0));

    }, [weatherData]);


    const transformDataHourly = (data) => {
        return data.time.map((time, index) => (
            {
                // time: `${time.split('-')[2]}/${time.split('-')[1]}`,
                time: `${time.split('T')[1]}`,
                date: `${time.split('T')[0].split('-')[2]}/${time.split('T')[0].split('-')[1]}`,
                temp: data.temperature_2m[index],
                rain: data.precipitation_probability[index]
            }
        ));
    }

    if (!data){
        return(
            <></>
        )
    }

    return (
        <>
        <div className="day-selector">
            <button onClick={() => setIndex(index - 24)} className="edit" disabled={index < 24}>
                <span className="material-symbols-outlined" translate="no" aria-hidden="true">
                    chevron_left
                </span>
            </button>
            <div>{data[index].date}</div>
            <button onClick={() => setIndex(index + 24)} className="edit" disabled={index >= data?.length - 24}>
                <span className="material-symbols-outlined" translate="no" aria-hidden="true">
                    chevron_right
                </span>
            </button>
        </div> 
                
        <ResponsiveContainer width="100%" height={300}>
            {dataType === "temp" && (
            <LineChart data={data?.slice(index, Math.min(index + 24, data.length))}>
                <XAxis dataKey="time" />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <YAxis unit="°C" domain={[minTemp, maxTemp]}/>
                <Line type="monotone" name="temp" dataKey="temp" stroke="#f00" strokeWidth={2} />
            </LineChart>
            )}
            {dataType === "rain" && (
            <BarChart width={150} height={40} data={data?.slice(index, Math.min(index + 24, data.length))}>
                <YAxis unit="%" domain={[0, 100]}/>
                <XAxis dataKey="time" />
                <Bar dataKey="rain" fill="#8884d8" />
            </BarChart>
            )}
        </ResponsiveContainer>
        </>
    )
}
export default HourlyGraph;