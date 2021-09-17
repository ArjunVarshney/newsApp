import React, { Component } from 'react'
import loader from './loader.gif'

export default class Spinner extends Component {
   render() {
      return (
        <div>
          <img src={loader} alt="loading" className="rounded mx-auto mt-5 d-block" />
        </div>
      );
   }
}
