import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteCartItem } from "../../hooks/useCartApi";

export function CartItemCard({ item }) {
    const deleteCartItem = useDeleteCartItem();
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

                <div className="mt-4 flex justify-between items-center w-24 h-10 border border-gray-400 rounded text-lg">
                    <button className=" px-2 text-2xl">-</button>
                    <span>{item.quantity}</span>
                    <button className=" px-2 text-2xl">+</button>
                </div>
            </div>

            <div className="text-right">
                <p className="text-blue-900 font-semibold">
                    {item.totalPrice.toLocaleString("tr-TR")} TL
                </p>
                <button
                    onClick={() => deleteCartItem.mutate(item.cartItemId)}
                    className="text-gray-800 text-xl mt-4">
                    <RiDeleteBin6Line />
                </button>
            </div>
        </div>
    );
}
