import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function PDFUploader() {

    const [fileName, setFileName] = useState("");
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState("");

    const onDrop = useCallback(async (acceptedFiles) => {

        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];

        setFileName(file.name);
        setUploading(true);
        setStatus("");

        try {

            const formData = new FormData();

            formData.append("pdf", file);

            const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);

            setStatus("success");

        }

        catch (error) {

            console.error(error);

            setStatus("error");

        }

        finally {

            setUploading(false);

        }

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({

        accept: {

            "application/pdf": [".pdf"]

        },

        multiple: false,

        onDrop

    });

    return (

        <div className="pdf-uploader">

            <div
                {...getRootProps()}
                className="pdf-dropzone"
            >

                <input {...getInputProps()} />

                <div className="pdf-icon">
                    📄
                </div>

                <div>

                    <div className="pdf-title">

                        {
                            uploading
                                ? "Uploading..."
                                : isDragActive
                                    ? "Drop PDF Here"
                                    : "Upload Notes PDF"
                        }

                    </div>

                    <div className="pdf-subtitle">

                        {
                            uploading
                                ? "Please wait..."
                                : "Click here or Drag & Drop"
                        }

                    </div>

                </div>

            </div>

            {

                fileName && (

                    <div className="pdf-name">

                        📄 {fileName}

                    </div>

                )

            }

            {

                status === "success" && (

                    <div
                        style={{
                            color: "green",
                            marginTop: "8px",
                            fontWeight: "600"
                        }}
                    >

                        ✅ PDF Uploaded Successfully

                    </div>

                )

            }

            {

                status === "error" && (

                    <div
                        style={{
                            color: "red",
                            marginTop: "8px",
                            fontWeight: "600"
                        }}
                    >

                        ❌ Upload Failed

                    </div>

                )

            }

        </div>

    );

}

export default PDFUploader;