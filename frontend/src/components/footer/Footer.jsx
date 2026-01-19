import FooterTop from "./FooterTop";
import FooterFeatures from "./FooterFeatures";
import FooterLinks from "./FooterLinks";

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-16">
            <FooterTop />
            <FooterFeatures />
            <FooterLinks />
            <div className="text-lg text-gray-400 text-center ">
                Bu proje ticari amaç gütmemektedir. Eğitim ve kişisel gelişim
                amacıyla hazırlanmış bir clone projedir.
            </div>
        </footer>
    );
}
