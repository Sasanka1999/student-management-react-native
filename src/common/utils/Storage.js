import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (data) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(data)); 
    } catch (error) {
        console.error('Error saving data', error);
    }
};

export const getData = async () => {
    try {
        const data = await AsyncStorage.getItem('userData');
        return data ? JSON.parse(data) : null;  
    } catch (error) {
        console.error('Error retrieving data', error);
    }
};

export const removeData = async () => {
    try {
        await AsyncStorage.removeItem('userData');  
    } catch (error) {
        console.error('Error removing data', error);
    }
};
