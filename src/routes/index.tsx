import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import CreateCleaning from '../pages/CreateCleaning';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-cleaning" element={<CreateCleaning />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
