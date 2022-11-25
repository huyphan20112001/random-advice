import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [advice, setAdvice] = useState("");
  const [id, setId] = useState(1);

  const fetchAdvice = async (id) => {
    const data = await axios
      .get(`https://api.adviceslip.com/advice/${id}`)
      .then((response) => response.data.slip.advice)
      .catch((error) => {
        console.log(error);
      });
    setAdvice(data);
    console.log("data", data);
  };
  // console.log(fetchAdvice(129));

  const handleClick = () => {
    const min = 1;
    const max = 200;
    const idRandom = min + Math.floor(Math.random() * (max - min));
    console.log(idRandom);
    setId(idRandom);
  };
  // const handleSetAdvice = () => {
  //   setAdvice(fetchAdvice());
  // };

  // const { advice } = fetchAdvice();
  // console.log(fetchAdvice);

  useEffect(() => {
    id && fetchAdvice(id);
  }, [id]);

  useEffect(() => {
    fetchAdvice(id);
  }, []);

  return (
    <div className="wrapper">
      <div className="random">
        <div className="advice">
          <span>{advice}</span>
        </div>
        <div className="button">
          <button onClick={() => handleClick()}>RANDOM</button>
        </div>
      </div>
    </div>
  );
}

export default App;
