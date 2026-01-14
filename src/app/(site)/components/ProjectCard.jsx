"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ title, slug, image }) {
    return (
        <Link href={`/projects/${slug}`}>
            <div className="group relative h-[320px] overflow-hidden rounded-xl shadow-md cursor-pointer">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold text-center opacity-0 group-hover:opacity-100 transition duration-300 px-4">
                        {title}
                    </h3>
                </div>

            </div>
        </Link>
    );
}
