"use client";

import React, { useState, useEffect } from 'react'
import { Sun, Battery, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { SummaryCard }  from '@/components/SummaryCard'

// Assume this data is fetched from an API
const mockApiResponse = {
  "forecasts": [
    {"pv_power_rooftop": 0.184,"period_end": "2024-08-29T21:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.292,"period_end": "2024-08-29T22:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.389,"period_end": "2024-08-29T22:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.474,"period_end": "2024-08-29T23:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.546,"period_end": "2024-08-29T23:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.605,"period_end": "2024-08-30T00:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.65,"period_end": "2024-08-30T00:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.682,"period_end": "2024-08-30T01:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.701,"period_end": "2024-08-30T01:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.708,"period_end": "2024-08-30T02:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.704,"period_end": "2024-08-30T02:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.688,"period_end": "2024-08-30T03:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.66,"period_end": "2024-08-30T03:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.62,"period_end": "2024-08-30T04:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.569,"period_end": "2024-08-30T04:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.504,"period_end": "2024-08-30T05:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.407,"period_end": "2024-08-30T05:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.311,"period_end": "2024-08-30T06:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.213,"period_end": "2024-08-30T06:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.11,"period_end": "2024-08-30T07:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.018,"period_end": "2024-08-30T07:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T08:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T08:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T09:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T09:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T10:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T10:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T11:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T11:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T12:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T12:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T13:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T13:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T14:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T14:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T15:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T15:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T16:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T16:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T17:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T17:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T18:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T18:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T19:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T19:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T20:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0,"period_end": "2024-08-30T20:30:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.071,"period_end": "2024-08-30T21:00:00.0000000Z","period": "PT30M"},
    {"pv_power_rooftop": 0.194,"period_end": "2024-08-30T21:30:00.0000000Z","period": "PT30M"}
  ]
}

interface Forecast {
  pv_power_rooftop: number;
  period_end: string;
  period: string;
  time: string;
}

export default function Component() {
  const [forecastData, setForecastData] = useState<Forecast[]>([]);
  const [totalPower, setTotalPower] = useState<string>("0.00");
  const [peakPower, setPeakPower] = useState<string>("0.00");
  const [productionHours, setProductionHours] = useState<string>("0.0");

  useEffect(() => {
    const processedData: Forecast[] = mockApiResponse.forecasts.map(forecast => ({
      ...forecast,
      time: new Date(forecast.period_end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pv_power_rooftop: parseFloat(forecast.pv_power_rooftop.toFixed(3))
    }));

    setForecastData(processedData);

    const total = processedData.reduce((sum, forecast) => sum + forecast.pv_power_rooftop, 0);
    const peak = Math.max(...processedData.map(forecast => forecast.pv_power_rooftop));
    const hours = processedData.filter(forecast => forecast.pv_power_rooftop > 0).length / 2;

    setTotalPower(total.toFixed(2));
    setPeakPower(peak.toFixed(2));
    setProductionHours(hours.toFixed(1));
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto border-yellow-400 shadow-lg">
        <CardHeader className="bg-blue-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Sun className="mr-2 text-yellow-300" /> Solar Power Forecast
          </CardTitle>
          <CardDescription className="text-blue-100">
            24-hour forecast for your solar panel installation
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white rounded-b-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <SummaryCard icon={Battery} arrow={ArrowUpRight} title="Total Power" value={`${totalPower} kWh`} />
            <SummaryCard icon={Sun} arrow={ArrowUpRight} title="Peak Power" value={`${peakPower} kW`} />
            <SummaryCard icon={Sun} arrow={ArrowDownRight} title="Production Hours" value={`${productionHours} hours`} />
          </div>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  interval={3} 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft' }} 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="pv_power_rooftop" 
                  stroke="#fbbf24" 
                  strokeWidth={2}
                  dot={false}
                  name="Power Output"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}