# Quantika - Sistema de Controle de Estoque Químico

Sistema profissional para controle de estoque e qualidade de produtos químicos, desenvolvido com Next.js, Tailwind CSS e JSON Server.

## 🚀 Como executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação e execução

1. **Instalar dependências:**
```bash
npm install
```

2. **Iniciar o JSON Server (em um terminal):**
```bash
npm run json-server
```
O servidor de dados estará disponível em `http://localhost:3001`

3. **Iniciar a aplicação Next.js (em outro terminal):**
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

## 📋 Funcionalidades

### ✅ Implementadas
- **Dashboard**: Visão geral com métricas e alertas
- **Produtos**: Listagem completa com filtros e status
- **Controle de Qualidade**: Aprovação e análise de produtos
- **Movimentações**: Histórico de entradas e saídas

### 🔄 Em desenvolvimento
- Módulo de Usuários
- Configurações do sistema
- Formulários de cadastro/edição
- Relatórios e exportação

## 🎨 Design System

O sistema utiliza uma paleta de cores profissional:
- **Primary**: Azul `#2563eb` (confiabilidade)
- **Secondary**: Verde `#059669` (status positivos)
- **Danger**: Vermelho `#dc2626` (alertas)
- **Accent**: Roxo `#7c3aed` (destaques)

## 🗂️ Estrutura do Projeto

```
├── app/                    # Páginas Next.js
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── Dashboard.tsx     # Dashboard principal
│   ├── ProdutosList.tsx  # Lista de produtos
│   ├── QualidadeControl.tsx # Controle de qualidade
│   └── MovimentacoesList.tsx # Movimentações
├── db.json               # Banco de dados JSON
└── tailwind.config.ts    # Configuração do Tailwind
```

## 📊 API Endpoints

O JSON Server disponibiliza os seguintes endpoints:

- `GET /produtos` - Lista todos os produtos
- `GET /movimentacoes` - Lista todas as movimentações  
- `GET /usuarios` - Lista todos os usuários
- `POST /produtos` - Criar novo produto
- `PUT /produtos/:id` - Atualizar produto
- `DELETE /produtos/:id` - Excluir produto

## 🔧 Tecnologias

- **Frontend**: Next.js 15, React 18, TypeScript
- **Estilização**: Tailwind CSS, shadcn/ui
- **Backend**: JSON Server (desenvolvimento)
- **Ícones**: Lucide React
- **Componentes**: Radix UI