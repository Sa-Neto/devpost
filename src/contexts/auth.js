import { createContext, useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)

    async function signUp(email, password, name) {
        setLoadingAuth(true)
        await auth().createUserWithEmailAndPassword(email,password)
        .then(async(value) => {
            let uid = value.user.uid;
            await firestore().collection('users')
            .doc(uid).set({
                name:name,
                createdAt: new Date(),
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email
                }

                setUser(data)
                setLoadingAuth(false)
            }).
            catch((err) => {
                console.log(err)
                setLoadingAuth(false)
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
    async function signIn(email,password){
        setLoadingAuth(true)
        await auth().signInWithEmailAndPassword(email,password)
        .then( async(value) => {
            let uid = value.user.uid
            const userProfile = await firestore().collection('users')
            .doc(uid).get()
            //console.log(userProfile.data().name)
            let data = {
                uid: uid,
                nome: userProfile.data().name,
                email: value.user.email
            }
            setUser(data)
            setLoadingAuth(false)
        })
        .catch((err) => {
            console.log(err)
            setLoadingAuth(false)
        })
    }
    return (
        // signed: !!user dessa forma converto minha variavewl user para um boleano
        //sendo assim se ela tiver algo é true se não tiver nada é false

        <AuthContext.Provider value={{ signed: !!user,loadingAuth,signUp,signIn }}>
            {children}
        </AuthContext.Provider>
    )
}