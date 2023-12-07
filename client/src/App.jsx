
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import Products from './pages/products'
import './App.scss'
import Home from './pages/home';
import Navigation from './components/Navigation';

function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </Router>
    </Provider>  
  )
}

export default App
