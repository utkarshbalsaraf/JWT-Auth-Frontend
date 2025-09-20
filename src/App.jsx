import { Route, Router, Routes } from "react-router-dom";
import Authentication from "./Authentication";
import Home from "./Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="h-screen w-screen">
      <Toaster
        toastOptions={{
          style: {
            backgroundColor:"#1e2939",
            color:"white"
          },
          duration:3000
        }}
      />
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
