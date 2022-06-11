import React from 'react'

import './App.scss'

import {
  getHome,
  getSong,
  getPlaylists,
  //... and many other services
} from "nhaccuatui-api-full";

const App = () => {
  getSong("SoaMoVlAX7lW").then((data) => console.log(data))
  return (
    <div>
      <h1>App</h1>
    </div>
  )
}

export default App