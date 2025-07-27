"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Package,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface Produto {
  id: number
  nome: string
  categoria: string
  concentracao: string
  lote: string
  fornecedor: string
  dataVencimento: string
  quantidade: number
  unidade: string
  estoqueMinimo: number
  status: string
  qualidade: string
  ultimaAnalise: string
  preco: number
  localizacao: string
}

export default function ProdutosList() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  console.log("ProdutosList component rendered")

  useEffect(() => {
    fetchProdutos()
  }, [])

  const fetchProdutos = async () => {
    try {
      console.log("Fetching produtos...")
      const response = await fetch('/api/produtos')
      const data = await response.json()
      setProdutos(data)
      console.log("Produtos loaded:", data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    }
  }

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || produto.categoria === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(produtos.map(p => p.categoria)))

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'baixo':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'critico':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="p-6 space-y-6" data-macaly="produtos-container">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" data-macaly="produtos-title">Produtos</h1>
          <p className="text-gray-600 mt-2">Gerenciamento completo do estoque de produtos químicos</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Produto</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProdutos.map((produto) => (
          <Card key={produto.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(produto.status)}
                  <CardTitle className="text-lg">{produto.nome}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2">
                {getStatusBadge(produto.status)}
                {getQualidadeBadge(produto.qualidade)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Categoria:</span>
                  <p className="font-medium">{produto.categoria}</p>
                </div>
                <div>
                  <span className="text-gray-500">Concentração:</span>
                  <p className="font-medium">{produto.concentracao}</p>
                </div>
                <div>
                  <span className="text-gray-500">Estoque:</span>
                  <p className="font-medium">{produto.quantidade} {produto.unidade}</p>
                </div>
                <div>
                  <span className="text-gray-500">Mínimo:</span>
                  <p className="font-medium">{produto.estoqueMinimo} {produto.unidade}</p>
                </div>
                <div>
                  <span className="text-gray-500">Lote:</span>
                  <p className="font-medium">{produto.lote}</p>
                </div>
                <div>
                  <span className="text-gray-500">Localização:</span>
                  <p className="font-medium">{produto.localizacao}</p>
                </div>
                <div>
                  <span className="text-gray-500">Vencimento:</span>
                  <p className="font-medium">{formatDate(produto.dataVencimento)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Preço:</span>
                  <p className="font-medium">{formatPrice(produto.preco)}</p>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm">
                  <span className="text-gray-500">Fornecedor:</span>
                  <p className="font-medium">{produto.fornecedor}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProdutos.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou adicione um novo produto.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}