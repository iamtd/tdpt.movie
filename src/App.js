import 'swiper/swiper.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'

import { BrowserRouter } from 'react-router-dom'

import AppRoutes from './config/AppRoutes'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'

import './App.scss'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
