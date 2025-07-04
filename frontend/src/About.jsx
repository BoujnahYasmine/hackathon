import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Site</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to CoonectNet, your go-to platform for discovering exciting activities
          across various cities. Whether you're looking for cultural experiences, sports, or
          leisure activities, our site curates the best options to make your free time
          memorable and enjoyable.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our dedicated team is passionate about helping people connect with activities
          they love. 
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Example team members */}
          <div className="text-center">
            <h3 className="font-semibold">Yassmine</h3>
          </div>

          <div className="text-center">
            <h3 className="font-semibold">Akram</h3>
          </div>

          <div className="text-center">
            <h3 className="font-semibold">Adam</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
