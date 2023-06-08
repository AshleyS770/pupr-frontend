import App from './App.js'

// components (custom web components)
import './components/va-app-header'
import './components/va-haircut'
import './components/va-profileCard'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})