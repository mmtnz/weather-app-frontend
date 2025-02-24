import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherDashboard = ({weatherData}) => {
    const [data2,] = useState([
        { time: '6 AM', tempMax: 12, tempMin: 8 },
        { time: '9 AM', tempMax: 16, tempMin: 10 },
        { time: '12 PM', tempMax: 21, tempMin: 15 },
        { time: '3 PM', tempMax: 24, tempMin: 18 },
        { time: '6 PM', tempMax: 20, tempMin: 15 },
        { time: '9 PM', tempMax: 15, tempMin: 10 },
    ]);

    const transformData = (data) => {
        return data.time.map((time, index) => (
            {
                time: `${time.split('-')[2]}/${time.split('-')[1]}`,
                tempMax: data.temperature_2m_max[index],
                tempMin: data.temperature_2m_min[index]
            }
        ));
    }
    console.log(weatherData.daily);
    console.log(transformData(weatherData.daily));
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(transformData(weatherData.daily));
    }, [weatherData]);

    return(
        <div>
            <h2>Weather Data</h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis unit="°C" />
                    <Tooltip />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" name="tem max" dataKey="tempMax" stroke="#f00" strokeWidth={2} />
                    <Line type="monotone" name="min" dataKey="tempMin" stroke="#00f" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    )
};
export default WeatherDashboard;