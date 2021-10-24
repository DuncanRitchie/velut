import { useRouter } from 'next/router'

//// Next.js’s router can only be used within a component function.
//// If this component is rendered, the page changes to `newUrl`.
const Redirect = ({newUrl}) => {
    const router = useRouter()
    if (router.asPath === newUrl
     || router.asPath === "/"+newUrl) {
        console.log("Cannot navigate to current URL")
    }
    else {
        router.push(encodeURI(newUrl))
    }
    return <></>
}

export default Redirect
