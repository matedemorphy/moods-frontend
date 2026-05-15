import "./MoodItem.css";

export default function MoodItem({ emoji, name, isSelected, onSelect }) {
  return (
    <li className="mood-list-item">
      <button
        type="button"
        className={`mood-item ${isSelected ? "selected" : ""}`}
        onClick={onSelect}
        aria-pressed={isSelected}
        aria-label={`${name}, ${isSelected ? "selected" : "not selected"}`}
      >
        <span aria-hidden="true">{emoji}</span>
        <span>{name}</span>
      </button>
    </li>
  );
}
