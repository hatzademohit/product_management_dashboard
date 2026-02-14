// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { ProductProvider } from './context/ProductContext';
import Dashboard from './pages/dashboard';
import { Header } from './components';

function App() {

  return (
    <ProductProvider>
      <Header />
      <Dashboard />
    </ProductProvider>
  )
}

export default App
