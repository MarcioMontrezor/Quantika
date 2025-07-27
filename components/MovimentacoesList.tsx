"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  User,
  Package
} from 'lucide-react'

interface Movimentacao {
  id: number
  produtoId: number
  tipo: 'entrada' | 'saida'
  quantidade: number
  data: string
  usuario: string
  observacoes: string
}

interface Produto {
  id: number
  nome: string
  unidade: string
}

interface MovimentacaoCompleta extends Movimentacao {
  produto?: Produto
}

export default function MovimentacoesList() {
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoCompleta[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [filter, setFilter] = useState('all')

  console.log("MovimentacoesList component rendered")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      console.log("Fetching movimentacoes and produtos...")
      const [movResponse, prodResponse] = await Promise.all([
        fetch('/api/movimentacoes'),
        fetch('/api/produtos')
      ])
      
      const movData = await movResponse.json()
      const prodData = await prodResponse.json()
      
      // Combinar dados de movimentações com produtos
      const movimentacoesCompletas = movData.map((mov: Movimentacao) => ({
        ...mov,
        produto: prodData.find((prod: Produto) => prod.id === mov.produtoId)
      }))
      
      setMovimentacoes(movimentacoesCompletas)
      setProdutos(prodData)
      
      console.log("Movimentacoes loaded:", movimentacoesCompletas)
    } catch (error) {
      console.error('Erro ao carregar movimentações:', error)
    }
  }

  const filteredMovimentacoes = movimentacoes.filter(mov => {
    if (filter === 'all') return true
    return mov.tipo === filter
  })

  const getTipoIcon = (tipo: string) => {
    return tipo === 'entrada' 
      ? <ArrowUpCircle className="h-5 w-5 text-green-600" />
      : <ArrowDownCircle className="h-5 w-5 text-red-600" />
  }

  const getTipoBadge = (tipo: string) => {
    return tipo === 'entrada'
      ? <Badge className="bg-green-100 text-green-800">Entrada</Badge>
      : <Badge className="bg-red-100 text-red-800">Saída</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const stats = {
    entradas: movimentacoes.filter(m => m.tipo === 'entrada').length,
    saidas: movimentacoes.filter(m => m.tipo === 'saida').length,
    total: movimentacoes.length
  }

  return (
    <div className="p-6 space-y-6" data-macaly="movimentacoes-container">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" data-macaly="movimentacoes-title">Movimentações</h1>
          <p className="text-gray-600 mt-2">Histórico completo de entradas e saídas do estoque</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nova Movimentação</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Movimentações</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Registros no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.entradas}</div>
            <p className="text-xs text-muted-foreground">Reposições de estoque</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saídas</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.saidas}</div>
            <p className="text-xs text-muted-foreground">Consumo de produtos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              Todas
            </Button>
            <Button 
              variant={filter === 'entrada' ? 'default' : 'outline'}
              onClick={() => setFilter('entrada')}
              size="sm"
            >
              Entradas
            </Button>
            <Button 
              variant={filter === 'saida' ? 'default' : 'outline'}
              onClick={() => setFilter('saida')}
              size="sm"
            >
              Saídas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Movimentacoes List */}
      <div className="space-y-4">
        {filteredMovimentacoes.map((movimentacao) => (
          <Card key={movimentacao.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getTipoIcon(movimentacao.tipo)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">
                        {movimentacao.produto?.nome || `Produto ID ${movimentacao.produtoId}`}
                      </h3>
                      {getTipoBadge(movimentacao.tipo)}
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mt-2">
                      <div className="flex items-center space-x-1">
                        <Package className="h-4 w-4" />
                        <span>
                          {movimentacao.quantidade} {movimentacao.produto?.unidade || 'un'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(movimentacao.data)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{movimentacao.usuario}</span>
                      </div>
                    </div>
                    {movimentacao.observacoes && (
                      <div className="mt-2 text-sm text-gray-500">
                        <strong>Observações:</strong> {movimentacao.observacoes}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    movimentacao.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {movimentacao.tipo === 'entrada' ? '+' : '-'}{movimentacao.quantidade}
                  </div>
                  <div className="text-sm text-gray-500">
                    {movimentacao.produto?.unidade || 'un'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMovimentacoes.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma movimentação encontrada</h3>
            <p className="text-gray-500">Não há registros com o filtro selecionado.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}