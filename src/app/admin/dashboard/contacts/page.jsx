"use client";

import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [viewContact, setViewContact] = useState(null);

  /* FETCH */
  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contacts", { cache: "no-store" });
      const data = await res.json();
      setContacts(data.data || []);
    } catch {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  /* UPDATE */
  const saveUpdate = async (contact) => {
    try {
      const res = await fetch(`/api/contacts/${contact._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: contact.status,
          remark: contact.remark,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Contact updated");
      setEditingId(null);
      fetchContacts();
    } catch {
      toast.error("Update failed");
    }
  };

  /* DELETE */
  const deleteContact = async (id) => {
    if (!confirm("Delete this contact?")) return;

    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Deleted");
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Contact Requests</h1>

      <div className="overflow-x-auto">
        <table className="w-full font-medium border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Phone</th>
              <th className="border px-3 py-2">Service</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Remark</th>
              <th className="border px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact, index) => {
              const isEditing = editingId === contact._id;

              return (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">{contact.fullName}</td>
                  <td className="border px-3 py-2">{contact.phone}</td>
                  <td className="border px-3 py-2">{contact.service}</td>

                  {/* STATUS */}
                  <td className="border px-3 py-2">
                    {isEditing ? (
                      <select
                        value={contact.status}
                        className="border rounded px-2 py-1"
                        onChange={(e) =>
                          setContacts((prev) =>
                            prev.map((c) =>
                              c._id === contact._id
                                ? { ...c, status: e.target.value }
                                : c
                            )
                          )
                        }
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="capitalize">{contact.status}</span>
                    )}
                  </td>

                  {/* REMARK */}
                  <td className="border px-3 py-2">
                    {isEditing ? (
                      <input
                        value={contact.remark || ""}
                        className="border rounded px-2 py-1 w-full"
                        onChange={(e) =>
                          setContacts((prev) =>
                            prev.map((c) =>
                              c._id === contact._id
                                ? { ...c, remark: e.target.value }
                                : c
                            )
                          )
                        }
                      />
                    ) : (
                      <span className="text-gray-600">
                        {contact.remark || "—"}
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="border px-3 py-2 text-center space-x-3">
                    <button onClick={() => setViewContact(contact)}>
                      <FaEye />
                    </button>

                    {isEditing ? (
                      <button
                        className="text-green-600"
                        onClick={() => saveUpdate(contact)}
                      >
                        <FaSave />
                      </button>
                    ) : (
                      <button
                        className="text-blue-600"
                        onClick={() => setEditingId(contact._id)}
                      >
                        <FaEdit />
                      </button>
                    )}

                    <button
                      className="text-red-600"
                      onClick={() => deleteContact(contact._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {viewContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white max-w-lg w-full p-6 rounded-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setViewContact(null)}
              className="absolute top-3 right-3"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-4">Contact Details</h2>

            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {viewContact.fullName}</p>
              <p><b>Email:</b> {viewContact.email}</p>
              <p><b>Phone:</b> {viewContact.phone}</p>
              <p><b>Service:</b> {viewContact.service}</p>
              <p><b>Message:</b> {viewContact.message}</p>
              <p><b>Status:</b> {viewContact.status}</p>
              <p><b>Remark:</b> {viewContact.remark || "—"}</p>
            </div>

            {viewContact.updateHistory?.length > 0 && (
              <>
                <hr className="my-4" />
                <h3 className="font-semibold text-sm mb-2">
                  Last 5 Updates
                </h3>
                <ul className="space-y-2 text-sm">
                  {viewContact.updateHistory.map((h, i) => (
                    <li key={i} className="border p-3 rounded bg-gray-50">
                      <p><b>Status:</b> {h.status}</p>
                      <p><b>Remark:</b> {h.remark || "—"}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(h.updatedAt).toISOString().replace("T", " ").slice(0, 19)}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
