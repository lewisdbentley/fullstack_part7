import React from 'react'

const LoginForm = ({
    username,
    password,
    handleSetUsername,
    handleSetPassword,
    submitLogin,
}) => {
    return (
        <div className='formDiv'>
            <form onSubmit={submitLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value = { username }
                        name="username"
                        onChange={handleSetUsername}
                    />
                </div>
                <div>
                    password
                    <input
                        type="text"
                        value = { password }
                        name="password"
                        onChange={handleSetPassword}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm