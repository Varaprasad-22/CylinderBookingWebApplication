import React, { useState, useEffect } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FaWindowClose } from "react-icons/fa";
import './signIn.css';

function SignIn({ close }) {
  const [login, setLogin] = useState("login");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [univeralLogin,setUniversalLogin]=useState(true)
  const [userstate,setuserstate]=useState("user");
  useEffect(() => {
    if(!univeralLogin){
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "normal",
        callback: () => {},
        "expired-callback": () => {}
      });
    }}
  }, [univeralLogin]);

  // const handleSendOtp = async (e) => {
  //   e.preventDefault();
  //   if (phone.length !== 10) return alert("Enter valid 10-digit phone");

  //   const phoneNumber = `+91${phone}`;

  //   try {
  //     const res = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
  //     setConfirmation(res);
  //     setStep(2);
  //   } catch (err) {
  //     console.error(err);
  //     alert("OTP sending failed");
  //   }
  // };
const [cooldown, setCooldown] = useState(false);

const handleSendOtp = async (e) => {
  e.preventDefault();
  if (phone.length !== 10) return alert("Enter valid 10-digit phone");

  const phoneNumber = `+91${phone}`;

  if (cooldown) return alert("Please wait before trying again");

  try {
    setCooldown(true);
    const res = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    setConfirmation(res);
    setStep(2);
    setTimeout(() => setCooldown(false), 60000); // 1 min cooldown
  } catch (err) {
    console.error(err);
    alert("OTP sending failed: " + err.message);
    setCooldown(false);
  }
};

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return alert("Enter a valid OTP");

    try {
      const result = await confirmation.confirm(otp);
      const userPhone = result.user.phoneNumber;
      const id=userPhone.replace("+","");
      const docRef = doc(db, 'users', id);
      const docRef2=doc(db,'admins',id);
      const docSnap = await getDoc(docRef);
      const docSnap2=await getDoc(docRef2);

      if (login === 'signIn' && !docSnap.exists()&& !docSnap2.exists()) {
        await setDoc(docRef, { name, phone: userPhone });
        sessionStorage.setItem("role",userstate);
        sessionStorage.setItem("name",name);
      }
      if(docSnap.exists()){
        setuserstate("user");
       sessionStorage.setItem("role", userstate);
      }
      if(docSnap2.exists()){
        setuserstate("admin");
       sessionStorage.setItem("role", "admin");
      }
      sessionStorage.setItem("phone", phone.toString());
      alert(`${login === "signIn" ? "Sign-In" : "Login"} successful`);
      close();
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  useEffect(()=>{
    const x=sessionStorage.getItem("phone");
    if(x){
      setUniversalLogin(true)
    }else{
      setUniversalLogin(false);
    }
  },[])
  const reset = () => {
    setStep(1);
    setOtp("");
    setName("");
    setPhone("");
  };
const logout=()=>{
  sessionStorage.removeItem("phone");
  sessionStorage.removeItem("role");
  setUniversalLogin(false)
}
  return (
    <div className="login-signIn">
      
        {/* <FaWindowClose onClick={close} className="closeButton" /> */}
      {univeralLogin?(<div style={{height:"50px",width:"150px"}}>
      
        <FaWindowClose onClick={close} className="closeButton" style={{right:30}}/>
        
      <button onClick={()=>logout()}>LOGOUT</button>
      </div>):(<><div className="auth">
        <FaWindowClose onClick={close} className="closeButton" />
        <h2>{login === "login" ? "Login" : "SignIn"}</h2>
        <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}>
          {step === 1 && (
            <div className="login-form">
              {login === "signIn" && (
                <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
              )}
              <input type="tel" placeholder="Enter Phone Number" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <div id="recaptcha"></div>
              <button type="submit">Send OTP</button>
            </div>
          )}
          {step === 2 && (
            <div className="login-form">
              <input type="text" placeholder="Enter OTP" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} required />
              <button type="submit">Verify OTP</button>
              <p className="resendOtp">
                Didn't receive OTP? <span onClick={() => setStep(1)}>Resend</span>
              </p>
            </div>
          )}
        </form>
        <p>
          {login === "login" ? "Don't have an account? " : "Already a user? "}
          <span onClick={() => { setLogin(login === "login" ? "signIn" : "login"); reset(); }} style={{ cursor: "pointer" }}>
            {login === "login" ? "SignIn" : "Login"}
          </span>
        </p>
      </div></>)}
      
    </div>
  );
}

export default SignIn;
