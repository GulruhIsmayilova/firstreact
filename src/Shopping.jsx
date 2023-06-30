import axios from "axios";
import { useEffect, useState } from "react";

export default function Shopping({ username }) {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState({});
  const [showCart, setShowCart] = useState(false);

  const handleCheck = (event) => {
    setChecked({
      ...checked,
      ...{ [event.target.name]: event.target.checked },
    });
  };

  useEffect(() => {
    axios("/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  if (showCart) {
    return (
      <div>
        <ul>
          {products
            .filter((f) => checked[f.name])
            .map((product) => (
              <li key={product.name}>
                <input
                  checked={checked[product.name]}
                  type="checkbox"
                  name={product.name}
                  onChange={handleCheck}
                  id={product.name}
                />
                <label htmlFor={product.name}>{`${product.name}: $`}</label>
                <i>{`${product.price}`}</i>
              </li>
            ))}
        </ul>
        <button onClick={() => setShowCart(false)}>Back to shopping</button>
      </div>
    );
  }

  return (
    <div>
      <h6>Welcome {username}</h6>
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            <input
              checked={checked[product.name]}
              type="checkbox"
              name={product.name}
              onChange={handleCheck}
              id={product.name}
            />
            <label htmlFor={product.name}>{`${product.name}`}</label>
            <i>{`${product.price}`}</i>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowCart(true)}>Show cart</button>
    </div>
  );
}
