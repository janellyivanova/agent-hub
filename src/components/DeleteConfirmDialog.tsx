import { Trash2 } from 'lucide-react'

interface Props {
  agentName: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmDialog({ agentName, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <Trash2 className="w-5 h-5 text-red-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete agent?</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to delete <span className="font-medium text-gray-700">"{agentName}"</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
