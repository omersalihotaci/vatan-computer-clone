const features = [
    {
        title: "Kargo Bedava",
        desc: "1000 TL ve üzeri siparişlerde ücretsiz kargo",
    },
    {
        title: "Hızlı Teslimat",
        desc: "Ortalama 2 iş gününde teslimat",
    },
    {
        title: "Mağazadan Teslim",
        desc: "Siparişinizi mağazadan hemen alın",
    },
    {
        title: "Kolay İade",
        desc: "14 gün içinde iade/değişim",
    },
    {
        title: "Telefonla Sipariş",
        desc: "0850 222 56 56",
    },
];

export default function FooterFeatures() {
    return (
        <div className="border-b">
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {features.map((item, index) => (
                    <div key={index}>
                        <h4 className="font-semibold text-sm mb-1">
                            {item.title}
                        </h4>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
