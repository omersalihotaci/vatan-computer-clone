export default function FooterFeatured() {
    return (
        <div>
            <h3 className="font-semibold mb-4">Öne Çıkan Ürünler</h3>

            <div className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                <ul className="space-y-2">
                    <li>iPhone 17</li>
                    <li>iPhone 17 Pro Max</li>
                    <li>iPhone 16</li>
                    <li>iPhone 16 Pro</li>
                </ul>

                <ul className="space-y-2">
                    <li>Galaxy S25</li>
                    <li>Galaxy S25 Ultra</li>
                    <li>Galaxy Z Fold7</li>
                    <li>Galaxy Z Flip7</li>
                </ul>
            </div>
        </div>
    );
}
