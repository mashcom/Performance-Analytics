import React from 'react'

export default function LoadingSpinner(title) {
  return (
    <center>
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
      <p>Processing please wait</p>
    </center>
  );
}
