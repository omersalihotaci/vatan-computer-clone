import { Link } from "react-router-dom";
import { useCategoryTree } from "../../hooks/useCategories";

export default function FooterCategories() {
    const { data: categories = [], isLoading, error } = useCategoryTree();

    if (isLoading || error) return null;
    const allChildren = categories.flatMap((cat) =>
        Array.isArray(cat.children) ? cat.children : [],
    );

    if (!allChildren.length) return null;

    const mid = Math.ceil(allChildren.length / 2);
    const leftColumn = allChildren.slice(0, mid);
    const rightColumn = allChildren.slice(mid);

    return (
        <div>
            <h3 className="font-semibold mb-4">Kategoriler</h3>

            <div
                className="grid grid-cols-2 gap-8 text-sm text-gray-600
                [&_a]:cursor-pointer
                [&_a]:hover:underline"
            >
                <ul className="space-y-2">
                    {leftColumn.map((cat) => (
                        <li key={cat.id}>
                            <Link to={`/category/${cat.id}`}>{cat.name}</Link>
                        </li>
                    ))}
                </ul>

                <ul className="space-y-2">
                    {rightColumn.map((cat) => (
                        <li key={cat.id}>
                            <Link to={`/category/${cat.id}`}>{cat.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
