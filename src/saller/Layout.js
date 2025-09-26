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
      <main className="px-4 py-6 pb-14 sm:px-6 lg:px-8">{children}</main>
      <div className="text-center bg-white fixed bottom-0 w-full  p-4 text-gray-500 text-sm mt-4">
            Developed by <a href="https://naman-web.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Naman Jain</a> form <a href="https://nxt-gen-digitals.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">NxtGenDigitals</a>
      </div>
    </div>
  </div>
  )
}

export default Layout
