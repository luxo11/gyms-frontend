import Link from "next/link";
import Head from 'next/head'

const NotFound = () => {
    return ( 
        <>
        <Head>
            <title>Stránka neexistuje</title>
            <meta name="title" content="Stránka neexistuje" />
            <meta name="robots" content="index, follow" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        </Head>
        <Link href={'/'}>
            <h1>Stránka neexistuje</h1>
        </Link>
        </>
     );
}
 
export default NotFound;