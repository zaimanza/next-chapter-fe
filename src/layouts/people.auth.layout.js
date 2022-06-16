import React, { useState } from 'react'
import LoginPage from '../pages/auth/login.page'
import RegisterPage from '../pages/auth/register.page'

const PeopleAuthLayout = () => {
    const [getAuthMode, setAuthMode] = useState("login")
    return (
        <div className='bg-pink-400'>
            <div className="relative w-full h-full py-40 min-h-screen">
                <div
                    className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                // style={{
                //     backgroundImage:
                //         "url(" + require("assets/img/register_bg_2.png").default + ")",
                // }}
                >
                    {(getAuthMode === "login") ? <LoginPage setAuthMode={setAuthMode} /> : <RegisterPage setAuthMode={setAuthMode} />}
                </div>
            </div>
        </div>
    )
}

export default PeopleAuthLayout