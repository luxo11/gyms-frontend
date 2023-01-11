import adminStyles from "../../../styles/Admin.module.css"
import Head from 'next/head'
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useSearch} from "../../../hooks/useSearch";
import { AuthContext } from "../../../context/AuthContext";

const EditGym = () => {
    const { user } = useContext(AuthContext)

    const router = useRouter()
    const  { id }  = router.query
    
    const [fetchError, setFetchError] = useState(null)
    const [dataFetched, setDataFetched] = useState(false)

    const {handleSearch, getRegionFlag, cities } = useSearch()
    const [showCitiesList, setShowCitiesList] = useState(true)

    const [submitError, setSubmitError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const [emptyFields, setEmptyFields] = useState(null)

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [region, setRegion] = useState('')
    const [openingHours, setOpeningHours] = useState(['','','','','','',''])
    const [categories, setCategories] = useState([])
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const [website, setWebsite] = useState('')
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')
    const [image, setImage] = useState('')
    
    useEffect(() => {
        console.log('Edit useEffect called')
        const fetchGym = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/gyms/admin/get/'+id,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if(!response.ok) {
                setFetchError(json.error)
            }
            if(response.ok) {
                setFetchError(null)
                setName(json.gym.name)
                setAddress(json.gym.address)
                setCity(json.gym.city)
                setDistrict(json.gym.district)
                setRegion(json.gym.region)
                setOpeningHours(json.gym.openingHours)
                setCategories([...json.gym.categories])
                setEmail(json.gym.email)
                setPhone(json.gym.phone)
                setDescription(json.gym.description)
                setWebsite(json.gym.website)
                setInstagram(json.gym.instagram)
                setFacebook(json.gym.facebook)
                setImage({filename:json.gym.imageName, originalname:json.gym.originalImageName})
                setDataFetched(true)
            }
        }
        
        if(user) {
            fetchGym()
        }

    },[user, id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            return
        }
    
        let formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('district', district);
        formData.append('region', region);
        formData.append('openingHours', JSON.stringify(openingHours));
        formData.append('categories', JSON.stringify(categories));
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('description', description);
        formData.append('website', website);
        formData.append('instagram', instagram);
        formData.append('facebook', facebook);
        formData.append('image', image);

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/gyms/admin/edit/'+id,{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            body: formData
        })

        const json = await response.json()

        if(!response.ok) {
            setIsPending(false)
            setSubmitError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
          router.push(
            {
                pathname: '/admin',
                query: {
                    message: 'Gym bol úspešne upravený.'
                }
            },
              '/admin'
          )
        }
    }

    const handleOpeningHours = (value, dayIndex) => {
        const hoursArray = [...openingHours]
        hoursArray[dayIndex] = value
        setOpeningHours(hoursArray)
    }
    
    const handleCategoryCheck = (e) => {

        if(e.target.checked) {
            setCategories([...categories, e.target.value])
        }

        if(!e.target.checked) {
            const newArray = categories.filter((category) => {
                return category !== e.target.value
            })
            setCategories(newArray)
        }
    }

    return (
        <>
        <Head>
            <title>Upraviť | GYMS.SK</title>
            <meta name="title" content="Upraviť | GYMS.SK" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        </Head>
        {dataFetched &&
        <div className={adminStyles['new-gym-container']}>
            <form className={adminStyles['new-gym-form']} encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className={adminStyles['label-wrapper']}>
                    <label>Názov</label>
                    <span className={adminStyles['required']}>*</span>
                </div>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={emptyFields && emptyFields.includes('name') ? 'error' : ''}
                />
                <div className={adminStyles['label-wrapper']}>
                    <label>Adresa</label>
                    <span className={adminStyles['required']}>*</span>
                </div>
                <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={emptyFields && emptyFields.includes('address') ? 'error' : ''}
                />
                <div className={adminStyles['label-wrapper']}>
                    <label>Mesto</label>
                    <span className={adminStyles['required']}>*</span>
                </div>
                <div className="search-form">
                    <input 
                        type="text" 
                        onChange={(e) => {handleSearch(e); setCity(e.target.value); setShowCitiesList(true)}}
                        value={city}
                        className={emptyFields && emptyFields.includes('city') ? 'error' : ''}
                        />
                        {cities && showCitiesList && (
                            <div className="search-list">
                                {cities.map((city) => (
                                    <span key={city._id} className="city-wrapper" onClick={() => {setCity(city.name); setDistrict(city.district); setRegion(city.region); setShowCitiesList(false)}}>
                                        <span>{ city.name }</span>
                                        <span>{ getRegionFlag(city.region)}</span>
                                    </span>
                            ))}                
                            </div>
                        )}
                </div>
                <div className={adminStyles['label-wrapper']}>
                    <label>Popis</label>
                    <span className={adminStyles['required']}>*</span>
                </div>
                <textarea rows="8" value={description} onChange={(e) => setDescription(e.target.value)} className={emptyFields && emptyFields.includes('description') ? 'error' : ''}></textarea>
                <div className={adminStyles['label-wrapper']}>
                    <label>Otváracie hodiny</label>
                    <span className={adminStyles['required']}>*</span>
                </div>
                <div className={adminStyles['opening-hours-wrapper']}>
                    <div className={adminStyles['first']}>
                        <div className={adminStyles['day']}>
                            <div className={adminStyles['label-wrapper']}>
                                <label>Pondelok</label>
                                <span className={adminStyles['required']}>*</span>
                            </div>
                            <input type="text" value={openingHours[0]}  onChange={(e) => handleOpeningHours(e.target.value,0)} className={emptyFields && emptyFields.includes('openingHours[0]') ? 'error' : ''}/>
                        </div>
                        <div className={adminStyles['day']}>
                            <div className={adminStyles['label-wrapper']}>
                                <label>Utorok</label>
                                <span className={adminStyles['required']}>*</span>
                            </div>
                            <input type="text"  value={openingHours[1]} onChange={(e) => handleOpeningHours(e.target.value,1)} className={emptyFields && emptyFields.includes('openingHours[1]') ? 'error' : ''}/>
                        </div> 
                        <div className={adminStyles['day']}>
                            <div className={adminStyles['label-wrapper']}>
                                <label>Streda</label>
                                <span className={adminStyles['required']}>*</span>
                            </div>
                            <input type="text"  value={openingHours[2]} onChange={(e) => handleOpeningHours(e.target.value,2)} className={emptyFields && emptyFields.includes('openingHours[2]') ? 'error' : ''}/>
                        </div> 
                        <div className={adminStyles['day']}>
                            <div className={adminStyles['label-wrapper']}>
                                <label>Štvrtok</label>
                                <span className={adminStyles['required']}>*</span>
                            </div>
                            <input type="text"  value={openingHours[3]} onChange={(e) => handleOpeningHours(e.target.value,3)} className={emptyFields && emptyFields.includes('openingHours[3]') ? 'error' : ''}/>
                        </div>               
                    </div>
                    <div className={adminStyles['second']}>
                         <div className={adminStyles['day']}>
                            <div className={adminStyles['label-wrapper']}>
                                <label>Piatok</label>
                                <span className={adminStyles['required']}>*</span>
                            </div>
                            <input type="text" value={openingHours[4]} onChange={(e) => handleOpeningHours(e.target.value,4)} className={emptyFields && emptyFields.includes('openingHours[4]') ? 'error' : ''}/>
                        </div> 
                        <div className={adminStyles['day']}>
                            <div className={adminStyles['label-wrapper']}>
                                <label>Sobota</label>
                                <span className={adminStyles['required']}>*</span>
                            </div>
                            <input type="text" value={openingHours[5]} onChange={(e) => handleOpeningHours(e.target.value,5)} className={emptyFields && emptyFields.includes('openingHours[5]') ? 'error' : ''}/>
                        </div> 
                        <div className={adminStyles['day']}>
                            <div className={adminStyles['label-wrapper']}>
                                <label>Nedeľa</label>
                                <span className={adminStyles['required']}>*</span>
                            </div>
                            <input type="text"  value={openingHours[6]} onChange={(e) => handleOpeningHours(e.target.value,6)} className={emptyFields && emptyFields.includes('openingHours[6]') ? 'error' : ''}/>
                        </div> 
                    </div>
                </div>
                <label>Kategórie</label>
                <div className={adminStyles['categories-wrapper']}>
                    <span className={adminStyles['category']}>
                        <input type="checkbox" value="Fitness" defaultChecked={categories.includes('Fitness')} onChange={handleCategoryCheck}/>
                        <span>Fitness</span>
                    </span>
                    <span className={adminStyles['category']}>
                        <input type="checkbox" value="Box" defaultChecked={categories.includes('Box')} onChange={handleCategoryCheck}/>
                        <span>Box</span>
                    </span>
                    <span className={adminStyles['category']}>
                        <input type="checkbox" value="Pilates" defaultChecked={categories.includes('Pilates')} onChange={handleCategoryCheck}/>
                        <span>Pilates</span>
                    </span>
                    <span className={adminStyles['category']}>
                        <input type="checkbox" value="TRX" defaultChecked={categories.includes('TRX')} onChange={handleCategoryCheck}/>
                        <span>TRX</span>
                    </span>
                    <span className={adminStyles['category']}>
                        <input type="checkbox" value="MMA" defaultChecked={categories.includes('MMA')} onChange={handleCategoryCheck}/>
                        <span>MMA</span>
                    </span>
                    <span className={adminStyles['category']}>
                        <input type="checkbox" value="Kardio" defaultChecked={categories.includes('Kardio')} onChange={handleCategoryCheck}/>
                        <span>Kardio</span>
                    </span>
                    <span className={adminStyles['category']}>
                        <input type="checkbox" value="Jóga" defaultChecked={categories.includes('Jóga')} onChange={handleCategoryCheck}/>
                        <span>Jóga</span>
                    </span>
                    <span className={adminStyles['category']}>
                        <input type="checkbox" value="Zumba" defaultChecked={categories.includes('Zumba')} onChange={handleCategoryCheck}/>
                        <span>Zumba</span>
                    </span>
                    <span className={adminStyles['category']}>
                        <input type="checkbox" value="Osobný tréner" defaultChecked={categories.includes('Osobný tréner')} onChange={handleCategoryCheck}/>
                        <span>Osobný tréner</span>
                    </span>
                </div>
                <label>Email</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Telefón</label>
                <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <label>Webová stránka</label>
                <input 
                    type="text" 
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
                 <label>Instagram stránka</label>
                <input 
                    type="text" 
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />
                 <label>Facebook stránka</label>
                <input 
                    type="text" 
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />
                <div className={adminStyles['label-wrapper']}>
                    <label>Úvodná fotka</label>
                    <span className={adminStyles['required']}>*</span>
                </div>
                <input 
                    type="file" 
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className={emptyFields && emptyFields.includes('image') ? 'error' : ''}
                />
                <button disabled={isPending} type="submit">Upraviť gym</button>
                {fetchError && <div className="error">{fetchError}</div>}
                {submitError && <div className="error">{submitError}</div>}
            </form>
        </div>
        }
        </> 
     );
}
 
export default EditGym;