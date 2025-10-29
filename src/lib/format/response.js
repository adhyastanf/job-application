import { format } from 'date-fns';

export function formatJobResponse(formData, status = 'draft', idOverride = null) {
  const date = new Date();
  const formattedDate = format(date, 'd MMM yyyy');
  const id = idOverride || crypto.randomUUID();
  const slug = formData.jobName ? formData.jobName.toLowerCase().replace(/\s+/g, '-') : null;

  const fieldMap = {
    fullname: 'full_name',
    profile: 'photo_profile',
    gender: 'gender',
    domicile: 'domicile',
    linkedin: 'linkedin_link',
    email: 'email',
    phone: 'phone_number',
    birth: 'date_of_birth',
  };

  const fields = Object.keys(fieldMap)
    .filter((key) => formData[key] !== 'off')
    .map((key) => ({
      key: fieldMap[key],
      validation: { required: formData[key] === 'mandatory' },
    }));

  const badge = status === 'active' ? 'Active' : status === 'inactive' ? 'Inactive' : 'Draft';

  const started_on_text = status === 'active' ? `Started on ${formattedDate}` : status === 'inactive' ? `Deactivated on ${formattedDate}` : `Saved as draft on ${formattedDate}`;

  const job = {
    id,
    slug,
    title: formData.jobName || null,
    status,
    description: formData.jobDesc || null,
    type: formData.jobType || null,
    candidate: formData.candidate || null,
    fullname: formData.fullname || null,
    profile: formData.profile || null,
    gender: formData.gender || null,
    domicile: formData.domicile || null,
    linkedin: formData.linkedin || null,
    email: formData.email || null,
    phone: formData.phone || null,
    birth: formData.birth || null,
    salary_range: {
      min: formData.minSalary ? Number(formData.minSalary) : null,
      max: formData.maxSalary ? Number(formData.maxSalary) : null,
      currency: 'IDR',
      display_text: formData.minSalary && formData.maxSalary ? `${formatCurrency(formData.minSalary)} - ${formatCurrency(formData.maxSalary)}` : null,
    },
    list_card: {
      badge,
      started_on_text,
      cta: 'Manage Job',
    },
    application_form: {
      sections: [
        {
          title: 'Minimum Profile Information Required',
          fields,
        },
      ],
    },
  };

  return job;
}

export const formatCurrency = (value) => {
  if (!value) return '';
  return 'Rp' + parseInt(value).toLocaleString('id-ID');
};
