import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Add } from "@mui/icons-material";
import Axios from "axios";
import Carousel from "react-elastic-carousel";
import NewNote from "Component/NewNote";
import NavigateBar from "Component/NavigateBar";
import "responsiveCSS/ComponentsCSS/Note.css";

function Edit() {
  const [notes, setNotes] = useState(null);

  //gets the saved notes from the database and adds them to the array
  useEffect(() => {
    Axios.post("http://localhost:5000/getNotes").then((res) => {
      if (res) {
        setNotes(res.data);
      } else {
        setNotes([]);
      }
    });
  }, []);

  const handleAdd = () => {
    setNotes((oldNotes) => [...oldNotes, { id: uuid() }]);
    notes?.map((note) =>
      Axios.post("http://localhost:5000/addNote", {
        id: note.id,
        image: note.image,
        lastModified: note.lastModified,
        text: note.text,
      }).then((res) => {
        if (res) {
          console.log(res);
        }
      })
    );
  };

  const breakPoints = [
    { width: 200, itemsToShow: 2 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 5 },
    { width: 5000, itemsToShow: 5 },
  ];

  return (
    <>
      <NavigateBar isLoggedIn={true} />
      <div className="carousel">
        <Carousel className="carousel" breakPoints={breakPoints}>
          {notes?.map((note) => (
            <NewNote key={note.id} note={note} setNotes={setNotes} />
          ))}
        </Carousel>
        <Add
          className="carousel"
          style={{ cursor: "pointer", height: "50px", width: "50px" }}
          onClick={handleAdd}
        />
      </div>
    </>
  );
}

export default Edit;
