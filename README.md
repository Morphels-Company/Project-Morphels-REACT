# Project-Morphels-REACT
Frontend React para o sistema de gestão financeira de instituições do 3° sertor - Morphels

## 🚀 Tecnologias

- **Node** - Linguagem de programção
- **Fastfy** - Framework de API
- **Bycript** - Encriptador de senhas
- **Fastfy JWT** - Token de seção
- **PostgreeSQL** - Banco de dados
- **Neon** - Banco de dados em núvem

## 📦 Instalação

```Bash
npm install
```

## ⚙️ Configuração

A aplicação está configurada para consumir o banco de dados através da URL no `.env`, contudo a configuração foi feita utilizando os drivers do neon que foi o serviço de banco de dados em nuvem utilizado.

Para ajustar, edite `.env`

```angular2html
DATABASE_URL='http://SUA URL DE ACESSO'
```
> [!IMPORTANT]
> O nome da variavel de ambiente não deve ser, em hipotese alguma, alterada, visto que é o mesmo nome utilizado em produção.

## 🏃Executar

### Modo de desenvolvimento

```angular2html
npm run dev
```
Abre na porta padrão do Vite `http://localhost:3000`

# 📂 Estrutura do Projeto

```
backend/
├── src/            # Código-fonte principal da aplicação
│   ├── Repositories/          # Camada responsável por conversar com o banco de dados             
│   ├── Controllers/           # Camada responsável pela formatação dos dados e chamada das services e repositories
│   ├── Services/              # Camada de serviços (login, segregação de dados, instanciamento das classes)
│   │   ├── containerPlugin          # Instanciamento e injeção de dependências das classes
│   │   ├── authService              # Login, encriptação de senha, atualização de data de acesso
│   │   ├── scopeValidationService   # Serviço responsável pela segregação dos dados listados  
│   └── Rountes/               # Camada de registro dos endpoints do servidor
│
├── package.json
├── package-look.json
├── READEME.md
├── server.js                # Camada de registros das rotas, cadastramento dos midweares e verificação de acesso.
└── db.js                    # Arquivo de conexão com o banco de dados em núvem
```

## 🔐 Autenticação

O sistema usa autenticalçai via Token TWT:
1. O usuário tem o login criado pelo administrador da insituição cadastrada
2. Acessa o `/` e faz o login com o email e senha cadastrados
3. Backend valida os dados de login e carrega as permissões de acesso do usuário conforme sua role de acesso
4. Backend retorna JWT
5. Todas as requisições (exceto a de login) passam pelo midweare de autenticação do token `Authorization: Bearer {jwt}`

### Fluxo Login

```jsx
// 1. Usuário submete formulário
POST /login
{
    "email": "user@gmail.com",
    "password": "12345..."
}

// 2. Backend valida e retorna JWT
{
    "jwtTonken": "easEjna21...",
    "sub": "UUID",
    "user": "user@gmail.com",
    "success": true,
    "route": "/main"
}
```

## 🛑 EndPoints

### Login (`/users`)
* Pública (não exige autenticação)
* Login do usuário
* Validação e redirecionamento

### Main Page (`/branches`)
* Dashboard com resumo do mês
* Pop-Up de gastos, receita, e saldo
* Gráfico com balanço anual de gastas

### Revenues Page (`/revenues`)
* CRUD de entradas
* Cadastro de entradas financeiras
* Barra de membros integrado a tabela members
* Filtragem com base no tipo e na data
* Barra de pesquisa (usa o nome do membro e a descrição para a busca)

### Expenses Page (`/expenses`)
* CRUD de despesas
* Cadastro de saidas financeiras
* Barra de beneficiários integrado a tabela companies
* Filtragem com base no tipo e na data
* Barra de pesquisa (usa o titulo e a descrição para a busca)

### Registe (`/register`)
* Cadastro de membros, companias (parceiros) e cartões (cartões de fidelidade)
* CRUD de membros, companias e cartões

### Reports (`/reports`)
* CRUD das especificações de renderizações do relatórios
* Botão de renderização do relatório

### Settings (`/settings`)
* Página com renderização condicional (precisa de role expecífica pra poder acessar)
* CRUD de usuários
* CRUD de setores
* CRUD de filiais
* CRUD de Roles e Permissions
