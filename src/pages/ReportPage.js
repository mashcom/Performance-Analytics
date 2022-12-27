import React from "react";
import { useParams } from "react-router-dom";
import ReportTable from "../components/ReportTable";

const ReportPage = () => {
  let { fight_id } = useParams();
  return <ReportTable fight_id={fight_id} />;
};
export default ReportPage;
