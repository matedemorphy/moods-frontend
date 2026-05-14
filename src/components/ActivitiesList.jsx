import { useEffect, useState } from "react";

import "./ActivitiesList.css";

//import ActivityItem from "./ActivityItem";

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.ejemplo.com/usuarios");
        if (!response.ok) throw new Error("Error al obtener usuarios");
        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []); // Solo al montar

  return (
    <div>
      {/* <ul className="mood-list">
        {moods.map((mood) => (
          <ActivityItem
            key={mood.name}
            emoji={mood.emoji}
            name={mood.name}
            reason={mood.reason}
          />
        ))}
      </ul> */}
    </div>
  );
}
