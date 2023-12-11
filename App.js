import { StatusBar, Text, View } from "react-native";
import Routes from "./src/routes/index.routes";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/auth";

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <StatusBar backgroundColor="#36393f" barStyle="light-content" translucent={false} />
                <Routes />
            </AuthProvider>
        </NavigationContainer>
    )
}