import { useRouter } from "next/router"
import paginationStyles from "../styles/Pagination.module.css"

const Pagination = ({itemsPerPage, totalItems, currentPage, setCurrentPage, region, city}) => {
    const pages = []
    const noPages = Math.ceil(totalItems / itemsPerPage)

    const router = useRouter()

    for(let i = 1; i <= noPages; i++) {
        pages.push(i)
    }
    return (  
        pages.length > 0 && 
        <ul className={paginationStyles['pagination-wrapper']}>
            {pages.map((page) => (
            <li key={page} className={page === currentPage ? paginationStyles['active'] : ''} onClick={() => {setCurrentPage(page); router.push(`/gyms/${region}/${city}/${page}`)}}>{page}</li>    
            ))}
        </ul>
            
    );
}
 
export default Pagination;