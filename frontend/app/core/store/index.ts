import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import { CityResponse } from '../types/City';


const STORAGE_VERSION = 1;


// Store type definition
type Store = {
  searches: CityResponse.City[];
  upsertSearch: (search: CityResponse.City) => void;
};

const useMyWeatherStore = create<Store>()(
  persist(
    immer((set, get) => ({
      searches: [],
      upsertSearch: (newSearch: CityResponse.City) => {
        set((state) => {
          const existingIndex = state.searches.findIndex(
            (c) => c.id === newSearch.id
          );

          if (existingIndex !== -1) {
            // Remove the existing search
            state.searches.splice(existingIndex, 1);
          }

          // Add the new search at the beginning
          state.searches.unshift(newSearch);

          // Keep only the latest 5 searches
          if (state.searches.length > 5) {
            state.searches = state.searches.slice(0, 5);
          }
        });
      },
    })),
    {
      name: 'my-weather-zustand',
      version: STORAGE_VERSION,
    },
  ),
);

export default useMyWeatherStore;