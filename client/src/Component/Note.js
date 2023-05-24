function Note({ image, text }) {
  return (
    <div className="note">
      <div className="note_content">
        {text}
        {image && (
          <img src={image} width={100} height={100} alt="imageUpload" />
        )}
      </div>
    </div>
  );
}

export default Note;
