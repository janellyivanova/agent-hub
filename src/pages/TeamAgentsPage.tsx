import { useNavigate } from 'react-router-dom'
import { Users } from 'lucide-react'
import { useAgents } from '../contexts/AgentsContext'
import { useAuth } from '../contexts/AuthContext'
import AgentCard from '../components/AgentCard'

export default function TeamAgentsPage() {
  const { teamAgents, addFromLibraryOrTeam, myAgents } = useAgents()
  const { user } = useAuth()
  const navigate = useNavigate()

  function isAlreadyMine(agentId: string) {
    return myAgents.some(a => a.id === agentId)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Team Agents</h1>
        <p className="text-sm text-gray-500 mt-1">
          Agents shared by your teammates — hover a card to add one to your workspace
        </p>
      </div>

      {teamAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-gray-300" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No team agents yet</h2>
          <p className="text-sm text-gray-500 max-w-xs">
            When teammates share agents, they'll appear here. You can create an agent and enable "Share with team".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamAgents.map(agent => (
            <AgentCard
              key={agent.id}
              agent={agent}
              variant="team"
              onClick={() => navigate(`/chat/${agent.id}`)}
              isAdded={isAlreadyMine(agent.id)}
              onAddToMine={() => addFromLibraryOrTeam(agent, user?.name)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
