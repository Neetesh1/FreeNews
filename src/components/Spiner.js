import React, { Component } from 'react'
import loading from '../images/preloader/128x128.gif'

export class Spiner extends Component {
  render() {
    return (
      <div className='text-center'>
          <img src={loading} alt="loading" />
      </div>
    )
  }
}

export default Spiner