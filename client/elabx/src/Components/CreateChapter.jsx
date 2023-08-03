import React, { useState } from 'react';
import './Create.css';

const CreateChapter = () => {
  const [chapterName, setChapterName] = useState('');
  const [chapterDescription, setChapterDescription] = useState('');
  const [chapters, setChapters] = useState([]);

  const handleChapterNameChange = (e) => {
    setChapterName(e.target.value);
  };

  const handleChapterDescriptionChange = (e) => {
    setChapterDescription(e.target.value);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(`Are you sure you want to create the chapters for: ${chapterName}?`);
    if (isConfirmed) {
      console.log(`Submitted Chapter Name: ${chapterName}`);
      console.log('Submitted Chapters:');
      chapters.forEach((chapter) => {
        console.log(`Chapter ${chapter.id} - Name: ${chapter.name}, Description: ${chapter.description}`);
      });

      setChapterName('');
      setChapterDescription('');
      setChapters([]);
    }
  };

  return (
    <div className="formContainer">
      <form className="ipContainer" onSubmit={handleCreate}>
        <div className="inputGroup">
          <label htmlFor="chapterName">Chapter Name:</label>
          <input
            name="chapterName"
            id="chapterName"
            value={chapterName}
            onChange={handleChapterNameChange}
            required
            placeholder="Enter Chapter Name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="chapterDescription">Chapter Description:</label>
          <textarea
            name="chapterDescription"
            id="chapterDescription"
            value={chapterDescription}
            onChange={handleChapterDescriptionChange}
            required
            placeholder="Enter Chapter Description"
          />
        </div>

        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="chapterGroup">
            <div className="inputGroup">
              <label htmlFor={`chapterName${chapter.id}`}>Chapter Name:</label>
              <input
                name={`chapterName${chapter.id}`}
                id={`chapterName${chapter.id}`}
                value={chapter.name}
                disabled
              />
            </div>

            <div className="inputGroup">
              <label htmlFor={`chapterDescription${chapter.id}`}>Chapter Description:</label>
              <textarea
                name={`chapterDescription${chapter.id}`}
                id={`chapterDescription${chapter.id}`}
                value={chapter.description}
                disabled
              />
            </div>
          </div>
        ))}

        <div className="buttonGroup">
          <button className="btn createBtn" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChapter;