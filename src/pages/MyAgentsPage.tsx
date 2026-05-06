import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, Plus } from 'lucide-react'
import { useAgents } from '../contexts/AgentsContext'
import AgentCard from '../components/AgentCard'
import AddAgentModal from '../components/AddAgentModal'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import type { Agent } from '../types'

export default function MyAgentsPage() {
  const { myAgents, addAgent, updateAgent, deleteAgent } = useAgents()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [deletingAgent, setDeletingAgent] = useState<Agent | null>(null)

  function handleSave(data: Omit<Agent, 'id' | 'source'>) {
    if (editingAgent) {
      updateAgent(editingAgent.id, data)
      setEditingAgent(null)
    } else {
      addAgent(data)
      setShowModal(false)
    }
  }

  function handleDelete() {
    if (deletingAgent) {
      deleteAgent(deletingAgent.id)
      setDeletingAgent(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Agents</h1>
          <p className="text-sm text-gray-500 mt-1">
            {myAgents.length === 0
              ? 'No agents yet — create your first one'
              : `${myAgents.length} agent${myAgents.length === 1 ? '' : 's'}`}
          </p>
        </div>
      </div>

      {myAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6">
            <Bot className="w-10 h-10 text-indigo-300" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">You don't have any agents yet</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xs">
            Create your first AI agent to start automating tasks and boosting your workflow.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-indigo-200 text-indigo-700 font-medium text-sm hover:bg-indigo-50 hover:border-indigo-300 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add your first agent
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myAgents.map(agent => (
            <AgentCard
              key={agent.id}
              agent={agent}
              variant="mine"
              onClick={() => navigate(`/chat/${agent.id}`)}
              onEdit={() => setEditingAgent(agent)}
              onDelete={() => setDeletingAgent(agent)}
            />
          ))}
        </div>
      )}

      {(showModal || editingAgent) && (
        <AddAgentModal
          agent={editingAgent ?? undefined}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingAgent(null) }}
        />
      )}

      {deletingAgent && (
        <DeleteConfirmDialog
          agentName={deletingAgent.name}
          onConfirm={handleDelete}
          onCancel={() => setDeletingAgent(null)}
        />
      )}
    </div>
  )
}
