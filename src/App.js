import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/fetchData", {
        method: "POST",
        headers: new Headers({
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        }),
        body: `name=${name}&date=${date}`,
      });
      let resJson = await res.json();

      console.log("response = ", resJson);

      if (res.status === 200) {
        setMessage(resJson.message);
      } else {
        setMessage("Invalid Input");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="date"
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Submit</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;
