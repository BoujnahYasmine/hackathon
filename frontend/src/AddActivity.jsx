import React, { useState } from "react";
import Navbar from "./Navbar";

const AddActivity = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const cities = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Fès",
    "Agadir",
    "Tanger",
    "Oujda",
    "Meknès",
    "Tétouan",
    "Essaouira",
  ];

  const activityTypes = [
    "Culture",
    "Aventure",
    "Plage",
    "Gastronomie",
    "Randonnée",
    "Bien-être",
    "Historique",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("type", type);
    formData.append("image", image);

    try {
      const response = await fetch("https://hackathon-44is.onrender.com/api/activities", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Activity added successfully!");
        // Clear form
        setTitle("");
        setDescription("");
        setCity("");
        setType("");
        setImage(null);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Upload failed", error);
      setMessage("❌ Failed to upload activity");
    }
  };

  return (
    <><Navbar />
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Activity</h2>

      {message && <div className="mb-4 text-center text-sm text-blue-600">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">City</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option value="">Select a city</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Activity Type</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select activity type</option>
            {activityTypes.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Image</label>
          <input
            type="file"
            className="w-full p-2 border rounded-lg"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default AddActivity;
