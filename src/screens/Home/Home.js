import { View, Text, StyleSheet } from "react-native";
import instance from "../../service/axiosOrder";
import StudentCard from "../../components/Card/StudentCard";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";


export default function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
            loadData();
    }, [])
    

    const loadData = async () => {
        try {
            const response = await instance.get("/student/getAll");
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>View Student</Text>
            <ScrollView style={styles.scrollView}>
                {
                    data.map((val, index) => (
                        <StudentCard
                            key={index}
                            name={val.student_name}
                            address={val.student_address}
                            age={val.student_age}
                            contact={val.student_contact}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    heading: {
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },

    scrollView: {
        backgroundColor: '#006400',
        marginBottom: 20,
    },

    container: {
        backgroundColor: '#2f4f4f',
    }
});

