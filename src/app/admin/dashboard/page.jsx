"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function DashboardHome() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contacts", { cache: "no-store" });
        const data = await res.json();
        setContacts(data.data || []);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const stats = {
    total: contacts.length,
    pending: contacts.filter(c => c.status === "pending").length,
    confirmed: contacts.filter(c => c.status === "confirmed").length,
    completed: contacts.filter(c => c.status === "completed").length,
    cancelled: contacts.filter(c => c.status === "cancelled").length,
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">
          Overview of contact form submissions and their status
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Total Requests" value={stats.total} />
        <StatCard title="Pending" value={stats.pending} color="yellow" />
        <StatCard title="Confirmed" value={stats.confirmed} color="blue" />
        <StatCard title="Completed" value={stats.completed} color="green" />
        <StatCard title="Cancelled" value={stats.cancelled} color="red" />
      </div>

      {/* RECENT REQUESTS */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Contact Requests</h2>
          <Link
            href="/admin/dashboard/contacts"
            className="text-sm text-blue-600 hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Phone</th>
                <th className="border px-3 py-2">Service</th>
                <th className="border px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {contacts.slice(0, 5).map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{c.fullName}</td>
                  <td className="border px-3 py-2">{c.phone}</td>
                  <td className="border px-3 py-2">{c.service}</td>
                  <td className="border px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                        STATUS_COLORS[c.status]
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}

              {contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-gray-500"
                  >
                    No contact requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* SMALL REUSABLE CARD */
function StatCard({ title, value, color }) {
  const colorMap = {
    yellow: "bg-yellow-50 text-yellow-700",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div
      className={`rounded-lg p-4 shadow bg-white ${
        color ? colorMap[color] : ""
      }`}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
