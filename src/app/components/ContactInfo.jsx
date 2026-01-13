"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/lib/axiosInstance";

const SERVICES = [
    "VRV System",
    "Centralized System",
    "HVAC System",
    "Duct & Ductable System",
];

const ContactInfo = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        message: "",
        service: "",
        reminder: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleCheckbox = (value) => {
        setForm((p) => ({
            ...p,
            reminder: p.reminder.includes(value)
                ? p.reminder.filter((v) => v !== value)
                : [...p.reminder, value],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);

        const toastId = toast.loading("Sending message...");

        try {
            const res = await axiosInstance.post("/api/contact", form);

            if (res.status === 201 || res.data?.success) {
                toast.success("Message sent successfully!", { id: toastId });

                setForm({
                    fullName: "",
                    phone: "",
                    email: "",
                    message: "",
                    service: "",
                    reminder: [],
                });
            }
        } catch (error) {
            toast.error("Failed to send message", { id: toastId });
        } finally {
            setLoading(false);
        }
    };




    return (
        <section className="w-full bg-white md:py-12 py-4">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
                    <p className="mt-2 font-semibold text-gray-600">
                        Get in touch with us for any queries or support.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-stretch">
                    <div className="overflow-hidden rounded-xl border h-[450px]">
                        <iframe
                            title="Office Location"
                            src="https://www.google.com/maps?q=Govindpuri,New%20Delhi&output=embed"
                            className="w-full h-full border-0"
                            loading="lazy"
                        />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Full Name"
                            name="fullName"
                            value={form.fullName}
                            placeholder="Enter your full name"
                            onChange={handleChange}
                        />

                        <Input
                            label="Phone Number"
                            name="phone"
                            value={form.phone}
                            placeholder="Enter your phone number"
                            onChange={handleChange}
                        />

                        <Input
                            label="Your Email"
                            name="email"
                            type="email"
                            value={form.email}
                            placeholder="Enter your email address"
                            onChange={handleChange}
                        />
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Select Service <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="service"
                                required
                                value={form.service}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                            >
                                <option value="">Select a service</option>
                                {SERVICES.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Your Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={3}
                                required
                                name="message"
                                placeholder="Write your message"
                                value={form.message}
                                onChange={handleChange}
                                className="mt-1 w-full resize-none rounded-md border border-gray-300 px-3 py-2"
                            />
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-semibold text-gray-700">
                                The mandated reminder that I am...{" "}
                                <span className="text-red-500">*</span>
                            </p>
                            <div className="flex flex-wrap gap-6">
                                {["Loved", "Special", "Resilient"].map((item) => (
                                    <label key={item} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={form.reminder.includes(item)}
                                            onChange={() => handleCheckbox(item)}
                                            className="h-4 w-4 border-gray-300"
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`rounded-md px-6 py-2 text-white transition
    ${loading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"}
  `}
                        >
                            {loading ? "Sending..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700">
            {label} <span className="text-red-500">*</span>
        </label>
        <input
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            {...props}
        />
    </div>
);

export default ContactInfo;
