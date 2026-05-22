import { create } from "zustand";
import { persist } from "zustand/middleware"; 

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
}

interface EventState {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (id: number) => void;
}

export const useEventStore =
  create<EventState>()( 
    persist( 
      (set) => ({
        events: [],

        addEvent: (event) =>
          set((state) => ({
            events: [
              ...state.events,
              event,
            ],
          })),

        removeEvent: (id) =>
          set((state) => ({
            events:
              state.events.filter(
                (event) => event.id !== id
              ),
          })),
      }),
      {
        name: "event-storage", 
      }
    )
  );