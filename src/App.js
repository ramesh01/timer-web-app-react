import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Timer from './components/timer/timer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Timer/>
      <Footer/>
    </div>
  );
}

export default App;
