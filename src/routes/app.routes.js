import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Search from "../pages/Search";

const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");

const Tab = createBottomTabNavigator();

export default function AppRoutes(){
    
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}