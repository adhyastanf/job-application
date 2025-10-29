import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

export const useJobStore = create()(
  persist(
    (set, get) => ({
      jobs: [],
      jobConfig: null,
      selectedJob: null,
      loading: true,
      loadingConfig: true,

      fetchJobs: async () => {
        try {
          set({ loading: true });
          const res = await axios.get('/mock/jobs.json');
          set({ jobs: res.data.data, loading: false });
        } catch (error) {
          console.error('Failed to fetch jobs:', error);
          set({ loading: false });
        }
      },

      fetchJobConfig: async () => {
        try {
          set({ loadingConfig: true });
          const res = await axios.get('/mock/config.json');
          set({ jobConfig: res.data, loadingConfig: false });
        } catch (error) {
          console.error('Failed to fetch job config:', error);
          set({ loadingConfig: false });
        }
      },

      selectJob: (job) => set({ selectedJob: job }),
      addJob: (job) => set({ jobs: [...get().jobs, job] }),
    }),
    { name: 'job-storage' }
  )
);
