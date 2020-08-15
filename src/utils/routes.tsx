import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Landing from '../components/landing/Landing'
import Home from '../components/home/Home'
import {disconnectUser, isUserConnected, connectUser} from './userAccess'

const Routes = () => {
        
    function renderLanding(){
        const response = isUserConnected()
        return response.connected ? <Redirect to="/home"/> : <Landing/>
    }

    function renderLogin(){
        const {REACT_APP_SERVER_URL: serverURL} = process.env
        window.location.href = `${serverURL}/login`
        return <></>
    }

    function renderLogoff(){
        disconnectUser()
        const response = isUserConnected()
        return response.connected ? <Redirect to="/home" /> : <Redirect to="/" />
    }

    function renderHome(){
        connectUser()
        const response = isUserConnected()
        return response.connected ? <Home user_id={response.user_id}/> : <Redirect to="/" />
    }

    return <>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={renderLanding}/>
                <Route path="/home" render={renderHome}/>
                <Route path="/login" exact render={renderLogin}/>
                <Route path="/logoff" exact render={renderLogoff} />
            </Switch>
        </BrowserRouter>
    </>
}

export default Routes