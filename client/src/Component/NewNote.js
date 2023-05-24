import { useState } from "react";
import UploadImage from "./UploadImage";
import Axios from "axios";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function NewNote({ note, setNotes }) {
  const [inputText, setInputText] = useState(note.text);

  const deleteNote = (id) => {
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== id));
    Axios.post("http://localhost:5000/deleteNote", {
      id: id,
    });
  };

  const changeSpecificNote = (image, text) => {
    Axios.post("http://localhost:5000/addNote", {
      id: note.id,
      image: image,
      lastModified: new Date().toISOString(),
      text: text,
    });
    setNotes((oldNotes) =>
      oldNotes?.map((element) => {
        if (element.id !== note.id) {
          return element;
        }
        return {
          ...element,
          text: text,
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
          changeSpecificNote(note.image, e.target.value);
        }}
        maxLength="100"
        style={{ color: "black" }}
      ></textarea>

      <UploadImage
        image={note.image}
        uploadImage={(imageUrl) => {
          changeSpecificNote(imageUrl, inputText);
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
