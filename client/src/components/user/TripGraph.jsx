import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network";

const TripGraph = ({ selectedTrip }) => {
  const graphRef = useRef(null);
  const [popupData, setPopupData] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!graphRef.current || !selectedTrip) return;

    const { trip_sequence, places = [], restaurants = [], hotels = [] } = selectedTrip;

    const getImage = (type) => {
      switch (type) {
        case "place": return "/icons/location.png";
        case "restaurant": return "/icons/restaurant.png";
        case "hotel": return "/icons/hotel.png";
        default: return "/icons/default.png";
      }
    };

    let allLocations = [];

    if (trip_sequence?.length > 0) {
      allLocations = trip_sequence.map((item, i) => ({
        id: `ts-${i}`,
        label: item.name,
        image: getImage(item.type),
        shape: "image",
        size: 30,
        font: { size: 10, bold: true },
        originalData: item
      }));
    } else {
      allLocations = [
        ...places.map((name, i) => ({
          id: `p-${i}`,
          label: name,
          image: getImage("place"),
          shape: "image",
          size: 30,
          font: { size: 10, bold: true },
          originalData: { name, type: "place" }
        })),
        ...hotels.map((name, i) => ({
          id: `h-${i}`,
          label: name,
          image: getImage("hotel"),
          shape: "image",
          size: 30,
          font: { size: 10, bold: true },
          originalData: { name, type: "hotel" }
        })),
        ...restaurants.map((name, i) => ({
          id: `r-${i}`,
          label: name,
          image: getImage("restaurant"),
          shape: "image",
          size: 30,
          font: { size: 10, bold: true },
          originalData: { name, type: "restaurant" }
        })),
      ];
    }

    const edges = allLocations
      .map((loc, i) =>
        i < allLocations.length - 1 ? { from: loc.id, to: allLocations[i + 1].id } : null
      )
      .filter(Boolean);

    const graphData = { nodes: allLocations, edges };

    const options = {
      layout: { improvedLayout: true, hierarchical: false },
      edges: { color: "#000", arrows: "to" },
      physics: { enabled: true, stabilization: { iterations: 100 } },
    };

    const network = new Network(graphRef.current, graphData, options);

    network.on("click", function (params) {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const clickedNode = allLocations.find(node => node.id === nodeId);
        const info = clickedNode.originalData;

        const matchedData = trip_sequence?.find(item => item.name === info.name);

        const nodePosition = network.getPositions([nodeId])[nodeId];
        const domPosition = network.canvasToDOM(nodePosition);

        setPopupPos({
          top: domPosition.y - 60,
          left: domPosition.x - 75
        });

        setPopupData({
          name: info.name,
          type: info.type,
          date: matchedData?.date?.split("T")[0] || "N/A",
          budget: matchedData?.budget || "N/A"
        });
      } else {
        setPopupData(null);
      }
    });

  }, [selectedTrip]);

  return (
    <div className="relative">
      <h2 className="text-xl font-bold text-center my-4">Trip Graph</h2>
      <div ref={graphRef} style={{ height: "500px", border: "1px solid #ddd" }} />

      {popupData && (
        <div
          className="absolute bg-white shadow-lg border border-gray-300 rounded-lg p-3 w-48 z-10"
          style={{ top: popupPos.top, left: popupPos.left }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{popupData.name}</span>
            <button
              className="text-gray-500 hover:text-red-500 font-bold"
              onClick={() => setPopupData(null)}
            >
              ×
            </button>
          </div>
          <p className="text-sm"><strong>Type:</strong> {popupData.type}</p>
          <p className="text-sm"><strong>Date:</strong> {popupData.date}</p>
          <p className="text-sm"><strong>Budget:</strong> ₹{popupData.budget}</p>
        </div>
      )}
    </div>
  );
};

export default TripGraph;
