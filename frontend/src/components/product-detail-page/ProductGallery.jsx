import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProductGallery({ images = [] }) {
    const safeImages = Array.isArray(images) ? images : [];
    const [activeIndex, setActiveIndex] = useState(0);
    const [showZoom, setShowZoom] = useState(false);
    const [pos, setPos] = useState({ x: 50, y: 50 });

    const containerRef = useRef(null);

    if (!safeImages.length) return null;

    const prev = () =>
        setActiveIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
    const next = () =>
        setActiveIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));

    const handleMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setPos({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };

    return (
        <div className="relative">
            <div className="flex flex-col items-center">
                <div className="relative w-full lg:w-[420px] aspect-square flex items-center justify-center">
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2
                       z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100"
                    >
                        <FiChevronLeft size={20} />
                    </button>
                    <div
                        ref={containerRef}
                        className="relative w-[340px] aspect-square overflow-hidden bg-white"
                        onMouseEnter={() => setShowZoom(true)}
                        onMouseLeave={() => setShowZoom(false)}
                        onMouseMove={handleMove}
                    >
                        <img
                            src={safeImages[activeIndex]}
                            alt="product"
                            className="w-full h-full object-contain"
                            draggable={false}
                        />
                        {showZoom && (
                            <div
                                className="pointer-events-none absolute w-28 h-28
                           border border-black/40 bg-white/30"
                                style={{
                                    left: `calc(${pos.x}% - 56px)`,
                                    top: `calc(${pos.y}% - 56px)`,
                                }}
                            />
                        )}
                    </div>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2
                       z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100"
                    >
                        <FiChevronRight size={20} />
                    </button>
                </div>
                <div className="mt-4 flex gap-2">
                    {safeImages.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-14 w-14 border rounded-md overflow-hidden ${
                                i === activeIndex
                                    ? "border-black"
                                    : "border-gray-300 hover:border-gray-500"
                            }`}
                        >
                            <img
                                src={src}
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </button>
                    ))}
                </div>
            </div>
            {showZoom && (
                <div
                    className="hidden lg:block absolute top-0 left-[calc(100%+16px)]
                     z-50 w-[420px] aspect-square
                     border rounded-lg bg-white shadow-lg"
                >
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `url(${safeImages[activeIndex]})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "220%",
                            backgroundPosition: `${pos.x}% ${pos.y}%`,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
