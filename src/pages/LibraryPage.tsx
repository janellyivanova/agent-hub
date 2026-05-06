import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAgents } from '../contexts/AgentsContext'
import { useAuth } from '../contexts/AuthContext'
import AgentCard from '../components/AgentCard'
import CategoryPills from '../components/CategoryPills'
import { libraryAgents } from '../data/libraryAgents'
import type { Category } from '../types'

export default function LibraryPage() {
  const { addFromLibraryOrTeam, myAgents } = useAgents()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Category | 'All'>('All')

  const filtered = filter === 'All'
    ? libraryAgents
    : libraryAgents.filter(a => a.category === filter)

  function isAlreadyAdded(libId: string) {
    return myAgents.some(a => a.id === libId || a.id.endsWith(libId))
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agent Library</h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse pre-built agents — add any to your workspace in one click
        </p>
      </div>

      <div className="mb-6">
        <CategoryPills selected={filter} onChange={setFilter} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            variant="library"
            onClick={() => navigate(`/chat/${agent.id}`)}
            isAdded={isAlreadyAdded(agent.id)}
            onAddToMine={() => addFromLibraryOrTeam(agent, user?.name)}
          />
        ))}
      </div>
    </div>
  )
}
