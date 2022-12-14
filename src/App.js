import "./App.scss";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";

function App() {
  const [advice, setAdvice] = useState("");
  const [id, setId] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async (id) => {
    const data = await axios
      .get(`https://api.adviceslip.com/advice/${id}`)
      .then((response) => response.data.slip.advice)
      .catch((error) => {
        console.log(error);
      });
    setAdvice(data);
    setLoading(false);
  };
  // console.log(fetchAdvice(129));
  const debounced = useCallback(
    debounce((nextValue) => fetchAdvice(nextValue), 500),
    []
  );

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
    if (id) {
      debounced(id);
      setLoading(true);
    }
  }, [id]);

  // useEffect(() => {
  //   fetchAdvice(id);
  // }, []);

  return (
    <div className="wrapper">
      <div className="random">
        <div className="advice">
          {!loading && <span>{advice}</span>}
          {loading && <FontAwesomeIcon className="loading" icon={faSpinner} />}
        </div>
        <div className="button">
          <button onClick={() => handleClick()}>RANDOM</button>
        </div>
      </div>
    </div>
  );
}

export default App;
