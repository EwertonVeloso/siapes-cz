# Documentação da API SIAPES-CZ

**Sistema de Gestão de Práticas de Ensino em Saúde do HUJB**

| Informação | Valor |
|---|---|
| **Base URL** | `http://localhost:3000` |
| **Versão** | 1.0.0 |
| **Formato de Dados** | JSON |
| **Autenticação** | Bearer Token (JWT) |

## Índice

1. [Tecnologias](#tecnologias)
2. [Autenticação e Segurança](#autenticação-e-segurança)
3. [Autenticação (`/auth`)](#autenticação-auth)
4. [Perfil do Usuário (`/profile`)](#perfil-do-usuário-profile)
5. [Funcionários (`/employee`)](#funcionários-employee)
6. [Coordenadores (`/coordinator`)](#coordenadores-coordinator)
7. [Requerimentos (`/request`)](#requerimentos-request)

## Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express** - Framework web
- **Prisma ORM** - Mapeamento objeto-relacional
- **PostgreSQL** - Banco de dados principal
- **Redis** - blacklist cache
- **Neo4j** - Banco de dados grafo
- **Zod** - Validação de schemas
- **JWT** - Autenticação segura
- **Multer** - Upload de arquivos
  
## Autenticação e Segurança

A maioria dos endpoints desta API é protegida. Para acessá-los, é necessário enviar um **Token JWT** válido no cabeçalho da requisição.

### Header Obrigatório

```http
Authorization: Bearer <seu_token_aqui>
```

### Níveis de Acesso (Roles)

| Role | Descrição |
|---|---|
| **ADMIN** | Acesso total ao sistema |
| **MANAGER** | Gerenciamento intermediário |
| **COORDINATOR** | Gerenciamento do coordenador da instituição de ensino |

## Autenticação (`/auth`)

Rotas públicas para entrada no sistema.

### Login

Realiza a autenticação do usuário e retorna os tokens de acesso.

| Propriedade | Valor |
|---|---|
| **Método** | `POST` |
| **Rota** | `/auth/login` |

#### Corpo da Requisição

```json
{
  "email": "admin@siapes.com",
  "password": "senha_segura_123"
}
```

#### Resposta de Sucesso (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "827ccb0eea8a706c4c34a16891f84e7b",
  "user": {
    "id": "e982180e-437a-4c28-9844-31f0545f560e",
    "name": "Administrador do Sistema",
    "role": "ADMIN"
  }
}
```

### Refresh Token

Gera um novo token de acesso quando o atual expira, sem a necessidade de o usuário fazer login novamente.

| Propriedade | Valor |
|---|---|
| **Método** | `POST` |
| **Rota** | `/auth/refresh-token` |

#### Corpo da Requisição

```json
{
  "refresh_token": "827ccb0eea8a706c4c34a16891f84e7b"
}
```

#### Resposta de Sucesso (200 OK)

```json
{
  "token": "novo_token_jwt_aqui...",
  "refresh_token": "novo_refresh_token_aqui..."
}
```

## Perfil do Usuário (`/profile`)

Rotas para o usuário logado gerenciar sua própria conta.

### Logout

Invalida a sessão atual no backend.

| Propriedade | Valor |
|---|---|
| **Método** | `POST` |
| **Rota** | `/profile/logout` |

#### Resposta de Sucesso (200 OK)

```json
{
  "message": "Logout realizado com sucesso."
}
```

### Alterar Senha

Permite que o usuário altere sua própria senha.

| Propriedade | Valor |
|---|---|
| **Método** | `PATCH` |
| **Rota** | `/profile/password` |

#### Corpo da Requisição

```json
{
  "oldPassword": "minha_senha_antiga",
  "newPassword": "nova_senha_super_secreta"
}
```

#### Resposta de Sucesso (200 OK)

```json
{
  "message": "Senha alterada com sucesso."
}
```

## Funcionários (`/employee`)

Gerenciamento de usuários internos do hospital (Admin, Técnicos, etc.). 

**Permissão:** Requer role `ADMIN`.

### Listar Funcionários

Retorna a lista de todos os funcionários cadastrados.

| Propriedade | Valor |
|---|---|
| **Método** | `GET` |
| **Rota** | `/employee` |

#### Resposta de Sucesso (200 OK)

```json
[
  {
    "id": "uuid-1",
    "name": "João da Silva",
    "email": "joao@hujb.gov.br",
    "role": "ADMIN",
    "active": true
  },
  {
    "id": "uuid-2",
    "name": "Maria Oliveira",
    "email": "maria@hujb.gov.br",
    "role": "MANAGER",
    "active": true
  }
]
```

### Buscar Funcionário por ID

| Propriedade | Valor |
|---|---|
| **Método** | `GET` |
| **Rota** | `/employee/:id` |

#### Resposta de Sucesso (200 OK)

```json
{
  "id": "uuid-1",
  "name": "João da Silva",
  "email": "joao@hujb.gov.br",
  "role": "ADMIN",
  "createdAt": "2023-10-01T10:00:00Z"
}
```

### Cadastrar Funcionário

| Propriedade | Valor |
|---|---|
| **Método** | `POST` |
| **Rota** | `/employee` |

#### Corpo da Requisição

```json
{
  "name": "Carlos Souza",
  "email": "carlos@hujb.gov.br",
  "password": "senha_inicial_123",
  "role": "ADMIN"
}
```

> **Nota:** Roles aceitas: `ADMIN`, `MANAGER`.

#### Resposta de Sucesso (201 Created)

```json
{
  "id": "uuid-novo-usuario",
  "name": "Carlos Souza",
  "email": "carlos@hujb.gov.br",
  "role": "ADMIN"
}
```

### Atualizar Funcionário

Atualiza dados básicos (nome, email).

| Propriedade | Valor |
|---|---|
| **Método** | `PUT` |
| **Rota** | `/employee/:id` |

#### Corpo da Requisição

```json
{
  "name": "Carlos Souza Atualizado",
  "email": "carlos.novo@hujb.gov.br"
}
```

#### Resposta de Sucesso (200 OK)

```json
{
  "message": "Funcionário atualizado com sucesso."
}
```

### Remover Funcionário

| Propriedade | Valor |
|---|---|
| **Método** | `DELETE` |
| **Rota** | `/employee/:id` |

#### Resposta de Sucesso (200 OK)

```json
{
  "message": "Funcionário removido com sucesso."
}
```

### Alterar Status (Ativar/Inativar)

| Propriedade | Valor |
|---|---|
| **Método** | `PATCH` |
| **Rota** | `/employee/:id/status` |

#### Corpo da Requisição

```json
{
  "active": false
}
```

#### Resposta de Sucesso (200 OK)

```json
{
  "message": "Status atualizado com sucesso."
}
```

### Alterar Cargo (Role)

| Propriedade | Valor |
|---|---|
| **Método** | `PATCH` |
| **Rota** | `/employee/:id/role` |

#### Corpo da Requisição

```json
{
  "role": "MANAGER"
}
```

#### Resposta de Sucesso (200 OK)

```json
{
  "message": "Cargo atualizado com sucesso."
}
```

## Coordenadores (`/coordinator`)

Gerenciamento de coordenadores das Instituições de Ensino (IES) parceiras.
Projeto de banco de dados II (instituições parceiras): https://github.com/Bancos-de-Dados-II/projeto-1-projeto-01

### Listar Coordenadores

| Propriedade | Valor |
|---|---|
| **Método** | `GET` |
| **Rota** | `/coordinator` |

#### Resposta de Sucesso (200 OK)

```json
[
  {
    "id": "coord-uuid-1",
    "name": "Fernanda Santos",
    "email": "fernanda@faculdade.edu.br",
    "institutionId": "inst-uuid-1"
  }
]
```

### Cadastrar Coordenador

| Propriedade | Valor |
|---|---|
| **Método** | `POST` |
| **Rota** | `/coordinator` |

#### Corpo da Requisição

```json
{
  "registration": "COORD-2026-001",
  "name": "Fernanda Santos",
  "email": "fernanda@faculdade.edu.br",
  "password": "senha_segura",
  "institutionId": "64f8a3...",
  "role": "COORDINATOR"
}
```

#### Resposta de Sucesso (201 Created)

```json
{
  "id": "coord-uuid-novo",
  "name": "Fernanda Santos",
  "email": "fernanda@faculdade.edu.br"
}
```

### Atualizar Coordenador

| Propriedade | Valor |
|---|---|
| **Método** | `PUT` |
| **Rota** | `/coordinator/:id` |

#### Corpo da Requisição

```json
{
  "name": "Fernanda S. Lima",
  "email": "fernanda.lima@faculdade.edu.br"
}
```

#### Resposta de Sucesso (200 OK)

```json
{
  "message": "Coordenador atualizado com sucesso."
}
```

### Remover Coordenador

| Propriedade | Valor |
|---|---|
| **Método** | `DELETE` |
| **Rota** | `/coordinator/:id` |

#### Resposta de Sucesso (200 OK)

```json
{
  "message": "Coordenador removido com sucesso."
}
```

6. Requerimentos (/request)

Gestão de solicitações de estágio, visitas técnicas e convênios.
📋 Listar Requerimentos

    Método: GET

    Rota: /request

Resposta de Sucesso (200 OK):
JSON

[
  {
    "id": "req-1",
    "title": "Estágio em Enfermagem - 2026.1",
    "description": "Estágio curricular obrigatório.",
    "status": "PENDING",
    "type": "ESTAGIO",
    "createdAt": "2026-02-05T10:00:00Z"
  }
]

➕ Criar Requerimento

    Método: POST

    Rota: /request

Corpo da Requisição (JSON):
JSON

{
  "title": "Estágio em Enfermagem - 2026.1",
  "description": "Solicitação de campo de estágio para 15 alunos do 8º período.",
  "type": "ESTAGIO"
}

Resposta de Sucesso (201 Created):
JSON

{
  "id": "req-novo-id",
  "title": "Estágio em Enfermagem - 2026.1",
  "status": "PENDING"
}

✏️ Atualizar Requerimento

    Método: PUT

    Rota: /request/:id

Corpo da Requisição (JSON):
JSON

{
  "title": "Estágio em Enfermagem - Título Corrigido",
  "description": "Correção na descrição: são 20 alunos, não 15."
}

Resposta de Sucesso (200 OK):
JSON

{
  "message": "Requerimento atualizado com sucesso."
}

❌ Remover Requerimento

    Método: DELETE

    Rota: /request/:id

Resposta de Sucesso (200 OK):
JSON

{
  "message": "Requerimento removido com sucesso."
}

📎 Upload de Arquivo (Anexo)

Envia arquivos (PDF, JPG, PNG) para anexar ao requerimento.

    Método: POST

    Rota: /request/:id/archive

    Content-Type: multipart/form-data

Parâmetros do Formulário (Form-Data): | Chave | Tipo | Descrição | | :--- | :--- | :--- | | file | File | O arquivo binário selecionado no dispositivo. |

Resposta de Sucesso (200 OK):
JSON

{
  "message": "Arquivo enviado com sucesso.",
  "filename": "1738765432-documento.pdf",
  "path": "/uploads/1738765432-documento.pdf"
}

📝 Atualizar Status do Requerimento

Aprova ou rejeita a solicitação.

    Método: PATCH

    Rota: /request/:id/status

Corpo da Requisição (JSON):
JSON

{
  "status": "APPROVED"
}

    Status comuns: PENDING (Pendente), APPROVED (Aprovado), REJECTED (Rejeitado).

Resposta de Sucesso (200 OK):
JSON

{
  "id": "req-id",
  "status": "APPROVED",
  "updatedAt": "2026-02-05T12:00:00Z"
}

