import React, { useRef } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Card, Paragraph, Title } from "react-native-paper";

export default function StudentCard({ id, name, age, address, contact, onDelete, onUpdate }) {

    const swipeableRef = useRef(null);

    const renderLeftActions = ()=> (
        <View>
            <Text></Text>
        </View>
    );

    return (
        <Swipeable
            ref={swipeableRef}
            renderLeftActions={renderLeftActions}
        >
            <Card style={styles.card}>
                <Card.Content>
                    <Title style={styles.title}>Name: {name}</Title>
                    <Paragraph style={styles.text}>Age: {age}</Paragraph>
                    <Paragraph style={styles.text}>Contact: {contact}</Paragraph>
                    <Paragraph style={styles.text}>Address: {address}</Paragraph>
                </Card.Content>
            </Card>
        </Swipeable>

    );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    card: {
        width: width - 20, // Ensuring card width fits inside swipeable area
        borderRadius: 12,
        backgroundColor: "#3cb371",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        margin: 10,
        padding: 10, // Adjust padding to ensure better swipe interaction
        alignSelf: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#6200ea",
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: "#444",
        marginBottom: 6,
    },
    leftAction: {
        backgroundColor: "#ff3b30", // Background color for delete action
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        height: "100%",
    },
    rightAction: {
        backgroundColor: "#007aff", // Background color for update action
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: 20,
        height: "100%",
    },
    actionText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
