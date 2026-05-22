import { useEffect } from "react";
import { useResetStoreOnUnmount } from "../hooks/useResetStoreOnUnmount";
import { useQueryClient } from "@tanstack/react-query";

import "./MoodsList.css";

import MoodItem from "./MoodItem";
import Reason from "./Reason";

import { moods as moodCatalog } from "../data/moods";
import { moodEntryKeys } from "../query/moodQueryKeys";
import { fetchMoodEntries } from "../services/moods";
import useNewMoodFlowStore from "../stores/useNewMoodFlowStore";

export default function MoodsList() {
  const queryClient = useQueryClient();

  const selectedMood = useNewMoodFlowStore((s) => s.selectedMood);
  const toggleMoodSelection = useNewMoodFlowStore((s) => s.toggleMoodSelection);

  useEffect(() => {
    void queryClient.prefetchQuery({
      queryKey: moodEntryKeys.all,
      queryFn: fetchMoodEntries,
    });
  }, [queryClient]);

  const reset = useNewMoodFlowStore((s) => s.reset);
  
  useResetStoreOnUnmount(reset);

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
