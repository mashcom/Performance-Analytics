import React from "react";
import ActionOutcome from "./ActionOutcome";

export default function Action(action) {
  console.log("ACTIONS");
  console.log(action.action.name);
   
  return (
    <React.Fragment>
     
        <button
          type="button"
          class="btn btn-outline-dark"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          {action.action.name}
        </button>
      
    </React.Fragment>
  );
}
