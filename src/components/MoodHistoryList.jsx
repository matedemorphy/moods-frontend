import { useMemo } from "react";

import { useMoodEntriesQuery } from "../hooks/useMoodEntryQueries";
import { moods as moodCatalog } from "../data/moods";
import useMoodStore, { filterAndSortMoods } from "../stores/useMoodStore";

import "./MoodHistoryList.css";

function formatWhen(ts) {
  const n = Number(ts);
  if (!Number.isFinite(n)) return "—";
  return new Date(n).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function MoodHistoryList() {
  const {
    data: entries = [],
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useMoodEntriesQuery();

  const search = useMoodStore((s) => s.search);
  const filter = useMoodStore((s) => s.filter);
  const sort = useMoodStore((s) => s.sort);
  const setSearch = useMoodStore((s) => s.setSearch);
  const setFilter = useMoodStore((s) => s.setFilter);
  const setSort = useMoodStore((s) => s.setSort);

  const visible = useMemo(
    () => filterAndSortMoods(entries, { search, filter, sort }),
    [entries, search, filter, sort]
  );

  const errorMessage =
    error instanceof Error ? error.message : error ? String(error) : null;

  return (
    <section className="mood-history" aria-label="Mood history and filters">
      <div className="mood-history-toolbar">
        <label className="mood-history-field">
          <span className="mood-history-label">Search reasons</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by reason…"
            className="mood-history-input"
            autoComplete="off"
          />
        </label>

        <label className="mood-history-field">
          <span className="mood-history-label">Mood</span>
          <select
            className="mood-history-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All moods</option>
            {moodCatalog.map((m) => (
              <option key={m.name} value={m.name}>
                {m.emoji} {m.name}
              </option>
            ))}
          </select>
        </label>

        <label className="mood-history-field">
          <span className="mood-history-label">Sort</span>
          <select
            className="mood-history-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>

        <button
          type="button"
          className="mood-history-refresh"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {isPending ? (
        <p className="mood-history-status">Loading your moods…</p>
      ) : null}

      {isError ? (
        <div className="mood-history-banner mood-history-banner--error">
          <p>{errorMessage ?? "Could not load moods."}</p>
          <button type="button" onClick={() => refetch()}>
            Try again
          </button>
        </div>
      ) : null}

      {!isPending && !isError && visible.length === 0 ? (
        <p className="mood-history-empty">
          {entries.length === 0
            ? "No mood entries yet. Log one from the home screen."
            : "No entries match your filters."}
        </p>
      ) : null}

      {!isPending && !isError && visible.length > 0 ? (
        <ul className="mood-history-list">
          {visible.map((entry) => (
            <li key={entry.id} className="mood-history-card">
              <div className="mood-history-card-head">
                <span className="mood-history-emoji" aria-hidden="true">
                  {entry.emoji}
                </span>
                <span className="mood-history-mood">{entry.mood}</span>
                <time
                  className="mood-history-time"
                  dateTime={
                    Number.isFinite(Number(entry.createdAt))
                      ? new Date(Number(entry.createdAt)).toISOString()
                      : undefined
                  }
                >
                  {formatWhen(entry.createdAt)}
                </time>
              </div>
              <p className="mood-history-reason">{entry.reason}</p>
              {entry.username ? (
                <p className="mood-history-user">@{entry.username}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
