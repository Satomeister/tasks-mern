import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'

//TODO: 404

const Routes = () => {

    return (
        <Switch>
            <Route path='/signin' exact>
                <SignIn />
            </Route>
            <Route path='/signup' exact>
                <SignUp />
            </Route>
            <Route path='/'>
                <Home />
            </Route>
        </Switch>
    )
}

export default Routes