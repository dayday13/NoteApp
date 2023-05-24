import { useRef, useState } from "react";
import "responsiveCSS/ComponentsCSS/ImageUpload.css";

function UploadImage(props) {
  const [fileName, setFileName] = useState("No selected file");
  const textInput = useRef(null);

  return (
    <main>
      <form action="" onClick={() => textInput.current.click()}>
        <input
          ref={textInput}
          type="file"
          accept="image/*"
          className="input-field"
          id="input_image"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              const reader = new FileReader();
              reader.onload = (event) => {
                props.uploadImage(event.target.result);
              };
              reader.readAsDataURL(files[0]);
            }
          }}
        />

        {props.image ? (
          <img src={props.image} width={60} height={60} alt={fileName} />
        ) : (
          //change it to adjust the image
          <>
            <label>Browse image to upload</label>
          </>
        )}
      </form>
    </main>
  );
}

export default UploadImage;
