import React, {useState} from "react";
import Footer from "./Footer";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import AddActivity from "./AddActivity";
import CreateAccount from "./CreateAccount";
import ActivityList from "./ActivityList";
import Accueil from "./Accueil";
import NavAccueil from "./NavAccueil";
import List from "./List";
import About from "./About";
import Contact from "./Contact";

const Dashboard = () => (
  <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
    Welcome to your Dashboard!
  </div>
);

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <NavAccueil />
      <Routes>
        <Route path="/list" element={<List />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/activities" element={<ActivityList />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-activity" element={<AddActivity isAuthenticated={isAuthenticated} />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add a catch-all route for undefined pages */}
        <Route path="*" element={<div className="text-center mt-10 text-red-500">404 - Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
