
import { SuccessIcon } from '../assets/SuccessIcon';
import { EmptyState } from '../EmptyState';

export default function SuccessComponent() {
  return (
    <EmptyState
      icon={<SuccessIcon />}
      title='🎉 Your application was sent!'
      description="Congratulations! You've taken the first step towards a rewarding career at Rakamin. We look forward to learning more about you during the application process."
    />
  );
}
