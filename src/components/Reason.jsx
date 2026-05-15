import { useId, useState } from "react";

import { useCreateMoodEntryMutation } from "../hooks/useMoodEntryQueries";
import useMoodStore from "../stores/useMoodStore";

import "./Reason.css";

export default function Reason() {
  const fieldId = useId();

  const selectedMood = useMoodStore((s) => s.selectedMood);
  const username = useMoodStore((s) => s.username);
  const clearSelectedMood = useMoodStore((s) => s.clearSelectedMood);

  const [text, setText] = useState("");

  const createMoodEntry = useCreateMoodEntryMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || !selectedMood) return;

    createMoodEntry.mutate(
      {
        mood: selectedMood.name,
        emoji: selectedMood.emoji,
        reason: trimmed,
        username: username ?? "",
        createdAt: Date.now(),
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

  const { name, emoji } = selectedMood;
  const isPending = createMoodEntry.isPending;
  const errorMessage =
    createMoodEntry.error instanceof Error
      ? createMoodEntry.error.message
      : createMoodEntry.error
        ? String(createMoodEntry.error)
        : null;

  return (
    <form className="reason-form" onSubmit={handleSubmit}>
      <p className="reason-context" aria-live="polite">
        <span aria-hidden="true">{emoji}</span> You&apos;re feeling{" "}
        <span className="reason-mood-name">{name}</span>
      </p>

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
