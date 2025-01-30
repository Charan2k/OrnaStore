// app/gold.jsx
import React from "react";
import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Gold() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Welcome to the Gold Page!</Text>
            <Button title="Back to Home" onPress={() => router.push("/")} />
        </View>
    );
}
