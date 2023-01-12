import gymStyles from "../../../styles/GymDetail.module.css"
import Head from 'next/head'
import { useState } from "react";
import Comments from "../../../components/Comments";

export async function getServerSideProps(context) {
    const { id } = context.query
    let gym = null

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/gyms/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json()

    if(response.ok) {
        gym = json.gym
    }
    return {
      props: {
        gym,
        id
      }
    }
  }

const GymDetail = (props) => {
    const { id } = props
    const [gym] = useState(props.gym)

    return ( 
        <>
        <Head>
            <title>{gym ? gym.name + ' | GYMS.SK' : 'GYMS.SK | Gym neexistuje'}</title>
            <meta name="title" content={gym ? gym.name + ' | GYMS.SK' : 'GYMS.SK | Gym neexistuje'} />
            <meta name="description" content={gym ? gym.description.slice(0, 150) : 'Pre tento gym nemáme žiaden popis kedže neexistuje :('} />
            <meta name="keywords" content="fitka, gym, posilka, fitness, centrum, fitko" />
            <meta name="robots" content="index, follow" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="revisit-after" content="1 days" />
        </Head>
        <div className={gymStyles['gym-detail-container']}>
            {!gym && (
                <h2>Gym neexistuje</h2>
            )}
            {gym && (
                <div>
                    <div className={gymStyles['main-content']}>
                        <div className={gymStyles['background']}>
                            <img src={process.env.NEXT_PUBLIC_API_URL + '/images/' + gym.imageName} alt="gysm" />
                        </div>
                        <h1 className={gymStyles['name']}>{gym.name}</h1>
                        <div className={gymStyles['city']}>
                            <i className="fa-solid fa-city fa-fw"></i>
                            <span>{gym.city}</span>
                        </div>
                        <div className={gymStyles['address']}>
                            <i className="fa-solid fa-location-dot fa-fw"></i>
                            <span>{gym.address}</span>
                        </div>
                        {gym.phone && 
                        <div className={gymStyles['phone']}>
                            <i className="fa-solid fa-phone fa-fw"></i>
                            <span>{gym.phone}</span>
                        </div>
                        }
                        {gym.email && 
                        <div className={gymStyles['email']}>
                            <i className="fa-solid fa-envelope fa-fw"></i>
                            <span>{gym.email}</span>
                        </div>
                        }
                        <div className={gymStyles['description']}>
                            <h2>Popis</h2>
                            <p>{gym.description}</p>
                        </div>
                    <aside className="desktop-hidden">
                        <div className={gymStyles['sticky-wrapper']}>
                            <div className={gymStyles['opening-hours']}>
                                <h2 style={{margin: "15px 0px"}}>Otváracie hodiny</h2>
                                <ul>
                                    <li>
                                        <span>Pondelok</span>
                                        <span>{gym.openingHours[0]}</span>
                                    </li>
                                    <li>
                                        <span>Utorok</span>
                                        <span>{gym.openingHours[1]}</span>
                                    </li>
                                    <li>
                                        <span>Streda</span>
                                        <span>{gym.openingHours[2]}</span>
                                    </li>
                                    <li>
                                        <span>Štvrtok</span>
                                        <span>{gym.openingHours[3]}</span>
                                    </li>
                                    <li>
                                        <span>Piatok</span>
                                        <span>{gym.openingHours[4]}</span>
                                    </li>
                                    <li>
                                        <span>Sobota</span>
                                        <span>{gym.openingHours[5]}</span>
                                    </li>
                                    <li>
                                        <span>Nedeľa</span>
                                        <span>{gym.openingHours[6]}</span>
                                    </li>
                                </ul>
                            </div>
                            {(gym.facebook || gym.instagram || gym.website) && (
                                <div className={gymStyles['socials']}>
                                    <h2>Sociálne siete</h2>
                                    <div className={gymStyles['social-icons']}>
                                        {gym.instagram && 
                                        <a href={gym.instagram} target="_blank" rel="noreferrer">
                                            <i className="fa-brands fa-instagram"></i>
                                        </a>
                                        }
                                        {gym.facebook && 
                                        <a href={gym.facebook} target="_blank" rel="noreferrer">
                                            <i className="fa-brands fa-facebook"></i>
                                        </a>
                                        }
                                        {gym.website && 
                                        <a href={gym.website} target="_blank" rel="noreferrer">
                                            <i className="fa-solid fa-globe"></i>
                                        </a>
                                        }
                                    </div>
                                </div>
                            )}
                            {gym.categories.length > 0 && (
                                <div className={gymStyles['categories']}>
                                    <h2>Kategórie</h2>
                                    <ul>
                                        {gym.categories.map((category) => (
                                            <li key={category} className={gymStyles['category']}>{category}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
            </div>
                </aside>
                        <Comments gymId={id} />
                    </div>
                    <aside className={`${gymStyles['side-content']} mobile-hidden`}>
                    <div className={gymStyles['sticky-wrapper']}>
                            <div className={gymStyles['opening-hours']}>
                                <h2 style={{margin: "15px 0px"}}>Otváracie hodiny</h2>
                                <ul>
                                    <li>
                                        <span>Pondelok</span>
                                        <span>{gym.openingHours[0]}</span>
                                    </li>
                                    <li>
                                        <span>Utorok</span>
                                        <span>{gym.openingHours[1]}</span>
                                    </li>
                                    <li>
                                        <span>Streda</span>
                                        <span>{gym.openingHours[2]}</span>
                                    </li>
                                    <li>
                                        <span>Štvrtok</span>
                                        <span>{gym.openingHours[3]}</span>
                                    </li>
                                    <li>
                                        <span>Piatok</span>
                                        <span>{gym.openingHours[4]}</span>
                                    </li>
                                    <li>
                                        <span>Sobota</span>
                                        <span>{gym.openingHours[5]}</span>
                                    </li>
                                    <li>
                                        <span>Nedeľa</span>
                                        <span>{gym.openingHours[6]}</span>
                                    </li>
                                </ul>
                            </div>
                            {(gym.facebook || gym.instagram || gym.website) && (
                                <div className={gymStyles['socials']}>
                                    <h2>Sociálne siete</h2>
                                    <div className={gymStyles['social-icons']}>
                                        {gym.instagram && 
                                        <a href={gym.instagram} target="_blank" rel="noreferrer">
                                            <i className="fa-brands fa-instagram"></i>
                                        </a>
                                        }
                                        {gym.facebook && 
                                        <a href={gym.facebook} target="_blank" rel="noreferrer">
                                            <i className="fa-brands fa-facebook"></i>
                                        </a>
                                        }
                                        {gym.website && 
                                        <a href={gym.website} target="_blank" rel="noreferrer">
                                            <i className="fa-solid fa-globe"></i>
                                        </a>
                                        }
                                    </div>
                                </div>
                            )}
                            {gym.categories.length > 0 && (
                                <div className={gymStyles['categories']}>
                                    <h2>Kategórie</h2>
                                    <ul>
                                        {gym.categories.map((category) => (
                                            <li key={category} className={gymStyles['category']}>{category}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            )}
        </div>
        </>
     );
}
 
export default GymDetail;