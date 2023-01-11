import headerStyles from "../styles/Header.module.css"
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";


const Header = () => {
    const [showSignup, setShowSignup] = useState(false)
    const [menuActive, setMenuActive] = useState(false)

    const { user, dispatch} = useContext(AuthContext)

    const toggleActiveMenu = () => {
        setMenuActive(!menuActive)
    }

    const logOut = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }

    return ( 
        <header className={headerStyles['header-wrapper']}>
            <div className={headerStyles['header-container']}>
                <div className={headerStyles['logo-wrapper']}>
                    <Link href="/" onClick={() => setMenuActive(false)}>
                        <h1>GYMS.SK</h1>
                    </Link>
                </div>
                {user && (
                <nav className={`${headerStyles['header-navbar']} ${menuActive ? headerStyles['active'] : ''} `}>
                        <span className={headerStyles['user-email']}>{user.email}</span>
                        {user.role === "gym-owner" && <Link href="/admin" className={headerStyles['manage-gyms']} onClick={() => setMenuActive(false)}>Spravovať gymy</Link>}
                        <button className={headerStyles['logout']} onClick={() => { logOut(); setMenuActive(false)}}>ODHLÁSIŤ SA</button>
                </nav>
                )}
                {!user && (
                <nav className={`${headerStyles['header-navbar']} ${menuActive ? headerStyles['active'] : ''} `}>
                    <Link href="/prihlasenie" className={headerStyles['login']} onClick={() => setMenuActive(false)}>
                        PRIHLÁSENIE
                    </Link>
                    <div className={headerStyles['signup']} onClick={() => setShowSignup(!showSignup)}>
                        <p>REGISTRÁCIA</p>  
                        <div className={`${headerStyles['signup-options']} ${showSignup ? 'flex' : 'none'}`}>
                            <Link href="/registracia/pouzivatel" onClick={() => setMenuActive(false)}><i className="fa-solid fa-user fa-fw"></i><span>Používateľ</span></Link>
                            <Link href="/registracia/spravca-gymu" onClick={() => setMenuActive(false)}><i className="fa-solid fa-dumbbell fa-fw"></i><span>Správca gymu</span></Link>
                        </div>
                    </div>
                </nav>
                )}
                <div className={`${headerStyles['ham-menu']} ${menuActive ? headerStyles['active'] : ''} `} onClick={toggleActiveMenu}>
                    <span className={headerStyles['bar']}></span>
                    <span className={headerStyles['bar']}></span>
                    <span className={headerStyles['bar']}></span>
                </div>    
            </div>
        </header>
     );
}
 
export default Header;