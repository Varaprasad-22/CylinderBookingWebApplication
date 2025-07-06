import React, { useEffect, useState } from "react";
import { collection, getDocs } from "../firebase";
import { db } from "../firebase";
import "./admin.css"
function AdminDashboard({login}) {
  const [orders, setOrders] = useState([]);
  const [users,setUsers]=useState([]);
  useEffect(() => {
    const fetch=async()=>{
      const docs = await getDocs(collection(db,"orders"));
      setOrders(docs.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    fetch();
  }, []);
useEffect(() => {
    const fetch=async () => {
      const docs = await getDocs(collection(db,"users"));
      setUsers(docs.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    fetch();
  }, []);

  const logout=()=>{
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("phone");
    login(false);
  }
  return (
    <div>
      <div className="OrdersAdmin" style={{color:"white"}}>
      <h2>All Orders (Admin View)</h2>
      <table className="admin_table">
        <thead>
          <tr>
            <th>Phone</th>
            <th>Order Time</th>
            <th>Address</th>
            <th>Item</th>
            <th>Total price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
        <tr key={o.id}>
          <td>{o.phone}</td>
          <td> {o.orderTime?.toDate().toString()}</td>
          <td>{o.address.line1}, {o.address.city}</td>
          {o.items.map((it, i) => (
            <div key={i}>
              <td>{it.name} x{it.quantity}</td>
                
            </div>
          ))}
          {o.items.map((it, i) => (
          <td> ₹{it.price}</td> ))}
        </tr>
      ))}
        </tbody>
      </table>
      
      </div>
      <div className="UsersAdmin" style={{color:"white"}}>
         <h2>users</h2>
         <table className="admin_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((o) => (
        <tr key={o.id}>
          <td>{o.name} </td>
          <td>{o.phone}</td>
        </tr>
      ))}
          </tbody>
         </table>

      </div>
      <button  onClick={()=>logout()}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
