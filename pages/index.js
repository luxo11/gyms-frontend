import homeStyles from "../styles/Home.module.css"
import Link from "next/link";
import Head from 'next/head'
import  { useSearch} from "../hooks/useSearch";

const Home = () => {
  const {handleSearch, handleAnchor, getRegionFlag, cities, isLoading, error} = useSearch()

  return (  
    <>
    <Head>
        <title>GYMS.SK | Vyhľadávač fitness centier na Slovensku.</title>
        <meta name="title" content="GYMS.SK | Vyhľadávač fitness centier na Slovensku." />
        <meta name="description" content="Nájdite fitko alebo posilku vo vašom okolí." />
        <meta name="keywords" content="fitka, gym, posilka, fitness, centrum, fitko" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="revisit-after" content="1 days" />
    </Head>
    <div className={homeStyles['home-wrapper']}>
            <div className={homeStyles['content-wrapper']}>
                <h2> VYHĽADAJTE FITNESS CENTRÁ VO VAŠOM OKOLÍ</h2>
                <div className="search-form-wrapper">
                    <div className="search-form">
                      <input 
                      type="text" 
                      placeholder="Zadajte lokalitu"
                      onChange={handleSearch}
                      />

                      {(isLoading || error) && (
                          <div className="indicators">
                              {isLoading && !error && <div className="loading">Načítavam zoznam</div> }
                              {error && !isLoading && <div className="error">{error}</div> }
                          </div>
                      )}

                      {cities && !isLoading && !error && (
                          <div className="search-list">
                              {cities.map((city) => (
                              <Link key={city._id} href={'/gyms/'+handleAnchor(city)}>
                                  <span className="city-wrapper">
                                      <span>{ city.name }</span>
                                      <span>{ getRegionFlag(city.region)}</span>
                                  </span>
                              </Link>
                          ))}                
                          </div>
                      )}
                </div>
            </div>
        </div>
    </div>
    </>
  );
}
 
export default Home;