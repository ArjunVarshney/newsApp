import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            waitingTime={700}
            transitionTime={100}
            color="#f11946"
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <div className="container">
            <Switch>
              <Route exact path="/business">
                <News
                  progress={this.setProgress}
                  key="business"
                  pageSize={18}
                  category="business"
                  country="in"
                />
              </Route>
              <Route exact path="/entertainment">
                <News
                  progress={this.setProgress}
                  key="entertainment"
                  pageSize={18}
                  category="entertainment"
                  country="in"
                />
              </Route>
              <Route exact path="/">
                <News
                  progress={this.setProgress}
                  key="general"
                  pageSize={18}
                  category="general"
                  country="in"
                />
              </Route>
              <Route exact path="/health">
                <News
                  progress={this.setProgress}
                  key="health"
                  pageSize={18}
                  category="health"
                  country="in"
                />
              </Route>
              <Route exact path="/science">
                <News
                  progress={this.setProgress}
                  key="science"
                  pageSize={18}
                  category="science"
                  country="in"
                />
              </Route>
              <Route exact path="/sports">
                <News
                  progress={this.setProgress}
                  key="sports"
                  pageSize={18}
                  category="sports"
                  country="in"
                />
              </Route>
              <Route exact path="/technology">
                <News
                  progress={this.setProgress}
                  key="technology"
                  pageSize={18}
                  category="technology"
                  country="in"
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
