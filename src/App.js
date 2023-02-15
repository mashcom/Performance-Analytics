
import React, { Component } from "react";
import { BrowserRouter, BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import DashboardLayout from "./components/DashboardLayout";
import FightInfo from "./components/FightInfo";
import FightRecords from "./components/FightRecords";
import NewFight from "./components/NewFight";
import BoxersPage from "./pages/BoxersPage";
import CreateBoxer from "./pages/CreateBoxer";
import FightRecordingPage from "./pages/FightRecordingPage";
import InfoPage from "./pages/InfoPage";
import TargetPage from "./pages/TargetPage";
import ReportPage from "./pages/ReportPage";
import { Upload } from "react-bootstrap-icons";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/Login";
import UsersPage from "./pages/UsersPage";


const App = () => {
  const [user, setUser] = React.useState(null);
//setUser(null)
  const ProtectedRoute = ({ user, children }) => {
    //setUser({ id: '1', name: 'robin' } );
   // setUser(JSON.parse(localStorage.getItem("user")));
    const logged_user = localStorage.getItem("user");
    if (!logged_user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };


  return (
    <BrowserRouter>
      <React.Fragment>

        <DashboardLayout>
          <Routes>
            <Route exact path="/" element={<ProtectedRoute user={user}><FightRecords /></ProtectedRoute>} />
            <Route exact path="/fight" element={<ProtectedRoute user={user}><NewFight /></ProtectedRoute>} />
            <Route exact path="/record" element={<ProtectedRoute user={user}><FightRecords /></ProtectedRoute>} />
            <Route exact path="/record/:fight_id/:fighter_id" element={<ProtectedRoute user={user}><FightRecordingPage /></ProtectedRoute>} />
            <Route exact path="/info" element={<ProtectedRoute user={user}><InfoPage /></ProtectedRoute>} />
            <Route exact path="/boxer" element={<ProtectedRoute user={user}><BoxersPage /></ProtectedRoute>} />
            <Route exact path="/boxer/create" element={<ProtectedRoute user={user}><CreateBoxer /></ProtectedRoute>} />
            <Route exact path="/report/:fight_id" element={<ProtectedRoute user={user}><ReportPage /></ProtectedRoute>} />
            <Route exact path="/upload/:fight_id" element={<ProtectedRoute user={user}><UploadPage /></ProtectedRoute>} />
            <Route exact path="/user" element={<ProtectedRoute user={user}><UsersPage /></ProtectedRoute>} />
            <Route exact path="/login" element={<LoginPage />} />
          </Routes>
        </DashboardLayout>
      </React.Fragment>
    </BrowserRouter>
  );
}


export default App;
