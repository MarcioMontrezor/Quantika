"use client"

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import ProdutosList from '@/components/ProdutosList'
import QualidadeControl from '@/components/QualidadeControl'
import MovimentacoesList from '@/components/MovimentacoesList'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  console.log("Main app rendered with activeTab:", activeTab)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'produtos':
        return <ProdutosList />
      case 'qualidade':
        return <QualidadeControl />
      case 'movimentacoes':
        return <MovimentacoesList />
      case 'usuarios':
        return <div className="p-6"><h1 className="text-3xl font-bold">Usuários</h1><p className="text-gray-600 mt-2">Módulo em desenvolvimento...</p></div>
      case 'configuracoes':
        return <div className="p-6"><h1 className="text-3xl font-bold">Configurações</h1><p className="text-gray-600 mt-2">Módulo em desenvolvimento...</p></div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50" data-macaly="main-app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto md:ml-0">
        {renderContent()}
      </main>
    </div>
  )
}