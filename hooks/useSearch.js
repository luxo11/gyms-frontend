import { useState } from "react";

export const useSearch = () => {
    const [cities, setCities] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleAnchor = (city) => {
        let name = city.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/\s/g, '-')
        let region = city.region.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/\s/g, '-')
        return region+'/'+name
    }

    const getRegionFlag = (region) => {
        let flag = ''

        switch(region){
            case 'Bratislavský kraj':
                flag = 'BA kraj'
                break;
            case 'Trnavský kraj':
                flag = 'TT kraj'
                break;
            case 'Trenčiansky kraj':
                flag = 'TN kraj'
                break;  
            case 'Nitriansky kraj':
                flag = 'NR kraj'
                break;
            case 'Žilinský kraj':
                flag = 'ZA kraj'
                break;
            case 'Banskobystrický kraj':
                flag = 'BB kraj'
                break;  
            case 'Prešovský kraj':
                flag = 'PO kraj'
                break;  
            case 'Košický kraj':
                flag = 'KE kraj'
                break;
            default:
                flag = ''
        }
        return flag
    }

    const handleSearch = async (e) => {
        let city = e.target.value.normalize("NFD").replace(/\p{Diacritic}/gu, "")
        if (city.length < 3) {
            setCities(null)
            setError('Zadajte aspoň 3 znaky')
            return
        }
        setError(null)
        setIsLoading(true)
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/cities/' + city)
        const json = await response.json()

        if(!response.ok) {
            setCities(null)
            setError(json.error)
            setIsLoading(false)
        }

        if(response.ok) {
            setCities(json)
            setError(null)
            setIsLoading(false)
        }
    }

    return { handleSearch, handleAnchor, getRegionFlag, cities, isLoading, error}
}
 
