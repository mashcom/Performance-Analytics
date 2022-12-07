import React from "react";

export default function ActionOutcome() {
  return (
    <React.Fragment>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold" id="exampleModalLabel">
                Outcome
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h5 class="fw-bold text-muted">Target </h5>
              <div
                class="btn-group btn-group-lg"
                role="group"
                aria-label="Large button group"
              >
                <button type="button" class="btn btn-outline-dark">
                  Head
                </button>
                <button type="button" class="btn btn-outline-dark">
                  Body
                </button>
                <button type="button" class="btn btn-outline-dark">
                  Both
                </button>
              </div>

              <h5 class="fw-bold text-muted float-left my-3">Outcome</h5>
              <div
                class="btn-group btn-group-md col-lg-12"
                role="group"
                aria-label="Large button group"
              >
                <button type="button" class="btn btn-success">
                  Success
                </button>
                <button type="button" class="btn btn-danger">
                  Failed
                </button>
                <button type="button" class="btn btn-warning">
                  Partial Success
                </button>
                <button type="button" class="btn btn-default">
                  Unknown
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
