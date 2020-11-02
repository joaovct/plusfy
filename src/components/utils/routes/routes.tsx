import React, { FunctionComponent, useCallback } from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Landing from '../../landing/Landing'
import Home from '../../home/Home'
import {isUserConnected, connectUser} from '../../../helpers/helperUserAccess'
import PrivateRoute from '../privateRoute/PrivateRoute'
import MyLibrary from '../../myLibrary/MyLibrary'
import Playlist from '../../playlist/Playlist'
import NotFound from '../../notFound/NotFound'
import Building from '../../building/Building'
import Logoff from './Logoff'
import {Provider} from 'react-redux'
import store from '../../../store/store'

const Routes = () => {
    const renderLanding = useCallback(() => {
        const response = isUserConnected()
        return response.connected
            ? <Redirect to="/home"/>
            : <Landing/>
    },[])

    const renderLogin = useCallback(() => {
        const {REACT_APP_SERVER_URL: serverURL} = process.env
        window.location.href = `${serverURL}/login`
        return <></>
    },[])

    const renderLogoff = useCallback(() => 
        <Provider store={store}>
            <Logoff/>
        </Provider>
    ,[])

    const renderPrivateRoute = useCallback((Component: FunctionComponent) => {
        connectUser()
        const response = isUserConnected()
        return response.connected 
            ? <Provider store={store}>
                <PrivateRoute Component={Component} accessToken={response.accessToken} refreshToken={response.refreshToken}/>
            </Provider>
            : <Redirect to="/" />
    },[])

    return <>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={renderLanding}/>
                <Route exact path="/login" render={renderLogin}/>
                <Route exact path="/logoff" render={renderLogoff} />
                <Route exact path="/home" render={ () => renderPrivateRoute(Home) }/>
                <Route exact path="/my-library" render={ () => renderPrivateRoute(MyLibrary) }/>
                <Route exact path="/playlist/:id" render={ () => renderPrivateRoute(Playlist) } />
                <Route exact path="/building" render={Building}/>
                <Route exact path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    </>
}

export default Routes