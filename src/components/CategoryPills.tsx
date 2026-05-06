import type { Category } from '../types'

const ALL_CATEGORIES: (Category | 'All')[] = ['All', 'Productivity', 'Code', 'Writing', 'Research', 'Finance']

interface Props {
  selected: Category | 'All'
  onChange: (cat: Category | 'All') => void
}

export default function CategoryPills({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {ALL_CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
            selected === cat
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
