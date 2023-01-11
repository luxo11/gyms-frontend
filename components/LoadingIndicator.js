import loadingStyles from "../styles/Loading.module.css"

const LoadingIndicator = ({isLoading}) => {
    
    return ( 
        isLoading && (
            <div className={loadingStyles['loading-indicator']}>
                <img src="/loading_icon.svg"
                 alt="" />
                <h2>Načítavam</h2>
            </div>
        )
     );
}
 
export default LoadingIndicator;