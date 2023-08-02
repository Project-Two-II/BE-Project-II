
import React, { useState, useEffect } from 'react';
import './Create.css';

const CreateChapter = () => {
  const [chapters, setChapters] = useState([{ id: 1, name: '', description: '' }]);

  useEffect(() => {
    if (chapters.length === 0) {
      
      setChapters([{ id: 1, name: '', description: '' }]);
    }
  }, [chapters]);

  const handleChapterNameChange = (index, e) => {
    const newChapters = [...chapters];
    newChapters[index].name = e.target.value;
    setChapters(newChapters);
  };

  const handleChapterDescriptionChange = (index, e) => {
    const newChapters = [...chapters];
    newChapters[index].description = e.target.value;
    setChapters(newChapters);
  };

  const handleAddChapter = () => {
    const newChapters = [...chapters];
    const newId = newChapters.length + 1;
    newChapters.push({ id: newId, name: '', description: '' });
    setChapters(newChapters);
  };

  const handleRemoveChapter = (index) => {
    const newChapters = [...chapters];
    newChapters.splice(index, 1);
    setChapters(newChapters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isConfirmed = window.confirm(`Are you sure you want to create the chapters?`);
    if (isConfirmed) {
      
      console.log('Submitted Chapters:');
      chapters.forEach((chapter) => {
        console.log(`Chapter ${chapter.id} - Name: ${chapter.name}, Description: ${chapter.description}`);
      });
      
      setChapters([{ id: 1, name: '', description: '' }]);
    }
  };

  return (
    <div className="formContainer">
      <form className="ipContainer" onSubmit={handleSubmit}>
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="chapterGroup">
            <div className="inputGroup">
              <label htmlFor={`chapterName${chapter.id}`}>Chapter Name:</label>
              <input
                name={`chapterName${chapter.id}`}
                id={`chapterName${chapter.id}`}
                value={chapter.name}
                onChange={(e) => handleChapterNameChange(index, e)}
                required
                placeholder="Enter Chapter Name"
              />
            </div>

            <div className="inputGroup">
              <label htmlFor={`chapterDescription${chapter.id}`}>Chapter Description:</label>
              <textarea
                name={`chapterDescription${chapter.id}`}
                id={`chapterDescription${chapter.id}`}
                value={chapter.description}
                onChange={(e) => handleChapterDescriptionChange(index, e)}
                required
                placeholder="Enter Chapter Description"
              />
            </div>

            {chapters.length > 1 && (
              <button type="button" className="removeBtn" onClick={() => handleRemoveChapter(index)}>
                Remove Chapter
              </button>
            )}
          </div>
        ))}

        <div className="buttonGroup">
          <button type="button" className="addBtn" onClick={handleAddChapter}>
            Add Chapter
          </button>

          <button className="btn createBtn" type="submit">
            Create Chapters
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChapter;
