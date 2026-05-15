import { useMemo } from "react";

import { useMoodEntriesQuery } from "../hooks/useMoodEntryQueries";
import { moods as moodCatalog } from "../data/moods";
import useMoodStore, { filterAndSortMoods } from "../stores/useMoodStore";

import "./MoodHistoryList.css";

function formatWhen(ts) {
  const n = Number(ts);
  if (!Number.isFinite(n)) return "—";
  return new Date(n).toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
}

function moodDateTimeAttr(createdAt) {
  const n = Number(createdAt);
  return Number.isFinite(n) ? new Date(n).toISOString() : undefined;
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

  const showTable = !isPending && !isError && visible.length > 0;

  return (
    <section className="mood-history" aria-label="Mood history and filters">
      <div className="mood-history__toolbar">
        <label className="mood-history__field">
          <span className="mood-history__label">Search reasons</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by reason…"
            className="mood-history__input"
            autoComplete="off"
          />
        </label>

        <label className="mood-history__field">
          <span className="mood-history__label">Mood</span>
          <select
            className="mood-history__select"
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

        <label className="mood-history__field">
          <span className="mood-history__label">Sort</span>
          <select
            className="mood-history__select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>

        <button
          type="button"
          className="mood-history__refresh"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {isPending ? (
        <p className="mood-history__status" role="status">
          Loading your moods…
        </p>
      ) : null}

      {isError ? (
        <div className="mood-history__banner mood-history__banner--error" role="alert">
          <p>{errorMessage ?? "Could not load moods."}</p>
          <button type="button" onClick={() => refetch()}>
            Try again
          </button>
        </div>
      ) : null}

      {!isPending && !isError && visible.length === 0 ? (
        <p className="mood-history__empty">
          {entries.length === 0
            ? "No mood entries yet. Log one from the home screen."
            : "No entries match your filters."}
        </p>
      ) : null}

      {showTable ? (
        <div className="mood-history__table-wrap">
          <table className="mood-history__table">
            <caption className="visually-hidden">
              Your mood log entries
            </caption>
            <thead>
              <tr>
                <th scope="col" className="mood-history__th mood-history__th--mood">
                  Mood
                </th>
                <th scope="col" className="mood-history__th mood-history__th--reason">
                  Reason
                </th>
                <th scope="col" className="mood-history__th mood-history__th--when">
                  When
                </th>
                <th scope="col" className="mood-history__th mood-history__th--user">
                  User
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((entry) => (
                <tr key={entry.id} className="mood-history__row">
                  <td
                    className="mood-history__cell mood-history__cell--mood"
                    data-label="Mood"
                  >
                    <div className="mood-history__mood-stack">
                      <span
                        className="mood-history__mood-emoji"
                        aria-hidden="true"
                      >
                        {entry.emoji}
                      </span>
                      <span className="mood-history__mood-name">
                        {entry.mood}
                      </span>
                    </div>
                  </td>
                  <td
                    className="mood-history__cell mood-history__cell--reason"
                    data-label="Reason"
                  >
                    <p className="mood-history__reason">{entry.reason}</p>
                  </td>
                  <td
                    className="mood-history__cell mood-history__cell--when"
                    data-label="When"
                  >
                    <time
                      className="mood-history__time"
                      dateTime={moodDateTimeAttr(entry.createdAt)}
                    >
                      {formatWhen(entry.createdAt)}
                    </time>
                  </td>
                  <td
                    className="mood-history__cell mood-history__cell--user"
                    data-label="User"
                  >
                    {entry.username ? (
                      <span className="mood-history__user">
                        @{entry.username}
                      </span>
                    ) : (
                      <span className="mood-history__user mood-history__user--empty">
                        —
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
