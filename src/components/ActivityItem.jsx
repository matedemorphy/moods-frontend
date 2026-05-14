import "./ActivityItem.css";

export default function ActivityItem({ emoji, name, reason }) {
  return (
    <>
      <td>
        <span>{emoji}</span>
        <span>{name}</span>
      </td>
      <td>
        <span>{reason}</span>
      </td>
    </>
  );
}
