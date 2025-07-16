import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import History from './components/History';
import { BudgetProvider } from './components/BudgetContext';
import Analytics from './components/Analytics';
import InstallPrompt from './components/InstallPrompt';

function App() {
  return (
    <BudgetProvider>
      <Router>
        <Navbar />
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/analytics" element={<Analytics />} /> 
        </Routes>
      </Router>
    </BudgetProvider>
  );
}

export default App;

