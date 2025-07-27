import { NextResponse } from 'next/server'

// Dados das movimentações
const movimentacoes = [
  {
    "id": 1,
    "produtoId": 1,
    "tipo": "entrada",
    "quantidade": 50,
    "data": "2024-01-10",
    "usuario": "Mireli Scarton",
    "observacoes": "Reposição mensal"
  },
  {
    "id": 2,
    "produtoId": 2,
    "tipo": "saida",
    "quantidade": 8,
    "data": "2024-01-12",
    "usuario": "Maria Santos",
    "observacoes": "Produção lote P001"
  },
  {
    "id": 3,
    "produtoId": 3,
    "tipo": "entrada",
    "quantidade": 100,
    "data": "2024-01-15",
    "usuario": "Carlos Oliveira",
    "observacoes": "Nova remessa do fornecedor"
  },
  {
    "id": 4,
    "produtoId": 4,
    "tipo": "saida",
    "quantidade": 15,
    "data": "2024-01-18",
    "usuario": "Ana Costa",
    "observacoes": "Processo de limpeza industrial"
  }
]

export async function GET() {
  console.log("API /movimentacoes called, returning data:", movimentacoes)
  return NextResponse.json(movimentacoes)
}