import FooterTop from "./FooterTop";
import FooterFeatures from "./FooterFeatures";
import FooterLinks from "./FooterLinks";

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-16">
            <FooterTop />
            <FooterFeatures />
            <FooterLinks />
        </footer>
    );
}
