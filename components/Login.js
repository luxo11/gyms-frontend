import loginStyles from "../styles/LoginSignup.module.css"
import Head from 'next/head'
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

const Login = () => {
const [password, setPassword] = useState('')
const [email, setEmail] = useState('')
const [error, setError] = useState(null)
const [isPending, setIsPending] = useState(null)
const [emptyFields, setEmptyFields] = useState(null)

const { user, dispatch } = useContext(AuthContext)

if(user) {
    const router = useRouter()
    router.push('/')
}

const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true)

    const user = {password, email}

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })

    const json = await response.json()

    if(!response.ok) {
        setIsPending(false)
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if(response.ok) {
        setEmptyFields(null)
        setIsPending(false)
        setError(null)
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})
    }
}   

    return ( 
        <>
        <Head>
            <title>Prihlásenie | GYMS.SK</title>
            <meta name="title" content="Prihlásenie | GYMS.SK" />
            <meta name="keywords" content="fitka, gym, posilka, fitness, centrum, fitko" />
            <meta name="robots" content="index, follow" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="revisit-after" content="1 days" />
        </Head>
        <form className={loginStyles['login-form']} onSubmit={handleSubmit}>
            <h3>Prihlásenie</h3>

            <label>Email</label>
            <input 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className={emptyFields && emptyFields.includes('email') ? loginStyles['error'] : ''}
            />
            <label>Heslo</label>
            <input 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className={emptyFields && emptyFields.includes('password') ? loginStyles['error'] : ''}
            />
            <button disabled={isPending}>Prihlásiť</button>
            {error && <div className={loginStyles['error']}>{error}</div>}
        </form>
        </>
     );
}
 
export default Login;