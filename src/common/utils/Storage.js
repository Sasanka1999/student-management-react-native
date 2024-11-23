import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (val) => {
    try{
        await AsyncStorage.setItem('my-token', val)
    }catch (e) {

    } 
}

export const getData = async () => {
    var val;
    try{
        val = await AsyncStorage.getItem('my-token')
    }catch (e) {

    } 
    return val;
}

export const removeData = async () => {
    try{
        await AsyncStorage.removeItem('my-token');
    }catch (e) {
        
    }
}