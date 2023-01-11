import filterStyles from "../styles/Filter.module.css"
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

const Filter = ({region, city, setGyms}) => {
    const [categories, setCategories] = useState([])
    const [showOnMobile, setShowOnMobile] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    let storageRef = useRef(true)

    const handleOnchange = async (e) => {

        if(e.target.checked) {
            
            const newCategories = [...categories,e.target.value]
            setCategories(newCategories)
        }

        if(!e.target.checked) {
            const newArray = categories.filter((category) => {
                return category !== e.target.value
            })
           setCategories(newArray)
        }
    }

    useEffect(() => {
        console.log('filter useEffect called')
        if (!storageRef.current) {
            const updateResults = async () => {
                setIsLoading(true)
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/gyms/filter/?city='+city+'&region='+region+'&categories='+JSON.stringify(categories))

                const json = await response.json()

                if(!response.ok) {
                    setGyms([])
                    setIsLoading(false)
                }

                if(response.ok) {
                    setGyms(json.gyms)
                    setIsLoading(false)
                }
            }
            updateResults()
        }
        return () => { storageRef.current = false; }

    }, [categories, city, region, setGyms])
    
    return (
        <> 
        <div className={filterStyles['category-filter']}>
            <div className={filterStyles['filter-header']} onClick={() => setShowOnMobile(!showOnMobile)}>
                <i className="fa-solid fa-filter"></i>
                <h2>Filter</h2>
            </div>
            <div className={`${filterStyles['categories-wrapper']} ${showOnMobile ? filterStyles['active'] : ''}`}>
                    <span className={filterStyles['category']}>
                        <input type="checkbox" value="Fitness" onChange={handleOnchange}/>
                        <span>Fitness</span>
                    </span>
                    <span className={filterStyles['category']}>
                        <input type="checkbox" value="Box" onChange={handleOnchange}/>
                        <span>Box</span>
                    </span>
                    <span className={filterStyles['category']}>
                        <input type="checkbox" value="Pilates" onChange={handleOnchange}/>
                        <span>Pilates</span>
                    </span>
                    <span className={filterStyles['category']}>
                        <input type="checkbox" value="TRX" onChange={handleOnchange}/>
                        <span>TRX</span>
                    </span>
                    <span className={filterStyles['category']}>
                        <input type="checkbox" value="MMA" onChange={handleOnchange}/>
                        <span>MMA</span>
                    </span>
                    <span className={filterStyles['category']}>
                        <input type="checkbox" value="Kardio" onChange={handleOnchange}/>
                        <span>Kardio</span>
                    </span>
                    <span className={filterStyles['category']}>
                        <input type="checkbox" value="Jóga" onChange={handleOnchange}/>
                        <span>Jóga</span>
                    </span>
                    <span className={filterStyles['category']}>
                        <input type="checkbox" value="Zumba" onChange={handleOnchange}/>
                        <span>Zumba</span>
                    </span>
                    <span className={filterStyles['category']}>
                        <input type="checkbox" value="Osobný tréner" onChange={handleOnchange}/>
                        <span>Osobný tréner</span>
                    </span>
                </div>
        </div>
        <LoadingIndicator isLoading={isLoading} />
        </> 
    );
}
 
export default Filter;