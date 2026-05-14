//import { useParams } from 'react-router-dom';
import ActivitiesList from '../components/ActivitiesList';

export default function History() {
  //const { userId } = useParams();

  return (
    <div>
      <h1>History</h1>
      <ActivitiesList />
    </div>
  );
}