import React from 'react'
import firebase from 'firebase/app'
import "firebase/auth"
import {Link} from 'react-router-dom'

class SignUp extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.props.history.push("/dashboard")        
            }
        })
    }
    
    Registrarse = () => {
      firebase.auth().createUserWithEmailAndPassword(document.getElementById("emailSignUp").value, document.getElementById("passwordSignUp").value).then(ok=>{

        let data = {
            nombre: document.getElementById("nameSignUp").value,
            email: document.getElementById("emailSignUp").value,
            uid: ok.user.uid
        }

        firebase.database().ref('users').child(ok.user.uid).set(data).then(ok=>{
            this.props.history.push("/dashboard")
        }).catch(error =>{
            console.error(error)
            alert("Hubo un error: " + error)
        })

    }).catch(error=>{
        console.error("Hubo un error:" + error)
})

    }
    handleRedirect = path =>{
        this.props.history.push(path)
    }

    render(){
        return(
            <div className="loginViewComponentBody">
                <div className="loginViewComponentGradient">
                    <div className="loginViewComponentTop">
                    <Link to="/">
                        <div className="pandemicWhite"></div>
                    </Link>
                        <input type="button" value="Iniciar sesión" className="LandingViewTopButton" onClick={this.handleRedirect.bind(this, '/iniciar-sesion')}/>   
                    </div>
                    <div className="loginViewComponentCenter">
                        <div className="LoginViewCenterImage"></div>
                        <h2 className="LandingViewCenterH1">Tus podcasts favoritos a 1 min de distancia</h2>
                        <div className="margin"></div>
                        
                        <input id="nameSignUp" required type="text" placeholder="Nombre" className="textInput"/>
                        <input id="emailSignUp" required type="email" placeholder="Correo electrónico" className="textInput"/>
                        <input id="passwordSignUp" required type="password" placeholder="Contraseña" className="textInput"/>
                        <input onClick= {this.Registrarse} type="button" value="Crear cuenta" className="buttonRedLogin"/>
                    </div>

                    <div className="loginViewComponentFooter">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp