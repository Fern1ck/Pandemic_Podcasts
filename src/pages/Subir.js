import React from "react"
import firebase from "firebase"
import ConfigLogo from "../images/config.png"
import SignOut from "../pages/dashboard"
import {Link} from 'react-router-dom'
const ULID = require("ulid")

let cripto, file, storageRef, path, size
let date = new Date()
let dd = String(date.getDate()).padStart(2, '0')
let mm = String(date.getMonth() + 1).padStart(2, '0')
let aaaa = date.getFullYear()
let h1style = {color: "#FE515D"}
class Subir extends React.Component{
    state = {
        user: undefined,
        autor: undefined,
        name: ""
    }
    queryName = uid => {
        firebase.database().ref("users").child(uid).once(
            "value", GET => {
                this.setState({
                    autor: GET.child("nombre").val()
                })
            }
        )
    }

    onTextChanged = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
                if(user){
                    this.setState({user: user.uid})
                    this.queryName(user.uid)
                } 
            }
        )
    }

    handleChange = e => {
        cripto = ULID.ulid()

        file = e.target.files[0]
        let extension = file.name +''
        size = file.size
        extension.replace(/ +/g, "")
        storageRef = firebase.storage().ref(`users/${this.state.uid}/${this.state.uuid}/${cripto}/${extension}`)
        let fullpath = document.getElementById('upload').value

        let getPath

        if(fullpath)
        {
            getPath = fullpath + ''
            path =  getPath.split('\\')

            this.setState({
                file: true
            })
        }
        else{
            path[2] = 'sin nombre'
            this.setState({
                file: true
        })
        } 

    }

    handleClick = e =>{
        if(size <= 624288000){
        const task = storageRef.put(file)
        
        task.on('state_changed', snapshot =>{
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Progreso de subida: " + progress + "%")
            if(!snapshot){
                    alert('Oops! parece que ocurrió un error, intentalo más tarde')
            }
        }, error =>{
            alert('Oops! parece que ocurrió un error, intentalo más tarde')
        }, ()=>{
            task.snapshot.ref.getDownloadURL().then(url=>{
                let uri = {
                    name: this.state.name,
                    url: url,
                    uid: cripto,
                    autor: this.state.autor,
                    path: path[2].trim(),
                    date: `${dd}/${mm}/${aaaa}`,
                }

                firebase.database().ref('podcast').child(cripto).set(uri).then(
                    this.setState({
                        state: true,
                    }),
                    this.props.history.push("/dashboard")
                ).catch(()=>{
                    alert('Oops! parece que ocurrió un error, intentalo más tarde')
                })
        })
        })
        }else{
            alert('El archivo debe pesar menos de 5mb')
            window.location.reload()
        }
    }

    render(){
        return(
        <div className="dashboardComponentGradient">
            <div className="reproductorTop">
                    <Link to="/dashboard">
                        <div className="pandemicRed"></div>
                    </Link>
                    <img onClick={SignOut} alt="Cerrar Sesión" src={ConfigLogo} className="reproductorConfig"/>
                </div>
            <div id="progressbaron">
                <div id="uploadProgress">
                    <div id="uploadBar" ref="uploadBar"></div>
                </div>
            </div>
            <h1 style={h1style}>Sube tu podcast.</h1>
            <input onChange={this.onTextChanged} name="name" required type="text" placeholder="Nombre"/>
            <input id="upload" className="inputUpload" onChange={this.handleChange.bind(this)} type="file"/>
            <input type="button" onClick={this.handleClick} value="Subir"/>
            <div></div>
        </div>
        );
    }
}

export default Subir