import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from '../services'
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch()

    const startLogin = async({ email, password })=>{
        console.log({email, password})
        dispatch( onChecking() )

        try {
            const { data } = await calendarApi.post('/auth',{ email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( onLogin({ name:data.name, uid:data.uid }) )

        } catch (error) {
            dispatch( onLogout('credenciales incorrectas') )
            setTimeout(()=>{
                dispatch( clearErrorMessage() )
            }, 10)

        }
    }

    const startRegister = async({ name, email, password })=>{
        dispatch( onChecking() )

        try {
            console.log({ name, email, password })
            const { data } = await calendarApi.post('/auth/new',{ name, email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( onLogin({ name:data.name, uid:data.uid }) )


        } catch (error) {
            console.log(error.response.data)
            dispatch( onLogout('credenciales incorrectas') )
            setTimeout(()=>{
                dispatch( clearErrorMessage() )
            }, 10)

        }

    }

  return {
    // Propiedades
    status, 
    user, 
    errorMessage,
    
    //Métodos
    startLogin,
    startRegister
  }
}
