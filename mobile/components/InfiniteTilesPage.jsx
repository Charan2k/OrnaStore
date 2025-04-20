// app/InfiniteTilesPage.jsx
import React, { useState, useEffect } from "react";
import { fetchOrnaments } from "../api/ornamentsApi";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";

export default function InfiniteTilesPage({ items: demoItems }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    // TODO: {items} to be fetched from API based on context

    const fetchItems = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await fetchOrnaments(page, 9);
            if (response.data && response.data.length > 0) {
                setItems(prevItems => [...prevItems, ...response.data]);
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching ornaments:', error);
            // Fallback to demo items if API fails and we have them
            if (demoItems && demoItems.length > 0 && items.length === 0) {
                setItems(demoItems.slice(0, 9));
                setPage(2);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (demoItems && demoItems.length > 0) {
            setItems(demoItems.slice(0, 9));
            setPage(2);
        } else {
            fetchItems(); // Fallback to API if no demo items
        }
    }, [demoItems]);

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
