import React, { useEffect, useState } from "react";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editActivityId, setEditActivityId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    type: "",
    image: null,
  });

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

  useEffect(() => {
    fetchActivities();
  }, []);

  const deleteActivity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/activities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setActivities(activities.filter((act) => act._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (activity) => {
    setEditActivityId(activity._id);
    setFormData({
      title: activity.title,
      description: activity.description,
      city: activity.city,
      type: activity.type,
      image: null, // reset file input
    });
  };

  const cancelEdit = () => {
    setEditActivityId(null);
    setFormData({
      title: "",
      description: "",
      city: "",
      type: "",
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editActivityId) return;

    const updateData = new FormData();
    updateData.append("title", formData.title);
    updateData.append("description", formData.description);
    updateData.append("city", formData.city);
    updateData.append("type", formData.type);
    if (formData.image) updateData.append("image", formData.image);

    try {
      const res = await fetch(`http://localhost:5000/api/activities/${editActivityId}`, {
        method: "PUT",
        body: updateData,
      });
      if (!res.ok) throw new Error("Update failed");

      // Refresh list
      fetchActivities();
      cancelEdit();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Activities</h2>

      {activities.length === 0 && <p>No activities found.</p>}

      <div className="grid gap-6 md:grid-cols-2">
        {activities.map(({ _id, title, description, city, type, image }) => (
          <div
            key={_id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition relative"
          >
            <img
              src={`http://localhost:5000/uploads/${image}`}
              alt={title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">{title}</h3>
            <p className="mt-2 text-gray-700">{description}</p>
            <p className="mt-2 text-sm text-gray-500">
              <strong>City:</strong> {city}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Type:</strong> {type}
            </p>

            <button
              onClick={() => deleteActivity(_id)}
              className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>

            <button
              onClick={() => startEdit({ _id, title, description, city, type })}
              className="absolute top-4 right-20 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {editActivityId && (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
          <h3 className="text-xl font-bold mb-4">Edit Activity</h3>
          <form onSubmit={submitEdit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
              rows="3"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              accept="image/*"
              className="w-full"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ActivityList;
