import React from 'react'
import firebase from 'firebase/app'
import "firebase/auth"
import {Link} from 'react-router-dom'

class Login extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.props.history.push("/dashboard")        
            }
        })
    }

    UserSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(document.getElementById('emailLogin').value, document.getElementById('passwordLogin').value).then(() =>{
            this.props.history.push("/dashboard")
            }).catch(error => {
                if("user-not-found" in error){
                    alert("El usuario no existe!")
                    document.getElementById('emailLogin').value = ""
                    document.getElementById('passwordLogin').value = ""
                }
            console.error(error.code + " => " + error.message)
        })
    }

    render(){
        return(
            <div className="loginViewComponentBody">
                <div className="loginViewComponentGradient">
                    <div className="loginViewComponentTop">
                        <Link to="/">
                            <div className="pandemicWhite"></div>
                        </Link>
                        <div></div>
                    </div>

                    <div className="loginViewComponentCenter">
                        <div className="LoginViewCenterImage"></div>
                        <h2 className="LandingViewCenterH1">Accede al contenido que la comunidad tiene para ofrecer</h2>
                        <div className="margin"></div>
                        
                        <input required id="emailLogin" type="email" placeholder="Correo electrónico" className="textInput"/>
                        <input required id="passwordLogin" type="password" placeholder="Contraseña" className="textInput"/>

                        <input type="submit" onClick={this.UserSignIn} value="Iniciar sesion" className="buttonRedLogin"/>
                    </div>

                    <div className="loginViewComponentFooter">
                        <Link to="/crear-cuenta">
                            <div className="loginViewComponentFooterDiv">No tenés cuenta? CREAR UNA AHORA</div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login