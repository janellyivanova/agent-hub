import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Plus, ChevronDown, LogOut, Bot } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useAgents } from '../contexts/AgentsContext'
import AddAgentModal from './AddAgentModal'
import type { Agent } from '../types'

const NAV_LINKS = [
  { to: '/my-agents', label: 'My Agents' },
  { to: '/team-agents', label: 'Team Agents' },
  { to: '/library', label: 'Agent Library' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { addAgent } = useAgents()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  function handleSave(data: Omit<Agent, 'id' | 'source'>) {
    addAgent(data)
    setShowModal(false)
    navigate('/my-agents')
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  const initials = user?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?'

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-6 sticky top-0 z-40 shadow-sm">
        {/* Logo */}
        <NavLink to="/my-agents" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Bot className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">AgentHub</span>
        </NavLink>

        {/* Nav tabs */}
        <nav className="flex items-center gap-1 flex-1">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            New Agent
          </button>

          {/* User avatar menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(v => !v)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700">
                {initials}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 top-11 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-[160px]">
                  <div className="px-3 py-2 border-b border-gray-50">
                    <p className="text-xs font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {showModal && (
        <AddAgentModal
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
