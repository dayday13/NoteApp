import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import Axios from "axios";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function NewNote({ note, setNotes }) {
  const [inputText, setInputText] = useState(note.text);

  useEffect(() => {
    Axios.post("http://localhost:5000/editNote", {
      id: note.id,
      image: note.image,
      lastModified: note.lastModified,
      text: inputText,
    });
  }, [inputText]);

  const deleteNote = (id) => {
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== id));
    Axios.post("http://localhost:5000/deleteNote", {
      id: id,
    });
  };

  const changeSpecificNote = (image) => {
    Axios.post("http://localhost:5000/editNote", {
      id: note.id,
      image: image ?? null,
      lastModified: new Date().toISOString(),
      text: inputText,
    });
    setNotes((oldNotes) =>
      oldNotes?.map((element) => {
        if (element.id !== note.id) {
          return element;
        }
        return {
          ...element,
          text: inputText,
          image: image ?? null, //null if only wanted to edit the text without adding an image
          lastModified: new Date().toISOString(),
        };
      })
    );
  };

  return (
    <div className="note" style={{ background: "rgba(255, 255, 255, 0)" }}>
      <textarea
        value={inputText}
        placeholder="Add text ..."
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        maxLength="100"
        style={{ color: "black" }}
      ></textarea>

      <UploadImage
        image={note.image}
        uploadImage={(imageUrl) => {
          changeSpecificNote(imageUrl);
        }}
      />

      <DeleteForeverOutlinedIcon
        className="note_delete"
        onClick={() => deleteNote(note.id)}
        aria-hidden="true"
      ></DeleteForeverOutlinedIcon>
    </div>
  );
}

export default NewNote;
