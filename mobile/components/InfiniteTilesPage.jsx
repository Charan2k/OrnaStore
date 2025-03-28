// app/InfiniteTilesPage.jsx
import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";

export default function InfiniteTilesPage({ items: demoItems }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    // TODO: {items} to be fetched from API based on context

    const fetchItems = () => {
        if (loading || !hasMore) return;

        setLoading(true);
        setTimeout(() => {
            const newItems = demoItems.slice((page - 1) * 9, page * 9);
            if (newItems.length > 0) {
                setItems((prevItems) => [...prevItems, ...newItems]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false); // No more items to fetch
            }
            setLoading(false);
        }, 1000); // Simulate delay
    };

    useEffect(() => {
        fetchItems(); // Fetch demo items on load
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.tile}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text>{item.description}</Text>
        </View>
    );

    const handleEndReached = () => {
        if (!loading && hasMore) {
            fetchItems(); // Fetch more items when end is reached
        }
    };

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3} // Show 3 items per row
            columnWrapperStyle={styles.row} // Style for the columns
            onEndReached={handleEndReached} // Trigger fetching more items
            onEndReachedThreshold={0.5} // Trigger when 50% of the list is visible
            ListFooterComponent={loading ? <Text>Loading...</Text> : null} // Show loading indicator
            showsVerticalScrollIndicator={true} // Enable vertical scrollbar visibility
        />
    );
}

const styles = StyleSheet.create({
    row: {
        justifyContent: "space-between",
    },
    tile: {
        width: "30%",
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 100,
        resizeMode: "contain", // Ensures the image is resized properly
        borderRadius: 8,
    },
    itemTitle: {
        fontWeight: "bold",
        marginTop: 5,
    },
});
