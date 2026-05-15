import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import "./MoodsList.css";

import MoodItem from "./MoodItem";
import Reason from "./Reason";

import { moods as moodCatalog } from "../data/moods";
import { moodEntryKeys } from "../query/moodQueryKeys";
import { fetchMoodEntries } from "../services/moods";
import useMoodStore from "../stores/useMoodStore";

export default function MoodsList() {
  const queryClient = useQueryClient();

  const selectedMood = useMoodStore((s) => s.selectedMood);
  const toggleMoodSelection = useMoodStore((s) => s.toggleMoodSelection);

  useEffect(() => {
    void queryClient.prefetchQuery({
      queryKey: moodEntryKeys.all,
      queryFn: fetchMoodEntries,
    });
  }, [queryClient]);

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
