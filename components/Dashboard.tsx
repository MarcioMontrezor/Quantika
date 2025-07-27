"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface DashboardStats {
  totalProdutos: number
  produtosBaixoEstoque: number
  produtosVencendo: number
  produtosAprovados: number
}

interface Produto {
  id: number
  nome: string
  status: string
  qualidade: string
  quantidade: number
  estoqueMinimo: number
  dataVencimento: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProdutos: 0,
    produtosBaixoEstoque: 0,
    produtosVencendo: 0,
    produtosAprovados: 0
  })
  const [produtosCriticos, setProdutosCriticos] = useState<Produto[]>([])

  console.log("Dashboard component rendered - API fixed")

  useEffect(() => {
    console.log("Dashboard useEffect triggered - fetching from new API")
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      console.log("Fetching dashboard data...")
      const response = await fetch('/api/produtos')
      const produtos = await response.json()
      
      console.log("Produtos fetched:", produtos)

      const today = new Date()
      const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000))

      const stats: DashboardStats = {
        totalProdutos: produtos.length,
        produtosBaixoEstoque: produtos.filter((p: Produto) => p.status === 'baixo' || p.status === 'critico').length,
        produtosVencendo: produtos.filter((p: Produto) => new Date(p.dataVencimento) <= thirtyDaysFromNow).length,
        produtosAprovados: produtos.filter((p: Produto) => p.qualidade === 'aprovado').length
      }

      const criticos = produtos.filter((p: Produto) => 
        p.status === 'critico' || p.status === 'baixo' || p.qualidade === 'pendente'
      )

      setStats(stats)
      setProdutosCriticos(criticos)
      
      console.log("Dashboard stats updated:", stats)
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>
      case 'baixo':
        return <Badge className="bg-yellow-100 text-yellow-800">Baixo</Badge>
      case 'critico':
        return <Badge className="bg-red-100 text-red-800">Crítico</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getQualidadeBadge = (qualidade: string) => {
    switch (qualidade) {
      case 'aprovado':
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
      case 'pendente':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case 'reprovado':
        return <Badge className="bg-red-100 text-red-800">Reprovado</Badge>
      default:
        return <Badge variant="secondary">{qualidade}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6" data-macaly="dashboard-container">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900" data-macaly="dashboard-title">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral do sistema de controle de estoque químico</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProdutos}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Produtos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Baixo Estoque</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.produtosBaixoEstoque}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              Requerem atenção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencendo (30 dias)</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.produtosVencendo}</div>
            <p className="text-xs text-muted-foreground">
              <Clock className="inline h-3 w-3 mr-1" />
              Verificar validade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualidade Aprovada</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.produtosAprovados}</div>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="inline h-3 w-3 mr-1" />
              Liberados para uso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span>Produtos que Requerem Atenção</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {produtosCriticos.length === 0 ? (
            <p className="text-muted-foreground">Nenhum produto crítico no momento.</p>
          ) : (
            <div className="space-y-4">
              {produtosCriticos.map((produto) => (
                <div key={produto.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{produto.nome}</h3>
                    <p className="text-sm text-muted-foreground">
                      Estoque: {produto.quantidade} (mín: {produto.estoqueMinimo})
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {getStatusBadge(produto.status)}
                    {getQualidadeBadge(produto.qualidade)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}