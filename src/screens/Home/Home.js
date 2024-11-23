import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Modal,
    TextInput,
    Button,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import instance from "../../service/axiosOrder";

export default function Home(name) {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        student_name: "",
        student_age: "",
        student_contact: "",
        student_address: "",
    });

    useEffect(() => {
        loadData();
    }, [data]);

    const loadData = async () => {
        try {
            const response = await instance.get("/student/getAll");
            const transformedData = response.data.map((item) => ({
                key: `${item.id}`,
                ...item,
            }));
            setData(transformedData);
        } catch (err) {
        }
    };

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = async (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        try {
            await instance.delete(`/student/delete/${rowKey}`);
            const newData = data.filter((item) => item.key !== rowKey);
            setData(newData);
        } catch (err) {
            console.error(err);
        }
    };

    const updateRow = (rowKey) => {
        const student = data.find((item) => item.key === rowKey);
        if (student) {
            setSelectedStudent(student);
            setUpdatedData({
                student_name: student.student_name,
                student_age: student.student_age.toString(),
                student_contact: student.student_contact,
                student_address: student.student_address,
            });
            setModalVisible(true);
        }
    };

    const saveUpdatedData = async () => {
        try {
            await instance.put(`/student/update/${selectedStudent.key}`, updatedData);
            const updatedList = data.map((item) =>
                item.key === selectedStudent.key ? { ...item, ...updatedData } : item
            );
            setData(updatedList);
            setModalVisible(false);
        } catch (err) {
            console.error(err);
        }
    };

    // Render visible row
    const renderItem = (data) => (
        <TouchableHighlight
            onPress={() => ("Row selected")}
            style={styles.rowFront}
            underlayColor={"#AAA"}
        >
            <View>
                <Text style={styles.mainText}>Name: {data.item.student_name}</Text>
                <Text style={styles.text}>Age: {data.item.student_age}</Text>
                <Text style={styles.text}>Contact: {data.item.student_contact}</Text>
                <Text style={styles.text}>Address: {data.item.student_address}</Text>
            </View>
        </TouchableHighlight>
    );

    // Render hidden buttons for swipe actions
    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backLeftBtn, styles.updateBtn]}
                onPress={() => updateRow(data.item.key)}
            >
                <Text style={styles.backTextWhite}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backLeftBtn, styles.closeBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.closeBtnRight]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.deleteBtn]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>View Students</Text>
            <SwipeListView
                data={data}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={150}
                rightOpenValue={-150}
                previewRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Update Student</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={updatedData.student_name}
                            onChangeText={(text) =>
                                setUpdatedData({ ...updatedData, student_name: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Age"
                            value={updatedData.student_age}
                            onChangeText={(text) =>
                                setUpdatedData({ ...updatedData, student_age: text })
                            }
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contact"
                            value={updatedData.student_contact}
                            onChangeText={(text) =>
                                setUpdatedData({ ...updatedData, student_contact: text })
                            }
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={updatedData.student_address}
                            onChangeText={(text) =>
                                setUpdatedData({ ...updatedData, student_address: text })
                            }
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Save" onPress={saveUpdatedData} />
                            <Button
                                title="Cancel"
                                color="red"
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2f4f4f",
        flex: 1,
    },
    heading: {
        color:'white',
        fontSize: 22,
        fontWeight: "bold",
        margin: 10,
        textAlign: "center",
    },
    rowFront: {
        alignItems: "flex-start",
        backgroundColor: "#98fb98",
        borderBottomColor: "#2f4f4f",
        borderBottomWidth: 1,
        justifyContent: "center",
        height: 100,
        padding: 10,
    },
    mainText:{
        fontSize: 20,
        fontWeight:'bold',
        color: "#191970",
    },
    text: {
        fontSize: 16,
        fontWeight:'bold',
        fontFamily:'Raleway_200ExtraLight',
        color: "#333",
    },
    separator: {
        height: 10, // Space between items
        backgroundColor: "#006400",
    },
    rowBack: {
        alignItems: "center",
        backgroundColor: "#ddd",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    backLeftBtn: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 75,
    },
    backRightBtn: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 75,
    },
    updateBtn: {
        backgroundColor: "#ffcc00",
        left: 0,
    },
    closeBtnLeft: {
        backgroundColor: "#007aff",
        left: 75,
    },
    closeBtnRight: {
        backgroundColor: "#007aff",
        right: 75,
    },
    deleteBtn: {
        backgroundColor: "red",
        right: 0,
    },
    backTextWhite: {
        color: "#FFF",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
