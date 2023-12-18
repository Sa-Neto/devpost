import { createContext, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('@devapp');
            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }
        loadStorage()
    },[])

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
                storageUser(data)
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
            let data = {
                uid: uid,
                nome: userProfile.data().name,
                email: value.user.email
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
        })
        .catch((err) => {
            console.log(err)
            setLoadingAuth(false)
        })
    }
    async function signOut(){
        await auth().signOut()
        await AsyncStorage.clear().then(() => {
            setUser(null)
            setLoading(false)
        })
    }
    async function storageUser(data){
        await AsyncStorage.setItem('@devapp', JSON.stringify(data))
    }

    return (
        // signed: !!user dessa forma converto minha variavewl user para um boleano
        //sendo assim se ela tiver algo é true se não tiver nada é false

        <AuthContext.Provider value={{ signed: !!user,loadingAuth,loading,user,signUp,signIn,signOut }}>
            {children}
        </AuthContext.Provider>
    )
}