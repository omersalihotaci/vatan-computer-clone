import { Link } from "react-router-dom";

const featuredProducts = [
    { id: 101, name: "iPhone 17" },
    { id: 102, name: "iPhone 17 Pro Max" },
    { id: 103, name: "iPhone 16" },
    { id: 104, name: "iPhone 16 Pro" },
    { id: 201, name: "Galaxy S25" },
    { id: 202, name: "Galaxy S25 Ultra" },
    { id: 203, name: "Galaxy Z Fold7" },
    { id: 204, name: "Galaxy Z Flip7" },
];

export default function FooterFeatured() {
    const leftColumn = featuredProducts.slice(0, 4);
    const rightColumn = featuredProducts.slice(4);

    return (
        <div>
            <h3 className="font-semibold mb-4">Öne Çıkan Ürünler</h3>

            <div
                className="grid grid-cols-2 gap-6 text-sm text-gray-600"
            >
                <ul className="space-y-2">
                    {leftColumn.map((product) => (
                        <li key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                {product.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="space-y-2">
                    {rightColumn.map((product) => (
                        <li key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                {product.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
