import React from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [compname, setCompname] = useState("");
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [quant, setQuant] = useState("");
  const [price, setPrice] = useState("");
  const [press, setPress] = useState([]);
  const handle = () => setStep(2);
  const before = () => setStep(1);
  const after = () => setStep(3);
  const sub = name.length >= 3 && mail.includes("@") && compname.length >= 3;
  const not = service != "" && quant != "" && price != "";
  const con = () => console.log({ name, mail, compname, press });
  return (
    <div className="container">
      {step === 1 && (
        <div>
          <p>Name</p>
          <input
            className="inp"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <p>email</p>
          <input
            className="inp"
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          {!mail.includes("@") && <p>Enter a valid Email</p>}

          <p>Company Name</p>
          <input
            className="inp"
            type="text"
            value={compname}
            onChange={(e) => setCompname(e.target.value)}
          />

          <button
            className="btn"
            disabled={!sub}
            style={{ backgroundColor: !sub ? "gray" : "blue" }}
            onClick={handle}
          >
            next
          </button>
          <p>{step} of 3</p>
        </div>
      )}
      {step === 2 && (
        <div>
          <p>Service Input Name</p>
          <input
            className="inp"
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />

          <p>Quantity</p>
          <input
            className="inp"
            type="number"
            value={quant}
            onChange={(e) => setQuant(e.target.value)}
          />

          <p>Price</p>
          <input
            className="inp"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            className="btn"
            onClick={() => {
              setPress([...press, { service, price, quant }]);

              setService("");
              setPrice("");
              setQuant("");
            }}
            disabled={!not}
            style={{ backgroundColor: !not ? "gray" : "blue" }}
          >
            {" "}
            Add
          </button>

          <ul>
            {press.map((item, index) => (
              <li key={index}>
                service: {item.service} <br />
                Quantity: {item.quant} <br />
                Price: {item.price}
                <button onClick={() => setPress(press.filter((item, i) => i !== index ))}>Delete</button>
              </li>
            ))}
          </ul>

          <button
            className="btn"
            style={{ backgroundColor: !sub ? "gray" : "blue" }}
            onClick={before}
          >
            before
          </button>
          <button
            className="btn"
            style={{ backgroundColor: press.length < 1 ? "gray" : "blue" }}
            onClick={after}
            disabled={press.length < 1}
          >
            next
          </button>

          <p>{step} of 3</p>
        </div>
      )}

      {step === 3 && (
        <div>
          <p>Name: {name}</p>
          <p>email: {mail}</p>
          <p>company: {compname}</p>

          <ul>
            {press.map((item, index) => (
              <li key={index}>
                {item.service} X quantity: {item.quant} X price: {item.price} ={" "}
                {item.quant * item.price}
              </li>
            ))}
          </ul>

          <p className="total">
            Grand Total:
            {press.reduce(
              (accumulator, currentItem) =>
                accumulator + currentItem.quant * currentItem.price,
              0,
            )}
          </p>

          <button
            className="btn"
            style={{ backgroundColor: "blue" }}
            onClick={handle}
          >
            before
          </button>
          <button
            className="btn"
            style={{ backgroundColor: "blue" }}
            onClick={con}
          >
            submit
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
