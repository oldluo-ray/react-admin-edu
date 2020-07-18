import React, { Component } from 'react'

import Analysis from './Analysis'
import Scales from './Scales'

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Analysis />
        <Scales />
      </div>
    )
  }
}
