import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import FightInfo from "../components/FightInfo";

const FightRecordingPage = (props) => {
  let { fighter_id, fight_id } = useParams();

  return <FightInfo fight_id={fight_id} fighter_id={fighter_id} />;
};

FightRecordingPage.propTypes = {};

export default FightRecordingPage;
