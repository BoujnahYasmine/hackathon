import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Accueil = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/activities");
        if (!res.ok) throw new Error("Failed to fetch activities");
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading activities...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Error loading activities: {error}
      </p>
    );

  // Only show first 6 activities
  const limitedActivities = activities.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section with overlay text */}
      <section className="relative w-full h-96 rounded-lg overflow-hidden mb-12 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Activities Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-white text-5xl font-bold mb-4 drop-shadow-lg">
            Discover Amazing Activities
          </h1>
          <p className="text-white text-lg max-w-3xl drop-shadow-md">
            Explore a variety of activities in different cities and enjoy your free time with exciting adventures. Whether you like cultural, sports, or leisure activities, find what fits your taste here.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8">
        {limitedActivities.map(({ _id, title, description, city, type, image }) => (
          <div
            key={_id}
            className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={`http://localhost:5000/uploads/${image}`}
              alt={title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-700 mb-2 line-clamp-3">{description}</p>
              <p className="text-sm text-gray-500">
                <strong>City:</strong> {city}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Type:</strong> {type}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/activities")}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Show More Activities
        </button>
      </div>
    </div>
  );
};

export default Accueil;
