// app/index.jsx
import React from "react";
import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Welcome to the Home Page!</Text>
            <Button title="Go to Gold Page" onPress={() => router.push("/gold")} />
            <Button title="Go to Silver Page" onPress={() => router.push("/silver")} />
        </View>
    );
}
