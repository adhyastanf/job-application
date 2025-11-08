import axios from 'axios';
import { create } from 'zustand';

const transformCandidates = (rawCandidates = []) => {
  return rawCandidates.map((cand) => {
    const mapped = (cand.attributes || []).reduce((acc, attr) => {
      acc[attr.key] = attr.value || '-';
      return acc;
    }, {});

    return {
      id: cand.id,
      full_name: mapped.full_name || '-',
      email: mapped.email || '-',
      phone: mapped.phone || '-',
      domicile: mapped.domicile || '-',
      gender: mapped.gender || '-',
      linkedin_link: mapped.linkedin_link || '-',
      date_of_birth: mapped.date_of_birth || '-',
    };
  });
};

export const useCandidateStore = create((set) => ({
  candidates: [],
  loading: true,

  fetchCandidates: async () => {
    set({ loading: true });
    try {
      const res = await axios.get('/mock/candidate.json');
      set({ candidates: res.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
      set({ loading: false });
    }
  },
}));
