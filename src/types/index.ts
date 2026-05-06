export type Category = 'Productivity' | 'Code' | 'Writing' | 'Research' | 'Finance'

export interface Agent {
  id: string
  name: string
  description: string
  category: Category
  avatarIcon: string
  avatarColor: string
  apiEndpoint: string
  webhookUrl: string
  sharedWithTeam: boolean
  addedBy?: string
  source: 'mine' | 'team' | 'library'
}

export interface User {
  email: string
  name: string
}

export interface Message {
  id: string
  role: 'user' | 'agent'
  text: string
  timestamp: Date
}

export type AvatarOption = {
  icon: string
  color: string
}
