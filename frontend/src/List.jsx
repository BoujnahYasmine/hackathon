import React, { useEffect, useState } from "react";

const List = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Fetch activities once
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/activities");
        if (!res.ok) throw new Error("Failed to fetch activities");
        const data = await res.json();
        setActivities(data);
        setFilteredActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Extract unique cities and types for filters
  const cities = [...new Set(activities.map((a) => a.city))];
  const types = [...new Set(activities.map((a) => a.type))];

  // Filter activities whenever filters/search change
  useEffect(() => {
    let filtered = activities;

    if (searchTerm) {
      filtered = filtered.filter((a) =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (cityFilter) {
      filtered = filtered.filter((a) => a.city === cityFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter((a) => a.type === typeFilter);
    }

    setFilteredActivities(filtered);
  }, [searchTerm, cityFilter, typeFilter, activities]);

  if (loading) return <p className="text-center mt-10">Loading activities...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Error loading activities: {error}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Activity Cards */}
      {filteredActivities.length === 0 ? (
        <p className="text-center text-gray-600">No activities found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredActivities.map(({ _id, title, description, city, type, image }) => (
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
      )}
    </div>
  );
};

export default List;
