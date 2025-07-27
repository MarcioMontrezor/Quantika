import { NextResponse } from 'next/server'

// Dados dos usuários
const usuarios = [
  {
    "id": 1,
    "nome": "Mireli Scarton",
    "cargo": "Gerente de Estoque",
    "email": "mireli@quantika.com"
  },
  {
    "id": 2,
    "nome": "Maria Santos",
    "cargo": "Analista de Qualidade",
    "email": "maria@quantika.com"
  },
  {
    "id": 3,
    "nome": "Carlos Oliveira",
    "cargo": "Auxiliar de Almoxarifado",
    "email": "carlos@quantika.com"
  },
  {
    "id": 4,
    "nome": "Ana Costa",
    "cargo": "Técnica em Química",
    "email": "ana@quantika.com"
  }
]

export async function GET() {
  console.log("API /usuarios called, returning data:", usuarios)
  return NextResponse.json(usuarios)
}