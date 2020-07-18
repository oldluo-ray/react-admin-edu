import React, { Component } from 'react'

import Analysis from './Analysis'
import Scales from './Scales'
import Search from './Search'
import Static from './Static'

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Analysis />
        <Scales />
        <Search />
        <Static />
      </div>
    )
  }
}
