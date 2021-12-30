import React, { useEffect } from 'react'
import './App.css'
import Login from './components/LoginPage/Login'
import {
    BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import { actionCreators, State } from './state'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './components/HomePage/HomePage'
import { bindActionCreators } from 'redux'
import { setToken } from './services/config'
import { UserToken } from './types'

function App() {

    const user_token = useSelector((state: State) => state.userToken)
    const dispatch = useDispatch()
    const { setUserToken } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        const user_token = window.localStorage.getItem('user_token')
        if (user_token) {
            const parsed_user_token: UserToken = JSON.parse(user_token)
            setToken(parsed_user_token.token)
            setUserToken(parsed_user_token)
            
        }
    }, [])


    return (
        <Router>
            <div className="App">

                <Routes>
                    {!user_token && <Route path="/*" element={<Login />} />}

                    {user_token && <Route path="/*" element={<HomePage />} />}

                </Routes>

            </div>
        </Router>
    )
}

export default App
