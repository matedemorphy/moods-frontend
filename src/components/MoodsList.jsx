import { useState } from 'react';

import './MoodsList.css';

import MoodItem from './MoodItem';
import Reason from './Reason';

import { moods } from '../data/moods';

export default function MoodsList() {
  const [selectedMood, setSelectedMood] =
    useState(null);

  const handleMoodItemSelect = (mood) => {
    setSelectedMood((prev) =>
      prev?.name === mood.name ? null : mood
    );
  };

  const handleReasonSubmit = (reason) => {
    console.log({
      mood: selectedMood,
      reason,
    });

    setSelectedMood(null);
  };

  const reasonProps = {
    onSubmit: handleReasonSubmit,
    moodName: selectedMood?.name,
    moodEmoji: selectedMood?.emoji,
  };

  return (
    <div>
      <ul className='mood-list'>
        {moods.map((mood) => (
          <MoodItem
            key={mood.name}
            emoji={mood.emoji}
            name={mood.name}
            isSelected={
              selectedMood?.name === mood.name
            }
            onSelect={() =>
              handleMoodItemSelect(mood)
            }
          />
        ))}
      </ul>

      <Reason {...reasonProps} />
    </div>
  );
}