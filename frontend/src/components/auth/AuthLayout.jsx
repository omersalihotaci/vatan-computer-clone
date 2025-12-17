import { useEffect, useState } from "react";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useSearchParams } from "react-router-dom";


function AuthLayout() {
    const [searchParams] = useSearchParams();

    const initialTab =
        searchParams.get("tab") === "register" ? "register" : "login";
    const [activeTab, setActiveTab] = useState(initialTab);
    
     useEffect(() => {
         const tab = searchParams.get("tab");
         if (tab === "login" || tab === "register") {
             setActiveTab(tab);
         }
     }, [searchParams]);

    return (
        <div className="flex justify-center bg-gray-100 pb-16">
            <div className="w-full max-w-[480px] bg-white rounded-lg shadow-md p-8 lg:mt-4  ">
                <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* ŞİMDİLİK SADECE TEST */}
                {activeTab === "login" && <LoginForm />}

                {activeTab === "register" && <RegisterForm />}
            </div>
        </div>
    );
}

export default AuthLayout
