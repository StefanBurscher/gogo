
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../firebase';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER
} from 'Constants/actionTypes';

import {
    loginUserSuccess,
    registerUserSuccess
} from './actions';

const userSession = async () =>
    await auth.getUserSession()
        .then(authUser => authUser)
        .catch(error => error);


const loginWithEmailPasswordAsync = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);

function* loginWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
        if (!loginUser.message) {
            yield put(loginUserSuccess(loginUser));
            const userSessionData = yield call(userSession);
            if (!userSessionData.message) {
                localStorage.setItem('user', JSON.stringify(userSessionData.data.data));
                history.push('/');
            }
        } else {
            // catch throw
            console.log('login failed :', loginUser.message)
        }
    } catch (error) {
        // catch throw
        console.log('login error : ', error)
    }
}



const registerWithEmailPasswordAsync = async (name, email, password, password_repeat) =>
    await auth.createUserWithEmailAndPassword(name, email, password, password_repeat)
        .then(authUser => authUser)
        .catch(error => error);

function* registerWithEmailPassword({ payload }) {
    const { name, email, password, password_repeat } = payload.user;
    const { history } = payload
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, name, email, password, password_repeat);
        if (!registerUser.message) {
            yield put(registerUserSuccess(registerUser));
            const userSessionData = yield call(userSession);
            if (!userSessionData.message) {
                console.log(userSessionData)
                localStorage.setItem('user', JSON.stringify(userSessionData.data.data));
                history.push('/')
            }
        } else {
            // catch throw
            console.log('register failed :', registerUser.message)
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}



const logoutAsync = async (history) => {
    await auth.signOut().then(authUser => authUser).catch(error => error);
    history.push('/')
}

function* logout({ payload }) {
    const { history } = payload
    try {
        yield call(logoutAsync, history);
        localStorage.removeItem('user');
    } catch (error) {
    }
}



export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser)
    ]);
}