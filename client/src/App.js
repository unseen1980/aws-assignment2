import React, { useRef, useState } from "react";
import axios from "axios";
import { Layout, Divider } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
  const [file, setFile] = useState(""); // storing the uploaded file
  // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accesing input element

  const handleChange = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accessing file
    console.log(file);
    setFile(file); // storing file
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file); // appending file
    axios
      .post("http://localhost:3001/upload", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res);
        getFile({
          name: res.data.name,
          path: res.data.path,
        });
        document.getElementById("fileInput").value = "";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Divider orientation="left">Upload your PNGs</Divider>
      <div className="file-upload" style={{ textAlign: "center" }}>
        <input type="file" id="fileInput" ref={el} onChange={handleChange} />
        {progress > 0 && (
          <div className="progessBar" style={{ width: progress }}>
            {progress}
          </div>
        )}
        <button onClick={uploadFile} className="upbutton">
          Upload
        </button>
        {data.path && (
          <>
            <br />
            <span>
              File uploaded at:{" "}
              <a href={data.path} target="_blank">
                {data.path}
              </a>{" "}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
