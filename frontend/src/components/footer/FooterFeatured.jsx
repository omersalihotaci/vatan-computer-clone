import { Link } from "react-router-dom";

const featuredProducts = [
    { id: 19, name: "iPad A16" },
    { id: 1, name: "iPhone 17 Pro Max" },
    { id: 26, name: "MacBook Air" },
    { id: 15, name: "Honor Magic 7 Pro" },
    { id: 27, name: "MacBook Pro" },
    { id: 12, name: "Galaxy S24 Ultra" },
    { id: 32, name: "Huawei Matebook D16" },
    { id: 16, name: "Honor Magic V2" },
];

export default function FooterFeatured() {
    const leftColumn = featuredProducts.slice(0, 4);
    const rightColumn = featuredProducts.slice(4);

    return (
        <div>
            <h3 className="font-semibold mb-4">Öne Çıkan Ürünler</h3>

            <div
                className="grid grid-cols-2 gap-6 text-sm text-gray-600
                 [&_a]:cursor-pointer
                [&_a]:hover:underline"
            >
                <ul className="space-y-2">
                    {leftColumn.map((product) => (
                        <li key={product.id}>
                            <Link to={`/product/${product.id}`}>
                                {product.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="space-y-2">
                    {rightColumn.map((product) => (
                        <li key={product.id}>
                            <Link to={`/product/${product.id}`}>
                                {product.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
