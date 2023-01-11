import signupStyles from "../styles/LoginSignup.module.css"
import Head from 'next/head'
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

const Signup = ({role}) => {
    
const [name, setName] = useState('')
const [lastName, setLastName] = useState('')
const [password, setPassword] = useState('')
const [confPassword, setConfPassword] = useState('')
const [email, setEmail] = useState('')

const passLength = useRef(null)
const passLower = useRef(null)
const passUpper = useRef(null)
const passNum = useRef(null)

const [error, setError] = useState(null)
const [isPending, setIsPending] = useState(false)
const [emptyFields, setEmptyFields] = useState(null)

const { user, dispatch } = useContext(AuthContext)

if(user) {
    const router = useRouter()
    router.push('/')
}


const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true)

    const user = {name, lastName, password, confPassword, email, role}

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/user/signup', {
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
        setIsPending(false)
        setError(null)
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})
    }
}   

const handlePassValidation = (e) => {
    passLength.current.className = e.target.value.length >= 8 ? signupStyles['valid'] : signupStyles['invalid']
    passLower.current.className = /[a-z]/.test(e.target.value) ? signupStyles['valid'] : signupStyles['invalid']
    passUpper.current.className = /[A-Z]/.test(e.target.value)? signupStyles['valid'] : signupStyles['invalid']
    passNum.current.className = /[0-9]/.test(e.target.value) ? signupStyles['valid'] : signupStyles['invalid']
}

return ( 
    <>
    <Head>
        <title>Registrácia | GYMS.SK</title>
        <meta name="title" content="Registrácia | GYMS.SK" />
        <meta name="keywords" content="fitka, gym, posilka, fitness, centrum, fitko" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="revisit-after" content="1 days" />
    </Head>
    <form className={signupStyles['signup-form']} onSubmit={handleSubmit}>
        <h3>Registrácia</h3>

        <label>Meno</label>
        <input 
        type="text"
        value={name} 
        onChange={(e) => setName(e.target.value)}
        className={emptyFields && emptyFields.includes('name') ? signupStyles['error'] : ''}
        />
        <label>Priezvisko</label>
        <input 
        type="text"
        value={lastName} 
        onChange={(e) => setLastName(e.target.value)}
        className={emptyFields && emptyFields.includes('lastName') ? signupStyles['error'] : ''}
        />
        <label>Heslo</label>
        <input 
        type="password"
        value={password} 
        onChange={(e) => {setPassword(e.target.value); handlePassValidation(e)}}
        className={emptyFields && emptyFields.includes('password') ? signupStyles['error'] : ''}
        />
        <span className={signupStyles['pass-requirements']}>
            <span><b>Heslo musí obsahovať:</b></span>
            <span ref={passLength}>Minimálne 8 znakov</span>
            <span ref={passLower}>Aspoň jedno malé písmeno</span>
            <span ref={passUpper}>Aspoň jedno veľké písmeno</span>
            <span ref={passNum}>Aspoň jednu číslicu</span>
        </span>
        <label>Potvrdenie hesla</label>
        <input 
        type="password"
        value={confPassword} 
        onChange={(e) => setConfPassword(e.target.value)}
        className={emptyFields && emptyFields.includes('confPassword') ? signupStyles['error'] : ''}
        />
        <label>Email</label>
        <input 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        className={emptyFields && emptyFields.includes('email') ? signupStyles['error'] : ''}
        />
        <button disabled={isPending}>Zaregistrovať</button>
        {error && <div className={signupStyles['error']}>{error}</div>}
    </form>
    </>
    );
}
 
export default Signup;