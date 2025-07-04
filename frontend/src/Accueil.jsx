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

  if (loading)
    return (
      <p className="text-center mt-10 text-blue-800 font-semibold">
        Loading activities...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-bold">
        Error loading activities: {error}
      </p>
    );

  const limitedActivities = activities.slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-blue-900 font-bold">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] shadow-[0_0_80px_rgba(0,0,0,1)] mb-12">
        <img
          src="https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1600&q=80"
          alt="Travel and Summer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-75 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-xl">
            Discover Amazing Activities
          </h1>
          <p className="text-white text-lg max-w-3xl font-medium drop-shadow-lg">
            Explore thrilling adventures and cultural experiences across
            Morocco. Plan your perfect summer escape today!
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {limitedActivities.map(({ _id, title, description, city, type, image }) => (
          <div
            key={_id}
            className="bg-white border rounded-xl shadow-[0_0_30px_rgba(0,0,0,1)] hover:shadow-[0_0_40px_rgba(0,0,0,0.9)] transition overflow-hidden"
          >
            <img
              src={`http://localhost:5000/uploads/${image}`}
              alt={title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-900 mb-2">{title}</h2>
              <p className="text-blue-800 mb-2 line-clamp-3 font-medium">
                {description}
              </p>
              <p className="text-sm text-blue-600">
                <strong>City:</strong> {city}
              </p>
              <p className="text-sm text-blue-600">
                <strong>Type:</strong> {type}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center pb-16">
        <button
          onClick={() => navigate("/activities")}
          className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition shadow-lg"
        >
          Show More Activities
        </button>
      </div>
    </div>
  );
};

export default Accueil;

