import React from 'react'
import { Provider } from 'react-redux'
import { Redirect } from "react-router-dom"
import Landing from "../../components/landing/Landing"
import PrivateRoute from '../../components/utils/privateRoute/PrivateRoute'
import Logoff from '../../components/utils/routes/Logoff'
import store from '../../redux/store/store'
import { connectUser, isUserConnected } from "./helperUserAccess"

export const renderLanding = () => {
    const response = isUserConnected()
    return response.connected ? <Redirect to="/home"/> : <Landing/>
}

export const renderLogin = () => {
    const {REACT_APP_SERVER_URL: serverURL} = process.env
    window.location.href = `${serverURL}/login`
    return <></>
}

export const renderLogoff = () => (
    <Provider store={store}>
        <Logoff/>
    </Provider>
)

export const renderPrivateRoute = (Component: React.FC) => {
    connectUser()
    const response = isUserConnected()
    return response.connected
    ? <Provider store={store}>
        <PrivateRoute Component={Component} accessToken={response.accessToken} refreshToken={response.refreshToken}/>
    </Provider>
    : <Redirect to="/" />
}