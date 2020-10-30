import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SighnUp'

const Routes = ({ isAuth }) => {

    if (!isAuth) {
        return (
            <Switch>
                <Route path='/signin' exact>
                    <SignIn />
                </Route>
                <Route path='/signup' exact>
                    <SignUp />
                </Route>
            </Switch>
            )
    }

    return (
        <Switch>
            ewfewf
        </Switch>
    )
}

export default Routes