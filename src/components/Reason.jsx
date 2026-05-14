import { useId, useState } from 'react';

import './Reason.css';

import useMoodStore from '../stores/useMoodStore';

export default function Reason() {
  const fieldId = useId();

  const selectedMood = useMoodStore((s) => s.selectedMood);
  const addMood = useMoodStore((s) => s.addMood);

  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || !selectedMood) return;

    addMood(trimmed);
    setText('');
  };

  if (!selectedMood) return null;

  const { name, emoji } = selectedMood;

  return (
    <form className="reason-form" onSubmit={handleSubmit}>
      <div className="reason-fields">
        <label htmlFor={fieldId} className="visually-hidden">
          Why are you feeling this way?
        </label>
        <input
          id={fieldId}
          type="text"
          value={text}
          placeholder="Why are you feeling this way?"
          onChange={(e) => setText(e.target.value)}
          className="reason-input"
          autoComplete="off"
        />

        <button
          type="submit"
          className="reason-button"
          disabled={!text.trim()}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
