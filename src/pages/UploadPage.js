import axios from "axios";
import React, { useState } from "react";
import { Alert, ProgressBar, Spinner } from "react-bootstrap";
import HeaderTitle from "../components/HeaderTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Player } from "video-react";
import "../../node_modules/video-react/dist/video-react.css"; // import css

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState();
  const [progress, setProgress] = useState();
  const [fight, setFight] = useState();
  const [videos, setVideos] = useState();

  const [error, setError] = useState();
  const { fight_id } = useParams();

  const getFightDetails = () => {
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/fight/${fight_id}`,
    })
      .then((response) => {
        setFight(response.data);
      })
      .catch((response) => {
        setFight(undefined);
      });
  };
  const getFightVideos = () => {
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/uploads/${fight_id}`,
    })
      .then((response) => {
        setVideos(response.data);
      })
      .catch((response) => {
        setVideos(undefined);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", selectedFiles[0]);
    formData.append("id", fight_id);
    setError("");

    axios
      .post(
        "http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }
      )
      .then(function (response) {
        console.log(response);
        toast(response.data.message);
        setProgress(undefined);
        getFightVideos();
        return response.data;
      })
      .catch((error) => {
        const { code } = error?.response?.data;
        setProgress(undefined);

        switch (code) {
          case "FILE_MISSING":
            setError("Please select a file before uploading!");
            toast("Please select a file before uploading!");
            break;
          case "INVALID_FILE":
            setError("Please valid video file!");
            toast("Please valid video file!");

            break;
          default:
            setError("Sorry! Something went wrong. Please try again later");
            break;
        }
      });
  };
  getFightDetails();
  getFightVideos();
  return (
    <div className="container mt-3">
      <ToastContainer />
      <HeaderTitle title="Video Uploads" />

      <div class="card my-3">
        <div class="card-header fw-bold ">Fight Details</div>
        <div class="card-body">
          {fight !== undefined && (
            <table className="table">
              <tr>
                <td className="fw-bold text-uppercase">
                  <span className="badge bg-primary m-1">COLOUR CODE</span>
                  {fight.boxer.name}
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-uppercase">
                  <span className="badge bg-danger m-1">COLOUR CODE</span>
                  {fight.opponent.name}
                </td>
              </tr>
              <tr>
                <td className="fw-bold">{fight.description}</td>
              </tr>
            </table>
          )}
        </div>
      </div>

      <div class="card">
        <div class="card-header fw-bold ">Videos</div>

        <div class="card-body">
          {error && (
            <Alert variant="danger" className="fw-bold">
              {error}
            </Alert>
          )}
          {!error && progress && (
            <React.Fragment>
              <Spinner className="mx-auto" animation="border" />
              <ProgressBar
                striped
                animated
                now={progress}
                label={`${progress}%`}
              />
            </React.Fragment>
          )}

          {!progress && (
            <form
              method="post"
              enctype="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div class="mb-3">
                <label for="formFile" class="form-label fw-bold">
                  Upload Video
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  name="file"
                  onChange={(e) => {
                    setSelectedFiles(e.target.files);
                  }}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary fw-bold text-uppercase"
              >
                SUBMIT
              </button>
            </form>
          )}
          <div className="row">
            {videos &&
              videos.map((video) => {
                return (
                  <div className=" col-lg-4 m-1">
                    <Player
                      className="my-3"
                      playsInline
                      poster="/assets/poster.png"
                      src={`http://127.0.0.1:3333/uploads/${video.name}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
