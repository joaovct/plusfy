import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from '../../home/Home'
import MyLibrary from '../../myLibrary/MyLibrary'
import Playlist from '../../playlist/Playlist'
import NotFound from '../../notFound/NotFound'
import Building from '../../building/Building'
import ImportTracks from '../../importTracks/ImportTracks'
import Favorites from '../../favorites/Favorites'
import { renderLanding, renderLogin, renderLogoff, renderPrivateRoute } from '../../../common/helpers/helperRouter'
import Search from '../../search/Search'
import Mood from '../../mood/Mood'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={renderLanding}/>
            <Route exact path="/login" render={renderLogin}/>
            <Route exact path="/logoff" render={renderLogoff} />
            <Route exact path="/home" render={() => renderPrivateRoute(Home)}/>
            <Route exact path="/search" render={() => renderPrivateRoute(Search)}/>
            <Route path="/search/:q" render={() => renderPrivateRoute(Search)}/>
            <Route exact path="/mood" render={() => renderPrivateRoute(Mood)}/>
            <Route exact path="/my-library" render={() => renderPrivateRoute(MyLibrary)}/>
            <Route exact path="/playlist/:id" render={() => renderPrivateRoute(Playlist)}/>
            <Route exact path="/favorites" render={() => renderPrivateRoute(Favorites)}/>
            <Route exact path="/import-tracks" render={() => renderPrivateRoute(ImportTracks)}/>
            <Route exact path="/building" render={Building}/>
            <Route exact path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Routes