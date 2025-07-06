import { useState } from "react"
import Account from "./account";
import About from "./about";
import Delivery from "./delivery";
import "./profile.css"
const Profile=()=>{
    //sections in react page
    const [section,setSection]=useState('account');

    const  handleChange=()=>{
        switch (section){
            case 'account':
                return <Account/>
            case 'about':
                return <About/>
            case 'delivery':
                return <Delivery/>
            default:
                return null;
        }
    }
    return(
        <div className="Profile_container">
            <div className="sections_menu" >
                <span className={section === "account" ? "active" : ""} onClick={()=>setSection("account")}>Account</span>
                <span className={section === "about" ? "active" : ""} onClick={()=>setSection('about')}>About</span>
                <span className={section === "delivery" ? "active" : ""} onClick={()=>setSection('delivery')}>Delivery Info</span>
            </div>
            <div className="section_content">
            {handleChange()}
            </div>
        </div>
    )
}

export default Profile
