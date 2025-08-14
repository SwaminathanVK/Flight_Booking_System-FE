import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKENDURL } from "../Config/Config";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${BACKENDURL}/api/v1/auth/getUser`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const rawTickets = res.data.tickets || [];

        console.log("Tickets from API:", rawTickets); // ✅ Debug

        // Sort by latest createdAt or timestamp
        const sorted = [...rawTickets].sort((a, b) => {
          const dateA = new Date(a.createdAt || a.timestamp);
          const dateB = new Date(b.createdAt || b.timestamp);
          return dateB - dateA;
        });

        setTickets(sorted);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="px-[30px] md:px-[30px] py-10 max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <p className="mb-4 text-gray-700">
        View more details and manage your booking in action
      </p>

      {loading ? (
        <p className="text-gray-600">Loading bookings...</p>
      ) : tickets.length > 0 ? (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Ticket ID</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="text-center">
                <td className="p-2 border">{ticket.uid}</td>
                <td className="p-2 border">
                  {ticket.createdAt || ticket.timestamp
                    ? new Date(
                        ticket.createdAt || ticket.timestamp
                      ).toLocaleString()
                    : "Not available"}
                </td>
                <td className="p-2 border">
                  <Link
                    to={`/ticket/${ticket.uid}`}
                    className="text-blue-500 underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;
