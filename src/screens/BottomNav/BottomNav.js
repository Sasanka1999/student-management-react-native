import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddStudent from '../AddStudent/AddStudent';



const Tab = createBottomTabNavigator();

export default function BottomNav() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Add Student" component={AddStudent} />
        </Tab.Navigator>
    )
}