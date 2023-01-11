import gymStyles from "../../../../styles/GymsList.module.css"
import Head from 'next/head'
import { useState } from "react";
import Link from "next/link"
import Filter from "../../../../components/Filter";
import Pagination from "../../../../components/Pagination";

const replaceDashWithSpace = (string) => {
    return string.replace(/-/g, ' ')
}

export async function getServerSideProps(context) {
    const { region, city, page } = context.query
    let gyms = []

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/gyms/?city='+replaceDashWithSpace(city)+'&region='+replaceDashWithSpace(region), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json()

    if(response.ok) {
        gyms = json.gyms
    }
    return {
      props: {
        gyms,
        region,
        city,
        page: page ? Number(page) : 1
      }
    }
  }

const GymsList = (props) => {
    const { region, city } = props

    const [gyms, setGyms] = useState(props.gyms)
    const [currentPage, setCurrentPage] = useState(props.page)
    const [gymsPerPage] = useState(2);

    const handleAnchor = (name) => {
        return name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/\s/g, '-')
    }

    const indexOfLastGym = currentPage * gymsPerPage;
    const indexOfFirstGym = indexOfLastGym - gymsPerPage;
    const currentGyms = gyms.slice(indexOfFirstGym, indexOfLastGym);

    return ( 
        <>
        <Head>
            <title>{gyms.length > 0 ? gyms[0].city + ' - Fitness centrá' : 'GYMS.SK - Fitness centrá'}</title>
            <meta name="title" content={gyms.length > 0 ? gyms[0].city + ' - Fitness centrá': 'GYMS.SK - Fitness centrá'} />
            <meta name="description" content={gyms.length > 0 ? 'Nájdite fitko alebo posilku v okolí ' + gyms[0].city + '.' : 'Nájdite fitko alebo posilku vo vašom okolí.'} />
            <meta name="keywords" content="fitka, gym, posilka, fitness, centrum, fitko" />
            <meta name="robots" content="index, follow" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="revisit-after" content="1 days" />
        </Head>
        <div className={gymStyles['gyms-list-container']}>
            <aside>
                <Filter region={replaceDashWithSpace(region)} city={replaceDashWithSpace(city)} setGyms={setGyms} />
            </aside>
            {currentGyms.length === 0 && (
                <h2>Žiadne gymy v danej lokalite</h2>
            )}
            {currentGyms.length > 0 && (
            <div className={gymStyles['gyms-list']}>
                <h2>Zoznam gymov v okolí {gyms[0].city}</h2>
                {currentGyms.map((gym) => (
                    <div key={gym._id} className={gymStyles['gym-wrapper']}>
                        <div className={gymStyles['img-wrapper']}>
                            <Link href={`/gym/${gym._id}/${handleAnchor(gym.name)}`}>
                                <img src={process.env.NEXT_PUBLIC_API_URL + '/images/' + gym.imageName} alt="gysm" />
                            </Link>
                        </div>
                        <div className={gymStyles['body-wrapper']}>
                            <Link href={`/gym/${gym._id}/${handleAnchor(gym.name)}`}>
                                <h3 className={gymStyles['name']}>{gym.name}</h3>
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
                <Pagination itemsPerPage={gymsPerPage} totalItems={gyms.length} currentPage={currentPage} setCurrentPage={setCurrentPage} region={region} city={city} />
            </div>
        )}
        </div>
        </>
     );
}
 
export default GymsList;