'use client';
import Image from "next/image";
import { galleryImages } from "@/app/(site)/data/services";

export default function AboutIntro() {
    return (
        <section className="w-full py-16 bg-white font-Montserrat">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-2">
                    {galleryImages.map((img, index) => (
                        <div
                            key={index}
                            className={`relative w-full h-[260px] overflow-hidden rounded-md ${index === 0 || index === 2 ? 'absolute' : ''} ${index === 0 ? 'top-0 right-0' : ''} ${index === 2 ? 'top-0 left-0' : ''}`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <p className="global-color font-semibold mb-2">
                        About GS Refrigeration Enterprises
                    </p>

                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-6">
                        Trusted HVACR Solutions Provider
                    </h2>

                    <div className="space-y-5 text-gray-600 font-medium text-[15px] leading-relaxed">
                        <p>
                            <strong>GS Refrigeration Enterprises (GSRE)</strong> is a closely held
                            company established by <strong>Mr. Deepak Kumar</strong> in the year
                            <strong> 2017</strong>. Since its inception, GSRE has been committed to
                            delivering reliable and high-quality solutions in the
                            <strong> H.V.A.C.R. (Heating, Ventilation, Air Conditioning & Refrigeration)</strong> industry.
                        </p>

                        <p>
                            GSRE operates at the edge of providing <strong>better-to-best services</strong>,
                            catering to the ever-increasing demand of the air conditioning industry.
                            Our approach combines technically sound designs with prompt, efficient,
                            and quality service support.
                        </p>

                        <p>
                            We provide <strong>complete and reliable air conditioning solutions</strong>
                            across all market segments — commercial, industrial, and institutional — 
                            ensuring optimal performance at the most economical cost without
                            compromising on quality.
                        </p>

                        <p>
                            Technically and commercially well-equipped, GSRE specializes in designing
                            and executing even the <strong>most complex HVACR systems</strong> as per
                            specific customer requirements, delivering maximum efficiency and total
                            customer satisfaction.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
