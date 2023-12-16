import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/fetch.css";
const Fetch = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const categorise = () => {
    const today = new Date();
    const this_week = new Date();
    this_week.setDate(this_week.getDate() + 7);

    const today_events = [];
    const this_week_events = [];
    const upcoming_events = [];

    events.forEach((e) => {
      const event_date = new Date(e.date);
      if (event_date.toDateString() === today.toDateString()) {
        today_events.push(e);
      } else if (event_date < this_week && event_date > today) {
        this_week_events.push(e);
      } else if (event_date > this_week) {
        upcoming_events.push(e);
      } else {
        console.log("date passed");
      }
    });
    return { today_events, this_week_events, upcoming_events };
  };
  const { today_events, this_week_events, upcoming_events } = categorise();
  return (
    <div>
      <h1 className="main-heading">Event Listing</h1>
      <div className="category-div">
        <h2 className="category-heading">Today's Events</h2>
        <ul className="horizontal-scroll-list">
          {today_events.map((event) => (
            <div className="card">
              <li key={event.id}>
                <h3 className="card-heading">{event.name}</h3>
                <p>Date: {new Date(event.date).toLocaleString()}</p>
                <p>Location: {event.location}</p>
                <p>{event.description}</p>
                <Link to={`/event/${event.id}`}>
                  <button className="details-btn">details</button>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>

      <div className="category-div">
        <h2 className="category-heading">This Week's Events</h2>
        <ul className="horizontal-scroll-list">
          {this_week_events.map((event) => (
            <div className="card">
              <li key={event.id}>
                <h3 className="card-heading">{event.name}</h3>
                <p>Date: {new Date(event.date).toLocaleString()}</p>
                <p>Location: {event.location}</p>
                <p>{event.description}</p>
                <Link to={`/event/${event.id}`}>
                  <button className="details-btn">details</button>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>

      <div className="category-div">
        <h2 className="category-heading">Upcoming Events</h2>
        <ul className="horizontal-scroll-list">
          {upcoming_events.map((event) => (
            <div className="card">
              <li key={event.id}>
                <h3 className="card-heading">{event.name}</h3>
                <p>Date: {new Date(event.date).toLocaleString()}</p>
                <p>Location: {event.location}</p>
                <p>{event.description}</p>
                <Link to={`/event/${event.id}`}>
                  <button className="details-btn">details</button>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Fetch;
