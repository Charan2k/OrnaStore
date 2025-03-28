// app/silver.jsx
import React from "react";
import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";
import InfiniteTilesPage from "../components/InfiniteTilesPage"

export default function Silver() {
    const router = useRouter();
    const silverItems = [
        { id: 1, name: "Silver Ring", description: "A beautiful silver ring", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 2, name: "Silver Necklace", description: "Elegant silver necklace", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 3, name: "Silver Earrings", description: "Stylish silver earrings", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 4, name: "Silver Bracelet", description: "Classic silver bracelet", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 5, name: "Silver Coin", description: "Pure silver coin", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 6, name: "Silver Bar", description: "Solid silver bar", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 7, name: "Silver Chain", description: "Trendy silver chain", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 8, name: "Silver Pendant", description: "Silver pendant with a unique design", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 9, name: "Silver Watch", description: "Luxurious silver watch", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 10, name: "Silver Ring", description: "A beautiful silver ring", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 11, name: "Silver Necklace", description: "Elegant silver necklace", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 12, name: "Silver Earrings", description: "Stylish silver earrings", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 13, name: "Silver Bracelet", description: "Classic silver bracelet", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 14, name: "Silver Coin", description: "Pure silver coin", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 15, name: "Silver Bar", description: "Solid silver bar", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 16, name: "Silver Chain", description: "Trendy silver chain", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 17, name: "Silver Pendant", description: "Silver pendant with a unique design", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 18, name: "Silver Watch", description: "Luxurious silver watch", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 19, name: "Silver Ring", description: "A beautiful silver ring", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 20, name: "Silver Necklace", description: "Elegant silver necklace", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 21, name: "Silver Earrings", description: "Stylish silver earrings", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 22, name: "Silver Bracelet", description: "Classic silver bracelet", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 23, name: "Silver Coin", description: "Pure silver coin", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 24, name: "Silver Bar", description: "Solid silver bar", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 25, name: "Silver Chain", description: "Trendy silver chain", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 26, name: "Silver Pendant", description: "Silver pendant with a unique design", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 27, name: "Silver Watch", description: "Luxurious silver watch", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 28, name: "Silver Ring", description: "A beautiful silver ring", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 29, name: "Silver Necklace", description: "Elegant silver necklace", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 30, name: "Silver Earrings", description: "Stylish silver earrings", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 31, name: "Silver Bracelet", description: "Classic silver bracelet", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 32, name: "Silver Coin", description: "Pure silver coin", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 33, name: "Silver Bar", description: "Solid silver bar", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 34, name: "Silver Chain", description: "Trendy silver chain", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 35, name: "Silver Pendant", description: "Silver pendant with a unique design", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 36, name: "Silver Watch", description: "Luxurious silver watch", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
    ];

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 10 }}>Silver Items</Text>
            <InfiniteTilesPage items={silverItems} />
            {/* <Button title="Back to Home" onPress={() => router.push("/")} /> */}
        </View>
    );
}
