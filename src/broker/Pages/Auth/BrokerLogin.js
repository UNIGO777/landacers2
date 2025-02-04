import { useState } from 'react'
import { Building2, Lock, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const BrokerLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your login logic here
    console.log('Login attempt:', { email, password })
  }

  return (
    <div className="flex flex-col min-h-screen lg:flex-row bg-gradient-to-br from-blue-500 to-indigo-600">
      {/* Left Panel */}
      <div className="flex flex-col justify-center p-8 text-white lg:w-1/2 lg:p-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-12">
            <Building2 className="w-10 h-10" />
            <span className="text-3xl font-bold">LandsAcers</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">
            Welcome back to LandsAcers
          </h1>
          <p className="mb-8 text-xl text-blue-100">
            Manage your properties, tenants, and transactions all in one place.
          </p>

          <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="mb-4 italic text-blue-50">
              "This platform has revolutionized how we manage our properties. Everything is streamlined and efficient."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-200 rounded-full" />
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-blue-200">Property Manager, NYC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center p-8 bg-white lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Sign in to your account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 transition duration-200 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 text-lg font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/broker/signup" className="font-medium text-blue-600 transition duration-200 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default BrokerLogin;
