import { View, StyleSheet } from "react-native";
import { Card, Paragraph, Title, Button } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function StudentCard({ name, age, address, contact, onUpdate, onDelete }) {
    const renderRightActions = () => (
        <View style={styles.actionButtons}>
            <Button
                mode="contained"
                onPress={onUpdate}
                style={[styles.actionButton, styles.updateButton]}
            >
                Update
            </Button>
            <Button
                mode="contained"
                onPress={onDelete}
                style={[styles.actionButton, styles.deleteButton]}
            >
                Delete
            </Button>
        </View>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
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

const styles = StyleSheet.create({
    card: {
        width: 345,
        borderRadius: 8,
        backgroundColor: "#f5f5f5",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        margin: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3f51b5",
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        color: "#666",
        marginBottom: 4,
    },
    actionButtons: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 5,
    },
    updateButton: {
        backgroundColor: "#4caf50",
    },
    deleteButton: {
        backgroundColor: "#f44336",
    },
});
