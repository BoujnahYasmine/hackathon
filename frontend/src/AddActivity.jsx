import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const AddActivity = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(props.isAuthenticated)
    if (!props.isAuthenticated)
      navigate("/login")
  }, [props.isAuthenticated])



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
      const response = await fetch("http://localhost:5000/api/activities", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Activity added successfully!");
        // Clear form
        setTitle("");
        setDescription("");
        setCity("");
        setType("");
        setImage(null);
      } else {
        setMessage(` Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Upload failed", error);
      setMessage(" Failed to upload activity");
    }
  };



  return (
    <><Navbar />
      <div className="px-4 py-12 bg-gradient-to-b from-blue-800 to-blue-700 min-h-screen">
        <div className="p-8 max-w-2xl mx-auto bg-white text-blue-900 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-extrabold mb-6 text-center">Add New Activity</h2>

          <form onSubmit={handleSubmit} className="space-y-5 font-semibold">
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1">City</label>
              <select
                className="w-full px-4 py-2 text-blue-900 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block mb-1">Activity Type</label>
              <select
                className="w-full px-4 py-2 text-blue-900 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <div className="mb-4">
              {/* <label className="block mb-1 font-medium text-sm text-gray-800">Image</label> */}
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Submit
            </button>

            {message && (
              <div className="mt-4 text-center text-md font-bold text-white bg-blue-600 px-4 py-3 rounded-lg shadow-lg animate-fade-in">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>

    </>
  );
};

export default AddActivity;
