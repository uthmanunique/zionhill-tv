import React from 'react';

import './News.css'; // Import associated styles

// Documentaries section component
const News = ({ navOpen }) => {
  // Mock data for documentaries (replace with dynamic data later)
  const docData = [
    { id: 1, title: "Mission Stories | Africa", image: `${process.env.PUBLIC_URL}/doc-1.jpg` },
    { id: 2, title: "Church History | Roots", image: `${process.env.PUBLIC_URL}/doc-2.jpg` },
    { id: 3, title: "Faith Journeys | Testimonies", image: `${process.env.PUBLIC_URL}/doc-3.jpg` },
    { id: 4, title: "Nature and Faith | Creation", image: `${process.env.PUBLIC_URL}/doc-4.jpg` },
    { id: 5, title: "Revival Tales | Awakening", image: `${process.env.PUBLIC_URL}/doc-5.jpg` },
    { id: 6, title: "Global Outreach | Impact", image: `${process.env.PUBLIC_URL}/doc-6.jpg` },
    { id: 7, title: "Spiritual Leaders | Legacy", image: `${process.env.PUBLIC_URL}/doc-7.jpg` },
  ];

  return (
    <section className="documentaries">
      <h2 className="documentaries-title">News</h2>
      <div className={`documentaries-container ${navOpen ? 'nav-open' : ''}`}>
        <div className="documentaries-row">
          {docData.slice(0, Math.ceil(docData.length / 2)).map((doc) => (
            <div key={doc.id} className="documentary-frame">
              <div
                className="documentary-image"
                style={{ backgroundImage: `url(${doc.image})` }}
              />
              <p className="documentary-title">{doc.title}</p>
            </div>
          ))}
        </div>
        <div className="documentaries-row">
          {docData.slice(Math.ceil(docData.length / 2)).map((doc) => (
            <div key={doc.id} className="documentary-frame">
              <div
                className="documentary-image"
                style={{ backgroundImage: `url(${doc.image})` }}
              />
              <p className="documentary-title">{doc.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;