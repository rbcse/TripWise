import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";

const TripGraph = ({ places = [], restaurants = [], hotels = [] }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (!graphRef.current) return;

    // Function to get correct image for each type
    const getImage = (type) => {
      switch (type) {
        case "place":
          return "/icons/location.png"; // Place icon
        case "restaurant":
          return "/icons/restaurant.png"; // Restaurant icon
        case "hotel":
          return "/icons/hotel.png"; // Hotel icon
        default:
          return "/icons/default.png"; // Default icon
      }
    };

    // Prepare nodes with unique IDs and images
    const allLocations = [
      ...places.map((name, i) => ({
        id: `p-${i}`,
        label: name,
        image: getImage("place"),
        shape: "image", // Set shape as image
        size: 40, // Increase size for better visibility
        font: { size: 18, bold: true },
      })),
      ...restaurants.map((name, i) => ({
        id: `r-${i}`,
        label: name,
        image: getImage("restaurant"),
        shape: "image",
        size: 40,
        font: { size: 18, bold: true },
      })),
      ...hotels.map((name, i) => ({
        id: `h-${i}`,
        label: name,
        image: getImage("hotel"),
        shape: "image",
        size: 40,
        font: { size: 18, bold: true },
      })),
    ];

    // Create edges connecting sequential locations
    const edges = allLocations
      .map((loc, i) =>
        i < allLocations.length - 1 ? { from: loc.id, to: allLocations[i + 1].id } : null
      )
      .filter(Boolean);

    const graphData = { nodes: allLocations, edges };

    // Vis.js Network Options
    const options = {
      layout: { improvedLayout: true, hierarchical: false },
      edges: { color: "#000", arrows: "to" },
      physics: { enabled: true, stabilization: { iterations: 100 } },
    };

    // Render graph
    new Network(graphRef.current, graphData, options);
  }, [places, restaurants, hotels]);

  return (
    <div>
      <h2 className="text-xl font-bold text-center my-4">Trip Graph</h2>
      <div ref={graphRef} style={{ height: "500px", border: "1px solid #ddd" }} />
    </div>
  );
};

export default TripGraph;
