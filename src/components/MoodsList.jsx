import './MoodsList.css';

import MoodItem from './MoodItem';
import Reason from './Reason';

import { moods as moodCatalog } from '../data/moods';
import useMoodStore from '../stores/useMoodStore';

export default function MoodsList() {
  const selectedMood = useMoodStore((s) => s.selectedMood);
  const toggleMoodSelection = useMoodStore((s) => s.toggleMoodSelection);

  return (
    <div>
      <ul className="mood-list">
        {moodCatalog.map((mood) => (
          <MoodItem
            key={mood.name}
            emoji={mood.emoji}
            name={mood.name}
            isSelected={selectedMood?.name === mood.name}
            onSelect={() => toggleMoodSelection(mood)}
          />
        ))}
      </ul>

      <Reason />
    </div>
  );
}
