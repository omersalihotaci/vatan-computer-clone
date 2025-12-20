function AddAddressCard({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                w-full h-[117px] mt-5
                border-2 border-dashed border-gray-300
                rounded-xl
                flex flex-col items-center justify-center gap-2
                hover:border-blue-900 hover:text-blue-900
                transition
            "
        >
            <span className="text-3xl font-bold">+</span>
            <span className="font-medium">Yeni adres ekle</span>
        </button>
    );
}
export default AddAddressCard;