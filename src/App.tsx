import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Lobby from './pages/Lobby'
import Round from './pages/Round'
import Handoff from './pages/Handoff'
import Reveal from './pages/Reveal'
import Analysis from './pages/Analysis'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/round" element={<Round />} />
        <Route path="/handoff" element={<Handoff />} />
        <Route path="/reveal" element={<Reveal />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Layout>
  )
}
