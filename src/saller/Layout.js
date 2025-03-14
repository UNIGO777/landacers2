import React, { useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
const Layout = ({ children, sellerDetails, isbuilder }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50">
    <Sidebar isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isbuilder={isbuilder} />
    <div className="lg:pl-64">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} sellerDetails={sellerDetails} />
      <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  </div>
  )
}

export default Layout
