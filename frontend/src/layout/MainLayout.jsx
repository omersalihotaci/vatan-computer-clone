import React from 'react'
import Navbar from '../components/navbar/Navbar';

import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import ScrollToTop from '../components/ScrollToTop';

function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <Navbar />          
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout
