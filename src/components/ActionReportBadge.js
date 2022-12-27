import React from 'react'

export default function ActionReportBadge(outcomes, status, boxer,fight) {
  boxer = boxer === "main" ? (boxer = fight.boxer1) : fight.boxer2;
  const count =  outcomes.filter(
    (outcome) => outcome.outcome === status && outcome.boxer_id === boxer
  ).length;
  return (
    <span className="badge bg-primary m-1">
      {count}
    </span>
  );
}
