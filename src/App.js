import React from "react";
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MatchList from "./MatchList";
import MatchAdd from "./MatchAdd";
import { matchAddAll } from './actions';


class App extends React.Component {
  componentDidMount() {
    fetch('matches').then(function (res) {
      return res.json();
    }).then((data) => {
      this.props.dispatch(matchAddAll(data));
    });
  }

  render() {
    return (
      <div className="row d-flex justify-content-center container">
        <div className="col-md-8">
          <Provider store={this.props.store}>
            <Router>
              <Routes>
                <Route path="/" element={<MatchList />} />
                <Route path="/add" element={<MatchAdd />} />
              </Routes>
            </Router>
          </Provider>
        </div>
      </div>
    );
  }
}

export default connect()(App);
