import { ActivityIndicator, Text } from "react-native";
import { Button, ButtonText, Container, Input, SignUpButton, SignUpText, Title } from "./styles";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export default function Login() {
    const [login, setLogin] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUp, signIn, loadingAuth } = useContext(AuthContext)

    function toggleLogin() {
        setLogin(!login)
        setEmail('')
        setPassword('')
        setName('')
    }
    async function handleSignIn() {
        if (email === '' || password === '') {
            console.log('Preencha Todos os Campos')
            return
        }
        await signIn(email, password)
    }
    async function handleSignUp() {
        if (name === '' || email === '' || password === '') {
            console.log('Preencha Todos os Campos para cadastrar')
            return
        }
        await signUp(email, password, name)
    }
    if (login) {
        return (
            <Container>
                <Title>Dev<Text style={{ color: '#e52246' }}>Post</Text></Title>

                <Input
                    placeholder="seuemail#test.com"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />

                <Input
                    placeholder="*******"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />

                <Button onPress={handleSignIn}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#fff" />
                    ) : (
                        <ButtonText>Acessar</ButtonText>
                    )}
                </Button>

                <SignUpButton onPress={toggleLogin}>
                    <SignUpText>Criar uma conta</SignUpText>
                </SignUpButton>

            </Container>
        )
    }
    return (
        <Container>
            <Title>Dev<Text style={{ color: '#e52246' }}>Post</Text></Title>

            <Input
                placeholder="Seu nome"
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <Input
                placeholder="seuemail#test.com"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <Input
                placeholder="*******"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            <Button onPress={handleSignUp}>
                {loadingAuth ? (
                    <ActivityIndicator size={20} color="#fff" />
                ) : (
                    <ButtonText>Cadastrar</ButtonText>
                )}
            </Button>

            <SignUpButton onPress={toggleLogin} >
                <SignUpText>Já possuo uma conta</SignUpText>
            </SignUpButton>

        </Container>
    )
}