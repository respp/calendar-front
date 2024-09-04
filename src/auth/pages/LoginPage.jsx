import { useEffect } from 'react';
import { useAuthStore } from '../../hooks';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail : '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    regisetPassword: '',
    regisetPassword2: '',
}

export const LoginPage = () => {
    const { startLogin, errorMessage, startRegister } = useAuthStore()

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields )
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFormFields )

    const loginSubmit =( e )=>{
        e.preventDefault()
        startLogin({
            email: loginEmail,
            password: loginPassword
         })
    }

    const registerSubmit =( e )=>{
        e.preventDefault()
        if(registerPassword !== registerPassword2){
            return Swal.fire('error en registro', 'las contraseñas no coinciden', 'error')
        }

        startRegister({ 
            name: registerName, 
            email: registerEmail, 
            password: registerPassword, 
        })
    }

    useEffect(()=>{
        if ( errorMessage !== undefined ){
            Swal.fire('error en autenticacion', errorMessage, 'error')
        }
    }, [errorMessage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='registerPassword'
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                                
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='registerPassword2'
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}