import "./MoodItem.css";

export default function MoodItem({ emoji, name, isSelected, onSelect }) {
  return (
    <li
      className={`mood-item ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <span>{emoji}</span>
      <span>{name}</span>
    </li>
  );
}
