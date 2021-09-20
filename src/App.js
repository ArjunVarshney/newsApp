import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/business">
              <News key="business" pageSize={18} category="business" country="in" />
            </Route>
            <Route exact path="/entertainment">
              <News key="entertainment" pageSize={18} category="entertainment" country="in" />
            </Route>
            <Route exact path="/">
              <News key="general" pageSize={18} category="general" country="in" />
            </Route>
            <Route exact path="/health">
              <News key="health" pageSize={18} category="health" country="in" />
            </Route>
            <Route exact path="/science">
              <News key="science" pageSize={18} category="science" country="in" />
            </Route>
            <Route exact path="/sports">
              <News key="sports" pageSize={18} category="sports" country="in" />
            </Route>
            <Route exact path="/technology">
              <News key="technology" pageSize={18} category="technology" country="in" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
