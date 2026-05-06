import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Agent } from '../types'

interface AgentsContextValue {
  myAgents: Agent[]
  teamAgents: Agent[]
  addAgent: (agent: Omit<Agent, 'id' | 'source'>) => void
  updateAgent: (id: string, updates: Partial<Agent>) => void
  deleteAgent: (id: string) => void
  addFromLibraryOrTeam: (agent: Agent, addedBy?: string) => void
  isInMyAgents: (id: string) => boolean
}

const AgentsContext = createContext<AgentsContextValue | null>(null)

const TEAM_SEED: Agent[] = [
  {
    id: 'team-1',
    name: 'SupportBot',
    description: 'Handles tier-1 customer support tickets and routes complex issues to the right team.',
    category: 'Productivity',
    avatarIcon: '🎧',
    avatarColor: 'bg-sky-100',
    apiEndpoint: 'https://api.example.com/supportbot',
    webhookUrl: '',
    sharedWithTeam: true,
    addedBy: 'Alex Johnson',
    source: 'team',
  },
  {
    id: 'team-2',
    name: 'DocWriter',
    description: 'Generates technical documentation from code comments and README files.',
    category: 'Writing',
    avatarIcon: '📖',
    avatarColor: 'bg-violet-100',
    apiEndpoint: 'https://api.example.com/docwriter',
    webhookUrl: '',
    sharedWithTeam: true,
    addedBy: 'Maria Chen',
    source: 'team',
  },
  {
    id: 'team-3',
    name: 'SprintPlanner',
    description: 'Turns backlog items into sprint plans with story points and dependency mapping.',
    category: 'Productivity',
    avatarIcon: '🗂️',
    avatarColor: 'bg-green-100',
    apiEndpoint: 'https://api.example.com/sprintplanner',
    webhookUrl: '',
    sharedWithTeam: true,
    addedBy: 'David Park',
    source: 'team',
  },
]

export function AgentsProvider({ children }: { children: ReactNode }) {
  const [myAgents, setMyAgents] = useState<Agent[]>([])
  const [teamAgents, setTeamAgents] = useState<Agent[]>(TEAM_SEED)

  function addAgent(agent: Omit<Agent, 'id' | 'source'>) {
    const newAgent: Agent = {
      ...agent,
      id: `agent-${Date.now()}`,
      source: 'mine',
    }
    setMyAgents(prev => [...prev, newAgent])
    if (agent.sharedWithTeam) {
      setTeamAgents(prev => [...prev, { ...newAgent, source: 'team' }])
    }
  }

  function updateAgent(id: string, updates: Partial<Agent>) {
    setMyAgents(prev =>
      prev.map(a => (a.id === id ? { ...a, ...updates } : a))
    )
    setTeamAgents(prev =>
      prev.map(a => (a.id === id ? { ...a, ...updates } : a))
    )
  }

  function deleteAgent(id: string) {
    setMyAgents(prev => prev.filter(a => a.id !== id))
    setTeamAgents(prev => prev.filter(a => a.id !== id))
  }

  function addFromLibraryOrTeam(agent: Agent, addedBy?: string) {
    const newAgent: Agent = {
      ...agent,
      id: `agent-${Date.now()}`,
      source: 'mine',
      addedBy,
      sharedWithTeam: false,
    }
    setMyAgents(prev => [...prev, newAgent])
  }

  function isInMyAgents(id: string) {
    return myAgents.some(a => a.id === id || a.id.endsWith(id))
  }

  return (
    <AgentsContext.Provider
      value={{ myAgents, teamAgents, addAgent, updateAgent, deleteAgent, addFromLibraryOrTeam, isInMyAgents }}
    >
      {children}
    </AgentsContext.Provider>
  )
}

export function useAgents() {
  const ctx = useContext(AgentsContext)
  if (!ctx) throw new Error('useAgents must be used within AgentsProvider')
  return ctx
}
