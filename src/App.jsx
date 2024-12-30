import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import AnimatedRoutes from "./components/animatedRoutes.jsx";

const App = () => {
  return (
    <Router>
      <AnimatedRoutes/>
    </Router>
  );
};

export default App;
