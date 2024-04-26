import { Flex, Box, Spinner } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/firebase"
import Navbar from "../../components/Navbar/Navbar"

export default function PageLayout({children}){
const {pathname} = useLocation()
const [user, loading, error] = useAuthState(auth)
const canRenderSidebar = pathname !== "/auth" && user;
const canRenderNavbar = !user && !loading && pathname !== "/auth";
const checkingUserIsAuth =  !user && loading
    
    if(checkingUserIsAuth) return <PageLayoutSpiner />

    return(
        <Flex flexDirection={canRenderNavbar ? "column" : "row"}>
            {canRenderSidebar ? (
                <Box w={{base:"70px", md:"240px"}}>
                    <Sidebar />
                </Box>
            ) : null}

            {canRenderNavbar ? <Navbar /> : null}

            <Box flex={1} w={{base:"calc(100% - 70px)", md:"calc(100% -240px)"}} mx={"auto"}>
                {children}
            </Box>
        </Flex>
    )
}

const PageLayoutSpiner = () => {
    return(
        <Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
            <Spinner size={"x1"} />

        </Flex>
    )
}