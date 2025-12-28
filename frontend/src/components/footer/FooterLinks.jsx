import FooterAbout from "./FooterAbout";
import FooterCategories from "./FooterCategories";
import FooterFeatured from "./FooterFeatured";

export default function FooterLinks() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <FooterAbout />
            <FooterCategories />
            <FooterFeatured />
        </div>
    );
}
