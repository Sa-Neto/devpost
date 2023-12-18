import { Container, ButtonPost, ListPosts } from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import { useCallback, useContext, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthContext } from "../../contexts/auth";
import firestore from '@react-native-firebase/firestore';
import PostList from "../../components/PostList";

export default function Home() {
    const navigation = useNavigation();
    const {user} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            function fetchPosts(){
                firestore().collection('posts')
                .orderBy('created','desc')
                .limit(5)
                .get()
                .then((snapshot) => {

                    if(isActive){
                        setPosts([])
                        const postList = []

                        snapshot.docs.map(u => {
                            postList.push({
                                ...u.data(),
                                id: u.id,
                            })
                        })
                        setPosts(postList)
                        setLoading(false)
                    }
                })
            }
            fetchPosts();

            return() => {
                isActive = false;
            }
        },[])
    )

    return (
        <Container>
            <Header />
            {loading ? (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator  size={50} color='#e52246'/>
                </View>
            ): (
                <ListPosts
                data={posts}
                renderItem={({item}) => (
                    <PostList
                        data={item}
                        userId={user?.uid}
                    />
                )}
            />
            )}
            <ButtonPost
                activeOpacity={0.8}
                onPress={() => navigation.navigate('NewPost')}
            >
                <Feather
                    name='edit-2'
                    color='#fff'
                    size={25}
                />
            </ButtonPost>
        </Container>
    )
}