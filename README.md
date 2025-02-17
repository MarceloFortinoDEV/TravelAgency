# Agência de viagens

Imagem da agência

# Front-end

## Instalação

- Baixe esse repositório

- Execute o comando `npm install` para instalar todas as dependências.

- Inicie o projeto

`npm run dev` (Precisa ser iniciado na porta 3000, antes do back-end)

### Rotas do projeto

| Rota                  | Permissão     | Sobre                                                      |
| --------------------- | ------------- | ---------------------------------------------------------- |
| /register             | Pública       | Registro de usuários.                                      |
| /login                | Pública       | Login de usuários.                                         |
| /dashboard            | Privada       | Gerenciamento de agências.                                 |
| /dashboard/details/id | Privada       | Detalhes de uma agência especifíca.                        |
| /dashboard/users      | Privada       | Gerenciamento de usuários (somente cargo administrador).   |

# Back-end

- Baixe esse repositório

- Baixe e instale o Docker (https://www.docker.com/)

- Execute o comando `npm install` na pasta do back-end para instalar todas as dependências.

- Execute o comando `docker-compose up d` para rodar o docker.

- Execute o comando `npm run dev` para iniciar o back-end.

### Subir banco de dados

- Para mexer manualmente no banco de dados execute `docker exec -it travelapi mysql -u root -p`

- Senha: traveladmin

- Na pasta back-end tem um arquivo start.sql, execute tabela por tabela para criar o banco de dados.

### Documentação

- Para acessar a documentação da api acesse: http://localhost:3001/docs

# Execução

- Para iniciar, crie uma conta no site: https://localhost:3000/register

- Por padrão a conta tem o cargo de ANALISTA, entre no banco de dados com as credências comentadas acima e execute o comando `UPDATE users SET role = 'ADMINISTRATOR' WHERE id = 1` para definir seu usuário como administrador e ter acesso a todas as funções.

- Faça o update antes de realizar o login, pois o cargo fica no token, se for gerado antes da alteração, será necessário realizar o login novamente.

- O administrador pode excluir agências e gerenciar os usuários.

- Após isso, na interface dashboard, crie, gerencie agências e na usuários crie usuários e gerencie-os.

### Modelo de CNPJ

CNPJ para testar: 15269388000106 (pode ser outro)

# Preenchimento automático utilizando BrasilAPI

- Na parte de criar uma agência após digitar o CNPJ ele pega o restante das informações utilizando BrasilAPI.

# Agradecimento

### Muito obrigado pela oportunidade!