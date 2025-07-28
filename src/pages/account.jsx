import { useEffect, useState } from "react";

function Account(){
    const x=sessionStorage.getItem("phone");
    const [login,setLogin]=useState(true);
    useEffect((e)=>{
    if(x){
        setLogin(true);
    }else{
        setLogin(false);
    }
    })
    const logout=async()=>{
        sessionStorage.removeItem("phone");
        
        setLogin(false);
    }
    return(
        <div>
            Account
            {login?(<>
            <p>Phone Number &nbsp; {`${x}`}</p>
            <button type="submit" onClick={()=>logout()}>LOGOUT</button>
            </>):(<>Please login</>)}
        </div>
    )
}
export default Account;