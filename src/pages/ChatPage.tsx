import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Wifi } from 'lucide-react'
import { useAgents } from '../contexts/AgentsContext'
import { useAuth } from '../contexts/AuthContext'
import { libraryAgents } from '../data/libraryAgents'
import { getFakeResponse } from '../data/fakeResponses'
import TypingIndicator from '../components/TypingIndicator'
import type { Agent, Message } from '../types'

function findAgent(id: string, myAgents: Agent[], teamAgents: Agent[]): Agent | undefined {
  return (
    myAgents.find(a => a.id === id) ??
    teamAgents.find(a => a.id === id) ??
    libraryAgents.find(a => a.id === id)
  )
}

export default function ChatPage() {
  const { agentId } = useParams<{ agentId: string }>()
  const navigate = useNavigate()
  const { myAgents, teamAgents } = useAgents()
  const { user } = useAuth()
  const agent = agentId ? findAgent(agentId, myAgents, teamAgents) : undefined

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function sendMessage() {
    const text = input.trim()
    if (!text || isTyping || !agent) return

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const delay = 1000 + Math.random() * 800
    setTimeout(() => {
      const reply: Message = {
        id: `msg-${Date.now()}`,
        role: 'agent',
        text: getFakeResponse(agent.category),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, reply])
      setIsTyping(false)
    }, delay)
  }

  if (!agent) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center p-8">
        <p className="text-lg font-semibold text-gray-700 mb-2">Agent not found</p>
        <p className="text-sm text-gray-500 mb-6">This agent doesn't exist or may have been deleted.</p>
        <button
          onClick={() => navigate('/my-agents')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Back to My Agents
        </button>
      </div>
    )
  }

  const initials = user?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?'

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Chat header */}
      <div className="flex items-center gap-4 px-6 py-4 bg-white border-b border-gray-100 shadow-sm flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className={`w-10 h-10 rounded-xl ${agent.avatarColor} flex items-center justify-center text-lg flex-shrink-0`}>
          {agent.avatarIcon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-900 text-base leading-tight">{agent.name}</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Wifi className="w-3 h-3 text-emerald-500" />
            <span className="text-xs text-emerald-600 font-medium">Online</span>
          </div>
        </div>
        <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          {agent.category}
        </span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className={`w-16 h-16 rounded-2xl ${agent.avatarColor} flex items-center justify-center text-3xl mb-4`}>
              {agent.avatarIcon}
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{agent.name}</h3>
            <p className="text-sm text-gray-500 max-w-xs">{agent.description || 'Start a conversation below.'}</p>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-end gap-2.5 mb-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            {msg.role === 'agent' ? (
              <div className={`w-8 h-8 rounded-full ${agent.avatarColor} flex items-center justify-center text-sm flex-shrink-0`}>
                {agent.avatarIcon}
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700 flex-shrink-0">
                {initials}
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[65%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl border border-gray-200 px-4 py-2 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder={`Message ${agent.name}…`}
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">Press Enter to send</p>
      </div>
    </div>
  )
}
