import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import {db, collection, getDocs, query, where } from "../firebase";
import "./history.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const pdfGeneration = (order) => {
  const doc = new jsPDF();

    const dateObj = new Date(order.orderTime.seconds * 1000);
    const formattedDate = dateObj.toLocaleDateString("en-GB");
  doc.setFontSize(13);
  doc.text("Receipt Download", 20, 20);
  doc.text(`Order Time: ${formattedDate|| "N/A"}`, 20, 30);
  doc.text(`Phone: ${order.phone || "N/A"}`, 20, 40);
  
  doc.text(`address: ${order.address || "N/A"}`, 20, 60);
  let x;
  const rows = order.items.map((item, i) => [
    i + 1,
    item.name,
    item.quantity,
    `₹${item.price}`,
    `₹${item.quantity * item.price}`,
    x=item.name
  ]);

  autoTable(doc, {
    startY: 50,
    head: [["#", "Item", "Quantity", "Price", "Subtotal"]],
    body: rows,
  });

  doc.save(`Order_${x}_${order.id}.pdf`);
};

const History = () => {
  const [items, setOrders] = useState([]);
  
    const [loading, setLoading] = useState(true);
const [login,setLogin]=useState(true);

  useEffect(() => {
    const fetchOrders=async()=>{
      const storedPhone=sessionStorage.getItem("phone")
      if (!storedPhone) {
        console.warn("No phone number found in sessionStorage");
        setLogin(false);
        setLoading(false)
        return;
      }
      setLogin(true);
      
      console.log(typeof storedPhone)
      const q=query(collection(db,"orders"),where("phone","==",storedPhone));
      const docs=await getDocs(q);
      setOrders(docs.docs.map(d=>({id:d.id,...d.data()})))
      setLoading(false);
    }
    
    fetchOrders()
  }, []);

  if (login&&loading) return <p style={{color:"white"}}>Loading items...</p>;
  return (
    <div className="History">
    {login?(<>
    <table>
        <thead>
          <tr><th>Name</th><th>Total Items</th><th>Download</th></tr>
        </thead>
        <tbody>
          {items.map((item, id) => (
            <tr key={id}>
              <td>{id+1}</td>
              <td>
                <ul>
                  {item.items.map((it, i) => (
                    <li key={i}>{it.name} x{it.quantity} @ ₹{it.price}</li>
                  ))}
                </ul>
              </td>
              <td><FaDownload onClick={()=>pdfGeneration(item)}  style={{cursor:"pointer"}} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>):(<>
    <p style={{textAlign:"center"}}>Please login to see History</p>
    </>)}
      
    </div>
  );
};

export default History;
