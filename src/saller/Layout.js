import React from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
    <Sidebar />
    <div className="lg:pl-64">
      <Header />
      <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  </div>
  )
}

export default Layout
