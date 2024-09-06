import Footer from "./components/Footer"
import Home from "./components/Home"
import SubNav from "./components/Navigations/SubNav"
import { useEffect } from "react";
import io from "socket.io-client";
import { baseUrl } from "./api";


function App() {
  useEffect(() => {
    const socket = io(`${baseUrl}`); 

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("newContactMessage", (notification) => {
      console.log("New notification received:", notification);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    return () => {
      socket.disconnect();
    };
  }, []); 
  return (
   <div className="w-full h-fit">
    <SubNav />
    <Home />
    <Footer />
    </div>
  )
}

export default App
