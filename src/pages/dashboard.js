import React from 'react'
import {Link} from 'react-router-dom'
import firebase from "firebase"
import ConfigLogo from "../images/config.png"
import * as cardimg from "../images/card.png"


export const SignOut = () => {
    firebase.auth().signOut()
}

let array;
class Bottom extends React.Component{
    render(){
        return(
            <div className="bottomComponent">
                <div className="bottomComponentContainer">
                    <div></div>   
                    <Link to="/dashboard/subir">
                        <input type="button" value="+" className="botonDashboard"/>
                    </Link> 
                    <div></div>
                </div>
            </div>
        )
        }
}

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            podcast: [{
                autor: undefined,
                image: undefined, //url
                name: undefined,
                uid: undefined,
                audio: undefined //url
            }],
            loading: true,
            filter: ""
        }        
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(!user){
                this.props.history.push('/iniciar-sesion')
            }
        })

        firebase.database().ref('podcast').on('value', GET=>{
            array = []
            GET.forEach(snapshot =>{
                array.push(snapshot.val())
                this.setState(state =>({
                    podcast:array,
                    loading: false
                }));
            })
        })
    }

    handleChange = e =>{
        this.setState({filter: e.target.value})
            let input = this.state.filter.toLowerCase()
            let x = document.getElementsByClassName('cardBody'); 

            for (let i = 0; i < x.length; i++) {
                if (!x[i].innerHTML.toLowerCase().includes(input)) { 
                    x[i].style.display="none";
                } 
                else { 
                    x[i].style.display="flex";
                } 
            }
    }

    render(){
        return(
            <div className="dashboardComponentBody">
                <div className="dashboardComponentGradient">
                <div className="reproductorTop">
                    <Link to="/dashboard">
                        <div className="pandemicRed"></div>
                    </Link>
                    <img onClick={SignOut} alt="Cerrar Sesión" src={ConfigLogo} className="reproductorConfig"/>
                </div>
                    <div className="dashboardComponentGrid">
                        {this.state.podcast.map((GET,index)=>{
                            return (
                                <Link key={index} to={'/dashboard/escuchar/' + GET.uid}>
                                    <div key={index} className="cardBody" title={GET.name}>
                                        <img alt="Imagen del podcast" src={GET.image || cardimg} className="cardImg"/>
                                        <h3 className="cardText">{GET.name}</h3>
                                        <h6 className="cardText">{GET.autor}</h6>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div>
                    </div>
                    <Bottom />
                </div>
            </div>
        )
    }
}

export default Dashboard