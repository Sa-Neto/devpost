import { Text, View } from "react-native";
import { Button, ButtonText, Container, Input } from "./styles";
import { useContext, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'

export default function NewPost(){
    const [post,setPost] = useState('')
    const navigation = useNavigation()
    const {user} = useContext(AuthContext)

    useLayoutEffect(() => {
        const options = navigation.setOptions({
            headerRight:() => (
                <Button
                    onPress={() => handlePost()}
                >
                    <ButtonText>Compartilhar</ButtonText>
                </Button>
            )
        })
    },[navigation,post])
    async function handlePost(){
        if(post === ''){
            console.log('Seu post contém contúdo invlaido')
            retunr
        }
        let avatarUrl = null;

        try {
            let response = await storage().ref('users').child(user?.uid).getDownloadURL();
            avatarUrl = response;
        } catch (error) {
            avatarUrl = null
        }
        await firestore().collection('posts')
        .add({
            created: new Date(),
            content: post,
            autor:user?.nome,
            userId: user?.uid,
            likes:0,
            avatarUrl,
        })
        .then(() => {
            setPost('')
            console.log('Post Criando com Sucesso')
        })
        .catch((error) => {
            console.log('Error ao criar o post', error)
        })
        navigation.goBack()
    }
    return(
        <Container>
           <Input
                placeholder="O que está acontecendo"
                value={post}
                onChangeText={(text) => setPost(text)}
                autoCorrect={false}
                multiline={true}
                placeholderTextColor="#ddd"
                maxLength={300}
           />
        </Container>
    )
}