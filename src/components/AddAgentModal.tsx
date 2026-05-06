import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Agent, Category } from '../types'

const CATEGORIES: Category[] = ['Productivity', 'Code', 'Writing', 'Research', 'Finance']

const AVATAR_OPTIONS = [
  { icon: '🤖', color: 'bg-indigo-100' },
  { icon: '⚡', color: 'bg-yellow-100' },
  { icon: '🧠', color: 'bg-purple-100' },
  { icon: '🚀', color: 'bg-blue-100' },
  { icon: '🔥', color: 'bg-orange-100' },
  { icon: '✨', color: 'bg-emerald-100' },
]

interface Props {
  agent?: Agent
  onSave: (data: Omit<Agent, 'id' | 'source'>) => void
  onClose: () => void
}

export default function AddAgentModal({ agent, onSave, onClose }: Props) {
  const [name, setName] = useState(agent?.name ?? '')
  const [description, setDescription] = useState(agent?.description ?? '')
  const [apiEndpoint, setApiEndpoint] = useState(agent?.apiEndpoint ?? '')
  const [webhookUrl, setWebhookUrl] = useState(agent?.webhookUrl ?? '')
  const [category, setCategory] = useState<Category>(agent?.category ?? 'Productivity')
  const [avatarIcon, setAvatarIcon] = useState(agent?.avatarIcon ?? AVATAR_OPTIONS[0].icon)
  const [avatarColor, setAvatarColor] = useState(agent?.avatarColor ?? AVATAR_OPTIONS[0].color)
  const [sharedWithTeam, setSharedWithTeam] = useState(agent?.sharedWithTeam ?? false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), description, apiEndpoint, webhookUrl, category, avatarIcon, avatarColor, sharedWithTeam })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {agent ? 'Edit Agent' : 'New Agent'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Avatar picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
            <div className="flex gap-3">
              {AVATAR_OPTIONS.map(opt => (
                <button
                  key={opt.icon}
                  type="button"
                  onClick={() => { setAvatarIcon(opt.icon); setAvatarColor(opt.color) }}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${opt.color} ${
                    avatarIcon === opt.icon
                      ? 'ring-2 ring-indigo-600 ring-offset-2 scale-110'
                      : 'hover:scale-105'
                  }`}
                >
                  {opt.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Agent Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Agent Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. TaskMaster"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What does this agent do?"
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as Category)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* API Endpoint */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">API Endpoint</label>
            <input
              type="url"
              value={apiEndpoint}
              onChange={e => setApiEndpoint(e.target.value)}
              placeholder="https://api.example.com/agent"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono"
            />
          </div>

          {/* Webhook URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Webhook URL</label>
            <input
              type="url"
              value={webhookUrl}
              onChange={e => setWebhookUrl(e.target.value)}
              placeholder="https://hooks.example.com/agent"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono"
            />
          </div>

          {/* Share toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-800">Share with team</p>
              <p className="text-xs text-gray-500 mt-0.5">Team members can see and use this agent</p>
            </div>
            <button
              type="button"
              onClick={() => setSharedWithTeam(v => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                sharedWithTeam ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  sharedWithTeam ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              {agent ? 'Save Changes' : 'Save Agent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
