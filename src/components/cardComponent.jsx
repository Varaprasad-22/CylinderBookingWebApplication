import React, { useContext, useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { StoreContext } from "../context/StoreContextProvider";
import "./card.css";
const CardComponent = ({ id, name, prices = [], dec, sizes = [], img }) => {
  const { items, updateItem } = useContext(StoreContext);
  const count = items[id]?.count || 0;
  const selectedSize = items[id]?.selectedSize || sizes[0] || "";

  const [size, setSize] = useState(selectedSize);

  const [price, setPrice] = useState(() => {
    if (!Array.isArray(prices) || prices.length === 0) return 0;
    const index = sizes.indexOf(selectedSize);
    return prices[index] || prices[0];
  });

  useEffect(() => {
    if (!Array.isArray(prices) || prices.length === 0) return;
    const index = sizes.indexOf(size);
    setPrice(prices[index] || prices[0]);
  }, [size, sizes, prices]);


  const handleSize = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
    const index = sizes.indexOf(newSize);
    updateItem(id, { name, selectedSize: newSize, price: prices[index] || 0, count });
  };

  const increase = () => updateItem(id, { name, selectedSize: size, price, count: count + 1 });
  const decrease = () => count > 0 && updateItem(id, { name, selectedSize: size, price, count: count - 1 });

  return (
    <div className="Card">
      <div className="imageContainer">
        <img src={img} alt={name} className="image" />
        <div className="controll">
          <AiOutlineMinus onClick={decrease} />
          <span>{count}</span>
          <AiOutlinePlus onClick={increase} />
        </div>
      </div>
      <hr />
      <div className="cardDetails">
        <div className="card_data_align">
          <h3>{name}</h3>
          <p className="price">₹ {price}</p>
        </div>
        <p>{dec}</p>
        {sizes.length > 0 && (
          <select className="select_options" value={size} onChange={handleSize}>
            {sizes.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
