export function CartItemCard({ item }) {
    return (
        <div className="bg-white rounded-lg border p-4 flex gap-4">
            <img
                src={item.image}
                alt={item.productTitle}
                className="w-24 h-24 object-contain"
            />

            <div className="flex-1">
                <h3 className="font-medium">{item.productTitle}</h3>

                {item.attributes && (
                    <div className="text-sm text-gray-500">
                        {Object.entries(item.attributes).map(([k, v]) => (
                            <span key={k}>
                                {k}: {v}{" "}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-4 flex items-center gap-3">
                    <button className="border px-2">-</button>
                    <span>{item.quantity}</span>
                    <button className="border px-2">+</button>
                </div>
            </div>

            <div className="text-right">
                <p className="text-blue-900 font-semibold">
                    {item.totalPrice.toLocaleString("tr-TR")} TL
                </p>
                <button className="text-gray-400 mt-4">🗑</button>
            </div>
        </div>
    );
}
