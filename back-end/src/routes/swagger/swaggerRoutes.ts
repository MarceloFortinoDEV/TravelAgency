import { Router } from "express";

const router = Router();

/**
 * @swagger
 *   tags:
 *   name: Autenticação
 *   description: Autenticação de usuários.
 */

/**
 * @swagger
 *   tags:
 *   name: Agências
 *   description: Gerenciamento de agências.
 */

/**
 * @swagger
 *   tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários.
 */

/**
 * @swagger
 * /agency:
 *   get:
 *     summary: Retorna uma lista de todas as agências
 *     tags: [Agências]
 *     description: Retorna uma lista de todas as agências
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: PROJETO GILEADE
 *                   socialName:
 *                     type: string
 *                     example: Associação Projeto Gileade
 *                   cnpj:
 *                     type: string
 *                     example: 15269388000106
 *                   stateRegister:
 *                     type: string
 *                     example: 110042490114
 *                   cnpjStatus:
 *                     type: string
 *                     example: ATIVA
 *                   foundationDate:
 *                     type: string
 *                     example: 2011-12-29T00:00:00.000Z
 *       500:
 *         description: Erro ao buscar.
 *       401:
 *         description: Não autorizado. Token não encontrado.
 *       400:
 *         description: O JWT não é válido.
 */

/**
 * @swagger
 * /agency/details/{id}:
 *   get:
 *     summary: Retorna os dados de uma agência especifíca
 *     tags: [Agências]
 *     description: Retorna os dados de uma agência especifíca
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: PROJETO GILEADE
 *                   socialName:
 *                     type: string
 *                     example: Associação Projeto Gileade
 *                   cnpj:
 *                     type: string
 *                     example: 15269388000106
 *                   stateRegister:
 *                     type: string
 *                     example: 110042490114
 *                   cnpjStatus:
 *                     type: string
 *                     example: ATIVA
 *                   foundationDate:
 *                     type: string
 *                     example: 2011-12-29T00:00:00.000Z
 *       500:
 *         description: Erro ao buscar.
 *       401:
 *         description: Não autorizado. Token não encontrado.
 *       400:
 *         description: O JWT não é válido.
 */

/**
 * @swagger
 * /agency/create:
 *   post:
 *     summary: Cria uma nova agência.
 *     tags: [Agências]
 *     description: Cria uma nova agência.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: PROJETO GILEADE
 *               socialName:
 *                 type: string
 *                 example: ASSOCIACAO PROJETO GILEADE
 *               cnpj:
 *                 type: string
 *                 example: 15269388000106
 *               stateRegister:
 *                 type: string
 *                 example: 110042490114
 *               cnpjStatus:
 *                 type: string
 *                 example: ATIVA
 *               foundationDate:
 *                 type: string
 *                 example: 2011-12-29
 *     responses:
 *       200:
 *         description: Agência criada com sucesso.
 *       500:
 *         description: Erro ao adicionar.
 *       401:
 *         description: Não autorizado. Token não encontrado.
 *       400:
 *         description: O JWT não é válido.
 */

/**
 * @swagger
 * /agency/update:
 *   put:
 *     summary: Atualiza os dados de uma agência.
 *     tags: [Agências]
 *     description: Atualiza os dados de uma agência.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: PROJETO GILEADE
 *               socialName:
 *                 type: string
 *                 example: ASSOCIACAO PROJETO GILEADE
 *               cnpj:
 *                 type: string
 *                 example: 15269388000106
 *               stateRegister:
 *                 type: string
 *                 example: 110042490114
 *               cnpjStatus:
 *                 type: string
 *                 example: ATIVA
 *               foundationDate:
 *                 type: string
 *                 example: 2011-12-29T00:00:00.000Z
 *     responses:
 *       200:
 *         description: Agência atualizada com sucesso.
 *       500:
 *         description: Erro ao buscar.
 *       401:
 *         description: Não autorizado. Token não encontrado.
 *       400:
 *         description: O JWT não é válido.
 */

/**
 * @swagger
 * /agency/delete/${id}:
 *   delete:
 *     summary: Exclui uma agência.
 *     tags: [Agências]
 *     description: Exclui uma agência. (Somente usuários com cargo ADMINISTRATOR)
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT (ADMINISTRATOR)
 *     responses:
 *       200:
 *         description: Agência excluida com sucesso.
 *       500:
 *         description: Erro ao excluir.
 *       401:
 *         description: Não autorizado. Token não encontrado.
 *       400:
 *         description: O JWT não é válido.
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cria um novo usuário.
 *     tags: [Autenticação]
 *     description: Cria um novo usuário com cargo analista e retorna um token com name, email e role.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Marcelo Fortino
 *               email:
 *                 type: string
 *                 example: marceloofortino@gmail.com
 *               password:
 *                 type: string
 *                 example: Deuséfiel
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso.
 *       500:
 *         description: Erro ao criar.
 *       400:
 *         description: Erro ao criar usuário, não foram enviados todos os dados..
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz um login de um usuário.
 *     tags: [Autenticação]
 *     description: Cria um novo usuário.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: marceloofortino@gmail.com
 *               password:
 *                 type: string
 *                 example: Deuséfiel
 *     responses:
*       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   jwtToken:
 *                     type: string
 *                     example: token
 *       500:
 *         description: Erro interno.
 *       400:
 *         description: Usuário não encontrado.
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retorna uma lista de todos os usuários.
 *     tags: [Usuários]
 *     description: Retorna uma lista de todos os usuários. (Somente usuários com cargo ADMINISTRATOR)
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT (ADMINISTRATOR)
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: Marcelo Fortino
 *                   role:
 *                     type: string
 *                     example: ADMINISTRATOR | ANALIST
 *       500:
 *         description: Erro ao buscar.
 *       401:
 *         description: Não autorizado. Token não encontrado.
 *       400:
 *         description: O JWT não é válido.
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Cria um novo usuário. 
 *     tags: [Usuários]
 *     description: Cria um novo usuário. (Somente usuários com cargo ADMINISTRATOR)
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT (ADMINISTRATOR)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Marcelo Fortino
 *               email:
 *                 type: string
 *                 example: marceloofortino@gmail.com
 *               password:
 *                 type: string
 *                 example: Deuséfiel
 *               role:
 *                 type: string
 *                 example: ADMINISTRATOR | ANALIST
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso.
 *       500:
 *         description: Erro ao adicionar.
 *       401:
 *         description: Não autorizado. Token não encontrado.
 *       400:
 *         description: O JWT não é válido.
 */

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Atualiza os dados de um usuário.
 *     tags: [Usuários]
 *     description: Atualiza os dados de um usuário. (Somente usuários com cargo ADMINISTRATOR)
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT (ADMINISTRATOR)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Marcelo Fortino
 *               role:
 *                 type: string
 *                 example: ADMINISTRATOR | ANALIST
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       500:
 *         description: Erro ao buscar.
 *       401:
 *         description: Não autorizado. Token não encontrado.
 *       400:
 *         description: O JWT não é válido.
 */

/**
 * @swagger
 * /user/delete/${id}:
 *   delete:
 *     summary: Exclui um usuário.
 *     tags: [Usuários]
 *     description: Exclui um usuário. (Somente usuários com cargo ADMINISTRATOR)
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT (ADMINISTRATOR)
 *     responses:
 *       200:
 *         description: Usuário excluido com sucesso.
 *       500:
 *         description: Erro ao excluir.
 *       401:
 *         description: Não autorizado. Token não encontrado.
 *       400:
 *         description: O JWT não é válido.
 */

export default router;