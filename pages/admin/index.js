import adminStyles from "../../styles/Admin.module.css"
import Head from 'next/head'
import gymStyles from "../../styles/GymsList.module.css"
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../context/AuthContext'
import Notification from "../../components/Notification";


const Admin = () => {
    const { user } = useContext(AuthContext)

    const router = useRouter()
    const message = router.query?.message

    const [gyms, setGyms] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        console.log('admin useEffect called')
        const fetchOwnedGyms = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/gyms/admin/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if(!response.ok) {
                setError(json.error)
            }

            if(response.ok) {
                setError(null)
                setGyms(json.gyms)
            }
        }

        if(user) {
            fetchOwnedGyms()
        }

    }, [user])

    return ( 
        <>
        <Head>
            <title>Admin | GYMS.SK</title>
            <meta name="title" content="Admin | GYMS.SK" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        </Head>
        <div className={adminStyles['admin-container']}>
            <div className={adminStyles['admin-menu-wrapper']}>
                <h2>Zoznam vašich gymov</h2>
                <Link className={adminStyles['add-gym']} href="/admin/pridat">Pridať gym</Link>
            </div>
            {error && <div> {error} </div>}
            {gyms && gyms.map((gym) => (
                <div key={gym._id} className={gymStyles['gym-wrapper']}>
                    <div className={gymStyles['img-wrapper']}>
                        <Link href={'/admin/upravit/'+gym._id}>
                            <img src={'http://localhost:4000/images/' + gym.imageName} alt="gym" />
                        </Link>
                    </div>
                    <div className={gymStyles['body-wrapper']}>
                        <Link href={'/admin/upravit/'+gym._id}>
                            <h3 className="name">{gym.name}</h3>
                        </Link>
                        <div className={gymStyles['city']}>
                            <i className="fa-solid fa-city fa-fw"></i>
                            <span>{gym.city}</span>
                        </div>
                        <div className={gymStyles['address']}>
                        <i className="fa-solid fa-location-dot fa-fw"></i>
                            <span>{gym.address}</span>
                        </div>
                        <p className={gymStyles['description']}>{gym.description}</p>
                    </div>
                </div>
            ))}
          {message && <Notification message={message} />}
        </div>
        </>
     );
}
 
export default Admin;