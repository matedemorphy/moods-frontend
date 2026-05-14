import { useState } from 'react';
import './Reason.css';

export default function Reason({
  moodName,
  onSubmit,
}) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onSubmit(text);

    setText('');
  };

  if (!moodName) return null;

  return (
    <form
      className='reason-form'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        value={text}
        placeholder='Why are you feeling this way?'
        onChange={(e) => setText(e.target.value)}
        className='reason-input'
      />

      <button
        type='submit'
        className='reason-button'
        disabled={!text.trim()}
      >
        Submit
      </button>
    </form>
  );
}