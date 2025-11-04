import React from 'react'
import CategoryMenu from './CategoryMenu'
import TopInfoBar from './TopInfoBar'
import MainNavbar from './MainNavbar'

function Navbar() {
  return (
      <header>
          <nav>
              <div className="bg-primary lg:bg-white  ">
                  <TopInfoBar />
                  <MainNavbar />
                  <CategoryMenu />
              </div>
          </nav>
      </header>
  );
}

export default Navbar