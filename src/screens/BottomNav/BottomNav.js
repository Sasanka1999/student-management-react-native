import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';
import AddStudent from '../AddStudent/AddStudent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Profile from '../Profile/Profile';
const Tab = createBottomTabNavigator();

export default function BottomNav() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'white',  
                tabBarInactiveTintColor: 'gray', 
                tabBarStyle: {
                    backgroundColor: '#2f4f4f',  
                },
                headerShown: false,
            }}
        >
            <Tab.Screen  
                name="Home" 
                component={Home} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Add Student" 
                component={AddStudent}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person-add" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" color={color} size={size} />
                    ),
                }} 
            />
        </Tab.Navigator>
    )
}

