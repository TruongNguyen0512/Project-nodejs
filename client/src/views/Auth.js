import Loginform from '../components/auth/Loginform'
import Registerform from '../components/auth/Registerform'

const Auth  = ({authRoute}) => {

    return (
        <>
            LearnIt
           { authRoute === 'login' && <Loginforn/> }
           {authRoute === 'register'&& <Registerform/>}           
        </>   
    )
}

export  default Auth 