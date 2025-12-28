const categories = [
    "Bilgisayar",
    "Cep Telefonu",
    "Notebook",
    "Televizyon",
    "Tablet",
    "Akıllı Saat",
];

export default function FooterCategories() {
    return (
        <div>
            <h3 className="font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-2 text-sm text-gray-600">
                {categories.map((cat) => (
                    <li key={cat}>{cat}</li>
                ))}
            </ul>
        </div>
    );
}
