import { useState } from 'react'
import { Pencil, Trash2, MoreHorizontal, Plus, Check } from 'lucide-react'
import type { Agent } from '../types'

interface BaseProps {
  agent: Agent
  onClick: () => void
}

interface MyAgentProps extends BaseProps {
  variant: 'mine'
  onEdit: () => void
  onDelete: () => void
}

interface TeamAgentProps extends BaseProps {
  variant: 'team'
  isAdded: boolean
  onAddToMine: () => void
}

interface LibraryAgentProps extends BaseProps {
  variant: 'library'
  isAdded: boolean
  onAddToMine: () => void
}

type Props = MyAgentProps | TeamAgentProps | LibraryAgentProps

const CATEGORY_COLORS: Record<string, string> = {
  Productivity: 'bg-emerald-50 text-emerald-700',
  Code: 'bg-indigo-50 text-indigo-700',
  Writing: 'bg-purple-50 text-purple-700',
  Research: 'bg-teal-50 text-teal-700',
  Finance: 'bg-amber-50 text-amber-700',
}

export default function AgentCard(props: Props) {
  const { agent, onClick } = props
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* My Agent hover actions */}
      {props.variant === 'mine' && (
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
          <button
            onClick={e => { e.stopPropagation(); props.onEdit() }}
            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            title="Edit"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-600" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); props.onDelete() }}
            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-red-50 hover:border-red-200 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-gray-600" />
          </button>
        </div>
      )}

      {/* Team Agent 3-dot menu */}
      {props.variant === 'team' && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
          <div className="relative">
            <button
              onClick={e => { e.stopPropagation(); setMenuOpen(v => !v) }}
              className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={e => { e.stopPropagation(); setMenuOpen(false) }} />
                <div className="absolute right-0 top-9 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-[160px]">
                  <button
                    disabled={props.isAdded}
                    onClick={e => { e.stopPropagation(); props.onAddToMine(); setMenuOpen(false) }}
                    className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {props.isAdded
                      ? <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-gray-400">Already added</span></>
                      : <><Plus className="w-3.5 h-3.5 text-indigo-600" /><span className="text-gray-700">Add to My Agents</span></>
                    }
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Avatar + category */}
        <div className="flex items-start justify-between mb-3">
          <div className={`w-11 h-11 rounded-xl ${agent.avatarColor} flex items-center justify-center text-xl`}>
            {agent.avatarIcon}
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[agent.category] ?? 'bg-gray-100 text-gray-600'}`}>
            {agent.category}
          </span>
        </div>

        {/* Name + description */}
        <h3 className="font-semibold text-gray-900 text-base mb-1 leading-snug">{agent.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{agent.description}</p>

        {/* Team: added-by label */}
        {props.variant === 'team' && agent.addedBy && (
          <p className="text-xs text-gray-400 mt-3">
            Added by <span className="font-medium text-gray-500">{agent.addedBy}</span>
          </p>
        )}

        {/* Library: Add to My Agents button */}
        {props.variant === 'library' && (
          <button
            onClick={e => { e.stopPropagation(); if (!props.isAdded) props.onAddToMine() }}
            disabled={props.isAdded}
            className={`mt-4 w-full py-2 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-center gap-1.5 ${
              props.isAdded
                ? 'bg-emerald-50 text-emerald-700 cursor-default'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            {props.isAdded
              ? <><Check className="w-3.5 h-3.5" /> Added</>
              : <><Plus className="w-3.5 h-3.5" /> Add to My Agents</>
            }
          </button>
        )}
      </div>
    </div>
  )
}
