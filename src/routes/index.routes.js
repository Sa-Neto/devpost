import { ActivityIndicator, View } from "react-native"
import AppRoutes from "./app.routes"
import AuthRoutes from "./auth.routes"
import { useContext } from "react"
import { AuthContext } from "../contexts/auth"

export default function Routes() {
    const {signed,user} = useContext(AuthContext)
    const loading = false
    console.log(user)
    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#36393f'
                }}>
                <ActivityIndicator size={50} color="#e52246" />
            </View>
        )
    }
    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}