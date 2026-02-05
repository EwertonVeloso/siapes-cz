# Documentação da API SIAPES-CZ

**Sistema de Gestão de Práticas de Ensino em Saúde do HUJB**

- **Base URL:** `http://localhost:3000`
- **Versão:** 1.0.0
- **Formato de Dados:** JSON
- **Autenticação:** Bearer Token (JWT)

## Índice

1. [Autenticação e Segurança](#1-autenticação-e-segurança)
2. [Autenticação (`/auth`)](#2-autenticação-auth)
3. [Perfil do Usuário (`/profile`)](#3-perfil-do-usuário-profile)
4. [Funcionários (`/employee`)](#4-funcionários-employee)
5. [Coordenadores (`/coordinator`)](#5-coordenadores-coordinator)
6. [Requerimentos (`/request`)](#6-requerimentos-request)

---

## Tecnologias

Node.js

TypeScript

Express 

Prisma ORM

PostgreSQL

Redis

NEO4J

Zod

JWT para autenticação

Multer (upload de arquivos)

obs: link para a api de instituições parceiras, que faz parte desse projeto: https://github.com/Bancos-de-Dados-II/projeto-1-projeto-01

## 1. Autenticação e Segurança

A maioria dos endpoints desta API é protegida. Para acessá-los, é necessário enviar um **Token JWT** válido no cabeçalho da requisição.

**Header Obrigatório:**
```http
Authorization: Bearer <seu_token_aqui>

Níveis de Acesso (Roles):

    ADMIN: Acesso total ao sistema.

    MANAGER: Gerenciamento intermediário.

    COORDINATOR: Gerenciamento do coordenador da instituição de ensino

2. Autenticação (/auth)

Rotas públicas para entrada no sistema.

Login

Realiza a autenticação do usuário e retorna os tokens de acesso.

    Método: POST

    Rota: /auth/login

Corpo da Requisição (JSON):

{
  "email": "admin@siapes.com",
  "password": "senha_segura_123"
}

Resposta de Sucesso (200 OK):

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "827ccb0eea8a706c4c34a16891f84e7b",
  "user": {
    "id": "e982180e-437a-4c28-9844-31f0545f560e",
    "name": "Administrador do Sistema",
    "role": "ADMIN"
  }
}

🔄 Refresh Token

Gera um novo token de acesso quando o atual expira, sem a necessidade de o usuário fazer login novamente.

    Método: POST

    Rota: /auth/refresh-token

Corpo da Requisição (JSON):

{
  "refresh_token": "827ccb0eea8a706c4c34a16891f84e7b"
}

Resposta de Sucesso (200 OK):

{
  "token": "novo_token_jwt_aqui...",
  "refresh_token": "novo_refresh_token_aqui..."
}

3. Perfil do Usuário (/profile)

Rotas para o usuário logado gerenciar sua própria conta.
🚪 Logout

Invalida a sessão atual no backend.

    Método: POST

    Rota: /profile/logout

Resposta de Sucesso (200 OK):

{
  "message": "Logout realizado com sucesso."
}

🔑 Alterar Senha

Permite que o usuário altere sua própria senha.

    Método: PATCH

    Rota: /profile/password

Corpo da Requisição (JSON):

{
  "oldPassword": "minha_senha_antiga",
  "newPassword": "nova_senha_super_secreta"
}

Resposta de Sucesso (200 OK):

{
  "message": "Senha alterada com sucesso."
}

4. Funcionários (/employee)

Gerenciamento de usuários internos do hospital (Admin, Técnicos, etc.). Permissão: Requer role ADMIN.
📋 Listar Funcionários

Retorna a lista de todos os funcionários cadastrados.

    Método: GET

    Rota: /employee

Resposta de Sucesso (200 OK):

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
    "role":  "MANAGER",
    "active": true
  }
]

🔍 Buscar Funcionário por ID

    Método: GET

    Rota: /employee/:id

Resposta de Sucesso (200 OK):


{
  "id": "uuid-1",
  "name": "João da Silva",
  "email": "joao@hujb.gov.br",
  "role": "ADMIN",
  "createdAt": "2023-10-01T10:00:00Z"
}

➕ Cadastrar Funcionário

    Método: POST

    Rota: /employee

Corpo da Requisição (JSON):

{
  "name": "Carlos Souza",
  "email": "carlos@hujb.gov.br",
  "password": "senha_inicial_123",
  "role": "ADMIN"
}

Nota: Roles aceitas: ADMIN, MANAGER.

Resposta de Sucesso (201 Created):

{
  "id": "uuid-novo-usuario",
  "name": "Carlos Souza",
  "email": "carlos@hujb.gov.br",
  "role": "ADMIN"
}

✏️ Atualizar Funcionário

Atualiza dados básicos (nome, email).

    Método: PUT

    Rota: /employee/:id

Corpo da Requisição (JSON):
JSON

{
  "name": "Carlos Souza Atualizado",
  "email": "carlos.novo@hujb.gov.br"
}

Resposta de Sucesso (200 OK):
JSON

{
  "message": "Funcionário atualizado com sucesso."
}

❌ Remover Funcionário

    Método: DELETE

    Rota: /employee/:id

Resposta de Sucesso (200 OK):
JSON

{
  "message": "Funcionário removido com sucesso."
}

🟢 Alterar Status (Ativar/Inativar)

    Método: PATCH

    Rota: /employee/:id/status

Corpo da Requisição (JSON):
JSON

{
  "active": false
}

Resposta de Sucesso (200 OK):
JSON

{
  "message": "Status atualizado com sucesso."
}

👮 Alterar Cargo (Role)

    Método: PATCH

    Rota: /employee/:id/role

Corpo da Requisição (JSON):
JSON

{
  "role": "MANAGER"
}

Resposta de Sucesso (200 OK):
JSON

{
  "message": "Cargo atualizado com sucesso."
}

5. Coordenadores (/coordinator)

Gerenciamento de coordenadores das Instituições de Ensino (IES) parceiras.
📋 Listar Coordenadores

    Método: GET

    Rota: /coordinator

Resposta de Sucesso (200 OK):
JSON

[
  {
    "id": "coord-uuid-1",
    "name": "Fernanda Santos",
    "email": "fernanda@faculdade.edu.br",
    "institutionId": "inst-uuid-1"
  }
]

➕ Cadastrar Coordenador

    Método: POST

    Rota: /coordinator

Corpo da Requisição (JSON):
JSON

{
  "registration" : "COORD-2026-001"
  "name": "Fernanda Santos",
  "email": "fernanda@faculdade.edu.br",
  "password": "senha_segura",
  "institutionId": "64f8a3..."
  "role: "COORDINATOR"
}

Resposta de Sucesso (201 Created):
JSON

{
  "id": "coord-uuid-novo",
  "name": "Fernanda Santos",
  "email": "fernanda@faculdade.edu.br"
}

✏️ Atualizar Coordenador

    Método: PUT

    Rota: /coordinator/:id

Corpo da Requisição (JSON):
JSON

{
  "name": "Fernanda S. Lima",
  "email": "fernanda.lima@faculdade.edu.br"
}

Resposta de Sucesso (200 OK):
JSON

{
  "message": "Coordenador atualizado com sucesso."
}

❌ Remover Coordenador

    Método: DELETE

    Rota: /coordinator/:id

Resposta de Sucesso (200 OK):
JSON

{
  "message": "Coordenador removido com sucesso."
}

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

