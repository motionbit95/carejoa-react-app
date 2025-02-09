import React from "react";

function Event(props) {
  const evnets = [
    {
      id: 1,
      title: "이벤트1",
      desc: "이벤트1",
      image: "/images/event1.png",
    },
    {
      id: 2,
      title: "이벤트2",
      desc: "이벤트2",
      image: "/images/event2.png",
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {evnets.map((event) => (
        <div
          key={event.id}
          style={{
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <img src={event.image} alt={event.title} />
        </div>
      ))}
    </div>
  );
}

export default Event;
