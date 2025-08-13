// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebase";
import CardComponent from "../components/cardComponent";
import "./home.css";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "items"));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(list);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p style={{color:"white"}}>Loading items...</p>;
  if (!items.length) return <p style={{color:"white"}}>No items available</p>;

  return (
    <div className="container">
      {items.map(item => (
        <CardComponent key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Home;
