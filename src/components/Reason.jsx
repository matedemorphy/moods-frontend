import { useId, useState } from "react";

import { useCreateMoodEntryMutation } from "../hooks/useMoodEntryQueries";
import "./Reason.css";
import useNewMoodFlowStore from "../stores/useNewMoodFlowStore";

export default function Reason() {
  const fieldId = useId();

  const selectedMood = useNewMoodFlowStore((s) => s.selectedMood);
  const clearSelectedMood = useNewMoodFlowStore((s) => s.clearSelectedMood);

  const [text, setText] = useState("");

  const createMoodEntry = useCreateMoodEntryMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || !selectedMood) return;

    createMoodEntry.mutate(
      {
        "mood": {
          "name": selectedMood.name,
          "emoji": selectedMood.emoji,
          "reason": trimmed,
        }
      },
      {
        onSuccess: () => {
          clearSelectedMood();
          setText("");
        },
      }
    );
  };

  if (!selectedMood) return null;

  //const { name, emoji } = selectedMood;
  const isPending = createMoodEntry.isPending;
  const errorMessage =
    createMoodEntry.error instanceof Error
      ? createMoodEntry.error.message
      : createMoodEntry.error
        ? String(createMoodEntry.error)
        : null;

  return (
    <form className="reason-form" onSubmit={handleSubmit}>

      {errorMessage ? (
        <p className="reason-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

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
          disabled={isPending}
        />

        <button
          type="submit"
          className="reason-button"
          disabled={!text.trim() || isPending}
        >
          {isPending ? "Saving…" : "Submit"}
        </button>
      </div>
    </form>
  );
}
