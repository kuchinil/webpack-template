import * as $ from 'jquery'
import Post from '@models/Post'
// import json from './assets/json'
// import xml from './assets/data'
// import csv from './assets/contacts'
import WebpackLogo from '@/assets/webpack-logo'

import React from 'react'
import {render} from 'react-dom'
import './babel'
import './styles/styles.css'
import './styles/styles.scss'

const post = new Post('webpack post title', WebpackLogo)

// $('pre').addClass('code2').html(post.toString())


const App = () => (
  <div class="container">
      <h1>Webpack Course</h1>

      <hr />

      <div class="logo"></div>

      <hr />

      <pre></pre>

      <hr />

      <div class="box">
        <h2>SCSS</h2>
      </div>
    </div>
)

render(<App />, document.getElementById('app'))





// console.log('JSON:', json);
// console.log("XML:", xml);

// console.log("CSV:", csv);