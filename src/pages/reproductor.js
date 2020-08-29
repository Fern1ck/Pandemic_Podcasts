import React from 'react'
import firebase from 'firebase'
import ConfigLogo from "../images/config.png"
import {Link} from 'react-router-dom'
import SignOut from "./dashboard"

let split = []
let audio = new Audio()

class Reproductor extends React.Component{
    state = {
        podcast: {
            autor: undefined,
            uid: undefined,
            name: undefined,
            image: undefined,
            url: undefined
        },
        currentTime: 0,
        duration: 0
    }

    componentDidMount(){
        split = window.location.href.split('/')
        this.getFile().then(() => {audio.addEventListener("timeupdate", e => {
            this.setState({currentTime: e.target.currentTime})
            document.getElementById('bar').style.width = ((this.state.currentTime % 60) / (this.state.duration % 60)) * 100 + "%"
        })})
    }

    getFile = async() =>{
        await firebase.auth().onAuthStateChanged(user=>{
            if(user){
                firebase.database().ref('podcast').once('value',GET=>{
                    this.setState({
                        podcast: GET.child(split[5]).val()
                    })
                }).then(()=>{
                    audio = new Audio(this.state.podcast.url)
                    this.setState({duration: audio.duration})
                })
            }
        })
    }

    handleClick = e =>{
        if(audio.paused){
            audio.play()
            this.setState({
                playing: true
            })

        }else{
            audio.pause()
            this.setState({
                playing: false
            })
        }
    }
    
    componentWillUnmount(){
        audio.pause();
    }

    render(){
        return(
            <div className="reproductorGradient" id="background">
                <div className="reproductorGeneral">
                    <div className="reproductorTop">
                        <Link to="/dashboard">
                            <div className="pandemicRed"></div>
                        </Link>
                        <img alt="Cerrar Sesión" onClick={SignOut} src={ConfigLogo} className="reproductorConfig"/>
                    </div>

                    <div className="reproductorCenter">
                        <img alt="Reproduciendo..." src={this.state.podcast.image} className="reproductorCenterImage"/>
                        <div className="reproductorCenterText"> 
                            <h6 className="LandingViewCenterH1">{this.state.podcast.autor}</h6>
                            <h3 className="LandingViewCenterH1">{this.state.podcast.name}</h3>
                        </div>

                        <div className="reproductorCenterProgressBar">
                            <div className="reproductorCenterProgressBarChild" id="bar"></div>
                        </div>
                        <input type="button" onClick={this.handleClick} className="reproductorCenterButton"/>
                    </div>

                    <div className="reproductorBottom">
                    </div>
                </div>
            </div>
        );
    }
}

export default Reproductor 