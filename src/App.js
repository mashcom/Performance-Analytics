
import React, { Component } from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

class App extends Component {
  render() {
    
    return (
      <BrowserRouter>
        <React.Fragment>
          <DashboardLayout>
            <Routes>
              <Route exact path="/fight" element={<NewFight />} />
              <Route exact path="/record" element={<FightRecords />} />
              <Route exact path="/record/:fight_id/:fighter_id" element={<FightRecordingPage />} />
              <Route exact path="/info" element={<InfoPage />} />
              <Route exact path="/boxer" element={<BoxersPage />} />
               <Route exact path="/boxer/create" element={<CreateBoxer />} />
            </Routes>
          </DashboardLayout>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
