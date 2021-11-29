import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/event");
      console.log(response.data);
    })();
  }, []);

  return <div className="App"></div>;
}

export default App;
