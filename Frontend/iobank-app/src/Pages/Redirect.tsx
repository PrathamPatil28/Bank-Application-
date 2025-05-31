import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Redirect = () => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/dashboard')
    }, [])    
    return (
        <div className="flex items-center justify-center h-screen">
          
        </div>
    )

}

export default Redirect

