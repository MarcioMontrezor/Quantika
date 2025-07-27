"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  TestTube, 
  CheckCircle, 
  Clock, 
  XCircle,
  FileText,
  Calendar
} from 'lucide-react'

interface Produto {
  id: number
  nome: string
  lote: string
  qualidade: string
  ultimaAnalise: string
  dataVencimento: string
  categoria: string
}

export default function QualidadeControl() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [filter, setFilter] = useState('all')

  console.log("QualidadeControl component rendered")

  useEffect(() => {
    fetchProdutos()
  }, [])

  const fetchProdutos = async () => {
    try {
      console.log("Fetching produtos for quality control...")
      const response = await fetch('/api/produtos')
      const data = await response.json()
      setProdutos(data)
      console.log("Quality control data loaded:", data)
    } catch (error) {
      console.error('Erro ao carregar dados de qualidade:', error)
    }
  }

  const filteredProdutos = produtos.filter(produto => {
    if (filter === 'all') return true
    return produto.qualidade === filter
  })

  const getQualidadeIcon = (qualidade: string) => {
    switch (qualidade) {
      case 'aprovado':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'pendente':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'reprovado':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <TestTube className="h-5 w-5 text-gray-600" />
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const stats = {
    aprovados: produtos.filter(p => p.qualidade === 'aprovado').length,
    pendentes: produtos.filter(p => p.qualidade === 'pendente').length,
    reprovados: produtos.filter(p => p.qualidade === 'reprovado').length
  }

  return (
    <div className="p-6 space-y-6" data-macaly="qualidade-container">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" data-macaly="qualidade-title">Controle de Qualidade</h1>
          <p className="text-gray-600 mt-2">Monitoramento e aprovação da qualidade dos produtos químicos</p>
        </div>
        <Button className="flex items-center space-x-2">
          <TestTube className="h-4 w-4" />
          <span>Nova Análise</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.aprovados}</div>
            <p className="text-xs text-muted-foreground">Liberados para uso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendentes}</div>
            <p className="text-xs text-muted-foreground">Aguardando análise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reprovados</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.reprovados}</div>
            <p className="text-xs text-muted-foreground">Bloqueados</p>
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
              Todos
            </Button>
            <Button 
              variant={filter === 'pendente' ? 'default' : 'outline'}
              onClick={() => setFilter('pendente')}
              size="sm"
            >
              Pendentes
            </Button>
            <Button 
              variant={filter === 'aprovado' ? 'default' : 'outline'}
              onClick={() => setFilter('aprovado')}
              size="sm"
            >
              Aprovados
            </Button>
            <Button 
              variant={filter === 'reprovado' ? 'default' : 'outline'}
              onClick={() => setFilter('reprovado')}
              size="sm"
            >
              Reprovados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <div className="space-y-4">
        {filteredProdutos.map((produto) => (
          <Card key={produto.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getQualidadeIcon(produto.qualidade)}
                  <div>
                    <h3 className="font-semibold text-lg">{produto.nome}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>Lote: {produto.lote}</span>
                      <span>Categoria: {produto.categoria}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Última análise: {formatDate(produto.ultimaAnalise)}</span>
                    </div>
                    <div className="text-gray-500 mt-1">
                      Vencimento: {formatDate(produto.dataVencimento)}
                    </div>
                  </div>
                  {getQualidadeBadge(produto.qualidade)}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Relatório
                    </Button>
                    {produto.qualidade === 'pendente' && (
                      <Button size="sm">
                        <TestTube className="h-4 w-4 mr-2" />
                        Analisar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProdutos.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <TestTube className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500">Não há produtos com o status selecionado.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}