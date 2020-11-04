import React from 'react'
import SideNav from '../components/SideNav'
import Main from '../components/Main'
import { Route, Switch } from 'react-router-dom'

const Home = () => {
    return (
        <div className='home'>
            <SideNav />
            <Switch>
                <Route path='/lists/:listId'>
                    <Main />
                </Route>
            </Switch>
        </div>
    )
}

export default Home