import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import NotFoundPage from '../pages/NotFoundPage'

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
            <Route path="/404" component={NotFoundPage} />
            <Redirect to='/404' />
        </Switch>
    )
}

export default Routes