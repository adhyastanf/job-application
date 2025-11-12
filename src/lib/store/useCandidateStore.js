import axios from 'axios';
import { create } from 'zustand';

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
