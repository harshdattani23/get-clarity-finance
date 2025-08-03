"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ThreatData = {
    name: string;
    count: number;
};

const TrendingThreatsChart = () => {
    const [data, setData] = useState<ThreatData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/threats');
                if (!response.ok) {
                    throw new Error('Failed to fetch threat data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center p-8">Loading chart data...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    }

    if (data.length === 0) {
        return <div className="text-center p-8">No threat data available yet. Submit some analyses to see the chart.</div>;
    }

    return (
        <div className="w-full h-96 bg-white p-4 rounded-xl shadow-lg border border-gray-200 mt-6">
            <h3 className="font-bold text-lg text-center text-gray-800 mb-4">Most Reported Scam Types</h3>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#ef4444" name="Reports" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendingThreatsChart;
