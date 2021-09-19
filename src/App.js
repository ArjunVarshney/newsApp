import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from 'react'

export default class App extends Component {
  pageSize=18;
  render(){
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/business">
              <News key="business" pageSize={this.pageSize} category="business" country="in" />
            </Route>
            <Route exact path="/entertainment">
              <News key="entertainment" pageSize={this.pageSize} category="entertainment" country="in" />
            </Route>
            <Route exact path="/">
              <News key="general" pageSize={this.pageSize} category="general" country="in" />
            </Route>
            <Route exact path="/health">
              <News key="health" pageSize={this.pageSize} category="health" country="in" />
            </Route>
            <Route exact path="/science">
              <News key="science" pageSize={this.pageSize} category="science" country="in" />
            </Route>
            <Route exact path="/sports">
              <News key="sports" pageSize={this.pageSize} category="sports" country="in" />
            </Route>
            <Route exact path="/technology">
              <News key="technology" pageSize={this.pageSize} category="technology" country="in" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
  }
}