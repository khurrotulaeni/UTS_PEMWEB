import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useEventStore } from "../../../store/useEventStore";

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
}

export default function EventIndex() {

  const [events, setEvents] = useState<Event[]>([]);

  const removeEvent = useEventStore(
    (state) => state.removeEvent
  );

  // FETCH DATA DARI BACKEND
  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const response = await fetch(
          "http://localhost:3000/events"
        );

        const data = await response.json();

        setEvents(data);

      } catch (error) {

        console.log(
          "Gagal fetch event",
          error
        );

      }

    };

    fetchEvents();

  }, []);

  const handleDelete = async (id: number) => {

    if (
      confirm(
        "Yakin ingin menghapus event ini?"
      )
    ) {

      try {

        // DELETE KE BACKEND
        await fetch(
          `http://localhost:3000/events/${id}`,
          {
            method: "DELETE",
          }
        );

        // UPDATE UI
        const updatedEvents =
          events.filter(
            (event) => event.id !== id
          );

        setEvents(updatedEvents);

        removeEvent(id);

      } catch (error) {

        console.log(
          "Gagal hapus event",
          error
        );

      }

    }

  };

  return (
    <div className="bg-black text-white min-h-screen p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Events
        </h1>

        <Link
          to="/dashboard/event/create"
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          + Tambah Event
        </Link>

      </div>

      <div className="space-y-4">

        {events.length > 0 ? (

          events.map((event) => (

            <div
              key={event.id}
              className="bg-zinc-900 p-5 rounded-lg flex justify-between items-center"
            >

              <div>

                <h2 className="text-xl font-semibold mb-2">
                  {event.name}
                </h2>

                <p className="text-sm text-gray-400">
                  {event.date}
                </p>

                <p className="text-sm text-gray-400 mb-2">
                  {event.location}
                </p>

                <p className="text-gray-300">
                  {event.description}
                </p>

              </div>

              <button
                onClick={() =>
                  handleDelete(event.id)
                }
                className="bg-red-600 px-4 py-1.5 rounded hover:bg-red-700 transition"
              >
                Hapus
              </button>

            </div>

          ))

        ) : (

          <p className="text-gray-400">
            Belum ada event
          </p>

        )}

      </div>

    </div>
  );
}