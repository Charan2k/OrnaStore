import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {AppBarColor} from '../constants/colors';

const PriceHistoryChart = ({ data, title }) => {
    // Format the data for the chart
    const chartData = data.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        price: parseFloat(item.price)
    }));

    return (
        <Card sx={{ 
            height: '100%',
            minHeight: 300,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    {title}
                </Typography>
                <Box sx={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="date" 
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis 
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) => `₹${value}`}
                            />
                            <Tooltip 
                                formatter={(value) => [`₹${value}`, 'Price']}
                                labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="price" 
                                stroke={AppBarColor}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PriceHistoryChart; 