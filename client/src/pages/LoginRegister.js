import React, {useState} from 'react'
import {
    useHistory
} from 'react-router-dom'

export default ()=>{
    const history = useHistory()

    const [isLogin, setLogin] = useState(true)

    function toRegister(){
        history.push(`/register`)
    }

    return (
        <>
            <h1>KETUKer </h1>
            <br></br>
            <div>
                {(isLogin)
                ? <h3>Login Page</h3>
                : <h3>Register Page</h3>
            }
            </div>
        </>
    )
}