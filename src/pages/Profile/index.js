import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../../contexts/auth";

export default function Profile(){
    const {signOut} = useContext(AuthContext);
    async function handleSignOut(){
        await signOut()
    }
    
    return(
        <View>
            <Text>Profile</Text>
            <Button
                title="Sair"
                onPress={handleSignOut}
            />
        </View>
    )
}