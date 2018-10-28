import firebase from 'firebase';
import { firebaseConfig } from 'Constants/defaultValues'
import axios from 'axios';

firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
const auth = {
    signInWithEmailAndPassword: (email, password) => {
        return axios.post(`http://207.180.216.94/api/v1/users/login`, { email, password })
    },
    createUserWithEmailAndPassword: (name, email, password, password_repeat) => {
        return axios.post(`http://207.180.216.94/api/v1/users/register`, {
            first_name: name.split(' ')[0],
            last_name: name.split(' ')[1],
            email,
            password,
            password_repeat
        })
    },
    getUserSession: () => {
        return axios.get(`http://207.180.216.94/api/v1/users/me`);
    },
    signOut: () => {
        return axios.post(`http://207.180.216.94/api/v1/users/logout`);
    }
}
const database = firebase.database();

export {
    auth,
    database
};
