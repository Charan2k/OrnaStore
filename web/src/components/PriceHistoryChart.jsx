import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PriceHistoryChart = ({ data, title }) => {
    // Format the data for the chart
    const chartData = useMemo(() => {
        return data.map(item => ({
            date: new Date(item.date).toLocaleDateString(),
            price: parseFloat(item.price)
        }));
    }, [data]);

    // Calculate min and max values for the Y-axis
    const { minPrice, maxPrice } = useMemo(() => {
        if (!chartData.length) return { minPrice: 0, maxPrice: 0 };
        
        const prices = chartData.map(item => item.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        
        // Add some padding to the min and max values
        const padding = (max - min) * 0.1;
        return {
            minPrice: Math.max(0, min - padding),
            maxPrice: max + padding
        };
    }, [chartData]);

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
                                domain={[minPrice, maxPrice]}
                            />
                            <Tooltip 
                                formatter={(value) => [`₹${value}`, 'Price']}
                                labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="price" 
                                stroke="#F26E01" 
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