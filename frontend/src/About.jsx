import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Site</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to MyApp, your go-to platform for discovering exciting activities
          across various cities. Whether you're looking for cultural experiences, sports, or
          leisure activities, our site curates the best options to make your free time
          memorable and enjoyable.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our dedicated team is passionate about helping people connect with activities
          they love. From developers to designers and content creators, we work together
          to provide a seamless and engaging experience for our users.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Example team members */}
          <div className="text-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Jane Doe"
              className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
            />
            <h3 className="font-semibold">Jane Doe</h3>
            <p className="text-sm text-gray-500">Project Manager</p>
          </div>

          <div className="text-center">
            <img
              src="https://randomuser.me/api/portraits/men/35.jpg"
              alt="John Smith"
              className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
            />
            <h3 className="font-semibold">John Smith</h3>
            <p className="text-sm text-gray-500">Lead Developer</p>
          </div>

          <div className="text-center">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Alice Johnson"
              className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
            />
            <h3 className="font-semibold">Alice Johnson</h3>
            <p className="text-sm text-gray-500">UI/UX Designer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
