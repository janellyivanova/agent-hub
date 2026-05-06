import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AgentsProvider } from './contexts/AgentsContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import MyAgentsPage from './pages/MyAgentsPage'
import TeamAgentsPage from './pages/TeamAgentsPage'
import LibraryPage from './pages/LibraryPage'
import ChatPage from './pages/ChatPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AgentsProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path="/my-agents" element={<MyAgentsPage />} />
              <Route path="/team-agents" element={<TeamAgentsPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/chat/:agentId" element={<ChatPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AgentsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
