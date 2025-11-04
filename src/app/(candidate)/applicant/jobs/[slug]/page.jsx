import ResumeCandidatePage from '@/components/pages/ResumeCandidatePage';
import axios from 'axios';

export default async function ResumePage() {
  const res = await axios.get('http://localhost:3001/mock/config.json');

  return <ResumeCandidatePage jobConfigs={res.data} />;
}
