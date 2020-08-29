import React from 'react'
import {Link} from 'react-router-dom'
import '../master/master.css'
import firebase from "firebase"
import {firebaseConfig} from "../firebase/auth"

firebase.initializeApp(firebaseConfig);
let PandemicLogoStyle = {cursor: "default"}

class Landing extends React.Component{
    componentWillMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.props.history.push("/dashboard")        
            }
        })
    }

    render(){
        return(
            <div className="LandingViewComponentBody">
                <div className="LandingViewContainerGradient">
                    <div className="LandingViewTop">
                    <div style={PandemicLogoStyle} className="pandemicRed"></div>
                    <Link to="/iniciar-sesion">
                        <input type="button" value="Iniciar sesión" className="LandingViewTopButton"/>   
                    </Link>
                    </div>  

                    <div className="LandingViewCenter">
                        <h1 className="LandingViewCenterH1">Escuchanos, quedate en casa.</h1>
                        <div className="LandingViewCenterImage"></div>   

                        <Link to="/crear-cuenta">
                            <input type="button" value="Unete ahora mismo" className="buttonRedLogin "/>
                        </Link>

                        <h2 className="LandingViewCenterH1">Empezá a escuchar lo mejor de la comunidad</h2>
                        <div></div>
                        <h4 className="LandingViewCenterH1">De creadores para creadores</h4>
                    </div>

                    <div className="LandingViewFooter"></div>
                </div>
            </div>
        )
    }
}

export default Landing