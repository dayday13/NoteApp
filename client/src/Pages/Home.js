import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import Carousel from "react-elastic-carousel";
import Note from "Component/Note";
import NavigateBar from "Component/NavigateBar";
import "CSS/ComponentsCSS/Note.css";
import "CSS/Home.css";

function Home() {
  const location = useLocation();
  const isLoggedIn = location.state?.is_logged_in;
  const [notes, setNotes] = useState(null);

  //gets the saved notes and adds them to the array
  useEffect(() => {
    Axios.get("http://localhost:5000/getNotes").then((res) => {
      if (res) {
        setNotes(res.data);
      } else {
        setNotes([]);
      }
    });
  }, []);

  const breakPoints = [
    { width: 200, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1000, itemsToShow: 5 },
  ];

  return (
    <>
      <NavigateBar isLoggedIn={isLoggedIn} />

      <Carousel className="carousel" breakPoints={breakPoints}>
        {notes?.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            image={note.image}
            setNotes={setNotes}
            is_admin={false}
          />
        ))}
      </Carousel>
    </>
  );
}

export default Home;
