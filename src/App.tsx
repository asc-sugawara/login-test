//App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./views/Signin";
import Top from "./views/Top";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Signin />} />
        <Route path={`/Top`} element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
