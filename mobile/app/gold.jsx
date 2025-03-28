// app/gold.jsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import InfiniteTilesPage from "../components/InfiniteTilesPage";
import FilterBar from "../components/FilterBar";
import theme from "../theme/colors";

export default function Gold() {
    const router = useRouter();
    const [filters, setFilters] = useState({
      gender: null,
      category: null
    });

    const goldItems = [
        { 
          id: 1, 
          name: "Gold Ring", 
          description: "A beautiful Gold ring", 
          imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7",
          gender: 'Women',
          category: 'Ring',
          material: 'Gold'
        },
        { id: 2, name: "Gold Necklace", description: "Elegant Gold necklace", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 3, name: "Gold Earrings", description: "Stylish Gold earrings", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 4, name: "Gold Bracelet", description: "Classic Gold bracelet", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 5, name: "Gold Coin", description: "Pure Gold coin", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 6, name: "Gold Bar", description: "Solid Gold bar", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 7, name: "Gold Chain", description: "Trendy Gold chain", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 8, name: "Gold Pendant", description: "Gold pendant with a unique design", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 9, name: "Gold Watch", description: "Luxurious Gold watch", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 10, name: "Gold Ring", description: "A beautiful Gold ring", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 11, name: "Gold Necklace", description: "Elegant Gold necklace", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 12, name: "Gold Earrings", description: "Stylish Gold earrings", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 13, name: "Gold Bracelet", description: "Classic Gold bracelet", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 14, name: "Gold Coin", description: "Pure Gold coin", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 15, name: "Gold Bar", description: "Solid Gold bar", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 16, name: "Gold Chain", description: "Trendy Gold chain", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 17, name: "Gold Pendant", description: "Gold pendant with a unique design", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 18, name: "Gold Watch", description: "Luxurious Gold watch", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 19, name: "Gold Ring", description: "A beautiful Gold ring", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 20, name: "Gold Necklace", description: "Elegant Gold necklace", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 21, name: "Gold Earrings", description: "Stylish Gold earrings", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 22, name: "Gold Bracelet", description: "Classic Gold bracelet", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 23, name: "Gold Coin", description: "Pure Gold coin", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 24, name: "Gold Bar", description: "Solid Gold bar", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 25, name: "Gold Chain", description: "Trendy Gold chain", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 26, name: "Gold Pendant", description: "Gold pendant with a unique design", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 27, name: "Gold Watch", description: "Luxurious Gold watch", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 28, name: "Gold Ring", description: "A beautiful Gold ring", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 29, name: "Gold Necklace", description: "Elegant Gold necklace", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 30, name: "Gold Earrings", description: "Stylish Gold earrings", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 31, name: "Gold Bracelet", description: "Classic Gold bracelet", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 32, name: "Gold Coin", description: "Pure Gold coin", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 33, name: "Gold Bar", description: "Solid Gold bar", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 34, name: "Gold Chain", description: "Trendy Gold chain", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 35, name: "Gold Pendant", description: "Gold pendant with a unique design", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
        { id: 36, name: "Gold Watch", description: "Luxurious Gold watch", imageUrl: "https://images.unsplash.com/photo-1608471535884-4f4effeed5e7" },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Text style={[theme.typography.header, { 
                marginVertical: theme.spacing.screenMargin,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.border,
                paddingBottom: theme.spacing.elementPadding
            }]}>Gold Items</Text>
            <FilterBar filters={filters} setFilters={setFilters} />
            <InfiniteTilesPage items={goldItems.filter(item => {
              const genderMatch = !filters.gender || item.gender === filters.gender;
              const categoryMatch = !filters.category || item.category === filters.category;
              return genderMatch && categoryMatch;
            })} />
            {/* <Button title="Back to Home" onPress={() => router.push("/")} /> */}
        </View>
    );
}
