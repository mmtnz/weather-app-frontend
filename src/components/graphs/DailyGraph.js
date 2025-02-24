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


const DailyGraph = ({weatherData, dataType}) => {
    const [data, setData] = useState(null);
    const [maxTemp, setMaxTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    
    
    useEffect(() => {
        setData(transformDataDaily(weatherData.daily));
        const maxTempValue = Math.max(...weatherData.hourly.temperature_2m);
        const minTempValue = Math.min(...weatherData.hourly.temperature_2m);
        setMaxTemp(Math.ceil(maxTempValue + 5));
        setMinTemp(Math.min(minTempValue - 5, 0));
    }, [weatherData]);


    const transformDataDaily = (data) => {
        return data.time.map((time, index) => (
            {
                time: `${time.split('-')[2]}/${time.split('-')[1]}`,
                tempMax: data.temperature_2m_max[index],
                tempMin: data.temperature_2m_min[index],
                rain: data.precipitation_probability_mean[index]
            }
        ));
    }

    if (!data){
        return(
            <></>
        )
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            {dataType === "temp" && (
            <LineChart data={data}>
                <XAxis dataKey="time" />
                <YAxis unit="°C" />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" name="tem max" dataKey="tempMax" stroke="#f00" strokeWidth={2} />
                <Line type="monotone" name="min" dataKey="tempMin" stroke="#00f" strokeWidth={2} />
            </LineChart>
            )}
            {dataType === "rain" && (
            <BarChart width={150} height={40} data={data}>
                <YAxis unit="%" domain={[0, 100]}/>
                <XAxis dataKey="time" />
                <Bar dataKey="rain" fill="#8884d8" />
            </BarChart>
            )}
        </ResponsiveContainer>
    )
}
export default DailyGraph;