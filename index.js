/*

- Query params =>  meusite.com/users?name=jefferson&age=37 //FILTROS
- Route params =>  /users/2   // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO ** SNIPER
- Request Body =>  {"name": "Jefferson", "age": 37}

-GET            => Buscar informações no back-end
-POST           => Cria informações no back-end
-PUT / PATCH    => alterar/atualizar informações no back-end
-DELETE         => Deletar informações no back-end

Middleware      => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição

*/

import express, { json } from 'express'

const app = express()
app.use(express.json())

const users = []

app.get('/users', (req, res) => {
    res.status(200).json(users)
})


app.post('/users', (req, res) => {
    const { name, age } = req.body
    const user = { id: crypto.randomUUID(), name, age }
    users.push(user)

    res.status(201).json(users)
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id
    const { name, age } = req.body

    const updateUser = { id, name, age }

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return res.status(404).json({ message: "user not found" })
    }

    users[index] = updateUser

    res.status(200).json(users)
})


app.delete('/users/:id', (req, res) => {
    const id = req.params.id

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return res.status(404).json({ message: "user not found" })
    }

    users.splice(index, 1)

    res.status(204).json(users)
})


app.listen(3000)