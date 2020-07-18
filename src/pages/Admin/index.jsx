import React, { Component } from 'react'

import Analysis from './Analysis'
import Scales from './Scales'
import Search from './Search'

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Analysis />
        <Scales />
        <Search />
      </div>
    )
  }
}
