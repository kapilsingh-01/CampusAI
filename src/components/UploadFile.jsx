import { useState } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../firebase/firebase";

function UploadFile({ onUploadComplete }) {

    const [uploading, setUploading] = useState(false);

    async function handleFileUpload(event) {

        const file = event.target.files[0];

        if (!file) return;

        setUploading(true);

        try {

            const fileName =

                Date.now() + "_" + file.name;

            const storageRef = ref(

                storage,

                "notes/" + fileName

            );

            await uploadBytes(

                storageRef,

                file

            );

            const downloadURL =

                await getDownloadURL(

                    storageRef

                );

            onUploadComplete({

                fileName: file.name,

                fileURL: downloadURL

            });

        }

        catch (error) {

            console.error(error);

            alert("File upload failed.");

        }

        setUploading(false);

    }

    return (

        <div className="upload-box">

            <input

                type="file"

                accept=".pdf,.png,.jpg,.jpeg"

                onChange={handleFileUpload}

            />

            {

                uploading &&

                <p>

                    Uploading...

                </p>

            }

        </div>

    );

}

export default UploadFile;