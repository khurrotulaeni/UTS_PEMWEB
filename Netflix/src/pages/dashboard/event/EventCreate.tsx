import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEventStore } from "../../../store/useEventStore"; 

export default function EventCreate() {
  const navigate = useNavigate();
  
  const addEvent = useEventStore((state) => state.addEvent);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      name,
      // Jika di interface useEventStore milik Princess butuh date, location, dll, biarkan seperti ini
      date,
      location,
      description,
    };

    // 3. Masukkan data ke Zustand Store agar angka di Dashboard otomatis bertambah!
    addEvent(newEvent);

    // KODE LOCALSTORAGE (Tetap dipertahankan jika Princess masih butuh backup di localStorage)
    const oldEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const updatedEvents = [...oldEvents, newEvent];
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    navigate("/dashboard/event");
  }

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Tambah Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Nama Event"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="text"
          placeholder="Tanggal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="text"
          placeholder="Lokasi"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <button
          type="submit"
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}