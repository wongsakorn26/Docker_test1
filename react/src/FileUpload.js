import React, { useState, useEffect } from "react";


function FileUpload() {

    const [file, setFile] = useState();
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        const formdata = new FormData();

        const requestOptions = {
          method: "GET",
          body: formdata,
          redirect: "follow"
        };
        
        fetch("http://127.0.0.1:2000/call", requestOptions)
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
    }, [])

    const handleUpload = () => {
        if (!file) {
            console.error("No file selected");
            return;
        }
    
        const formData = new FormData();
        formData.append('image', file);
    
        fetch('http://localhost:2000/upload', {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.Status === 'Success') {
                console.log("Succeeded");
            } else {
                console.log("Failed");
            }
        })
        .catch(error => console.error(error));
    }
    
    
    return (
        <div className='container'>
            <input type='file' onChange={handleFile}/>
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}

export default FileUpload