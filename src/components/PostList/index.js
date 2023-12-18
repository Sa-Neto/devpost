import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    Container,
    Name,
    Avatar,
    ContentView,
    Content,
    Header,
    Actions,
    LikeButton,
    Like,
    TimePost,
    TimesPost
} from "./styles"

function PostList() {
    return (
        <Container>
            <Header>
                <Avatar
                    source={require('../../assets/avatar.png')}
                />
                <Name numberOfLines={1}>
                    Sujeito Programador
                </Name>
            </Header>
            <ContentView>
                <Content>Todo conteudo do post</Content>
            </ContentView>
            <Actions>
                <LikeButton>
                    <Like>12</Like>
                    <MaterialCommunityIcons
                        name="heart-plus-outline"
                        size={20}
                        color="#e52246"
                    />
                </LikeButton>
               <TimesPost>Há pouco tempo</TimesPost>
            </Actions>
        </Container>
    )
}

export default PostList;