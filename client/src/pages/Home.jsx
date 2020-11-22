import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SideNav from '../components/SideNav/SideNav'
import Main from '../components/Main'
import SideListsState from '../context/listsCountContext/SideListsState'
import ListState from '../context/listContext/ListState'
import NotFoundPage from './NotFoundPage'

const Home = () => {
    return (
        <SideListsState>
            <ListState>
                <div className='home'>
                    <SideNav />
                    <Switch>
                        <Route path='/' exact>
                            <Main />
                        </Route>
                        <Route path='/lists/:listId' exact>
                            <Main />
                        </Route>
                        <Route path="/404" component={NotFoundPage} />
                        <Redirect to='/404' />
                    </Switch>
                </div>
            </ListState>
        </SideListsState>
    )
}

export default Home