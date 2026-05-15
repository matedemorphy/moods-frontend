import "./MoodItem.css";

export default function MoodItem({ emoji, name, isSelected, onSelect }) {
  return (
    <li className="mood-list-item">
      <button
        type="button"
        className={`mood-item${isSelected ? " mood-item--selected" : ""}`}
        onClick={onSelect}
        aria-pressed={isSelected}
        aria-label={`${name}, ${isSelected ? "selected" : "not selected"}`}
      >
        <span className="mood-item__emoji" aria-hidden="true">
          {emoji}
        </span>
        <span className="mood-item__name">{name}</span>
      </button>
    </li>
  );
}
