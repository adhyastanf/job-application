export function LabelForm({ label, required = false }) {
  if (required) {
    return <>{label.concat('*')}</>;
  }

  return <>{label}</>;
}

export function formatCurrency(value) {
  if (!value) return '';
  return 'Rp' + parseInt(value).toLocaleString('id-ID');
}
