import { FiSearch, FiBell } from "react-icons/fi"

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <div className="w-full max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <FiBell className="w-6 h-6" />
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-2 right-2"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                <span className="text-sm font-medium text-gray-600">JD</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Dima</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

