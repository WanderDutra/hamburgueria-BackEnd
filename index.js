const express = require('express')
const uuid = require('uuid')
const port = 3001
const app = express()
app.use(express.json())

const requests = []
const checkOrderCompleteId = (request, response, next) => {
    const { id } = request.params
    
    const index = requests.findIndex(orderComplete => orderComplete.id === id)
        if (index < 0) {
            
            return response.status(404).json({ error: 'order Not Found' })
        }
        
        request.orderCompleteIndex = index
        request.orderCompleteId = id
    
    
        next()}

app.post('/requests',  (request, response) => {
    const { order, clientName, price } = request.body
    const orderComplete = { id: uuid.v4(), order, clientName, price, status:'Em preparaçao' }
    requests.push(orderComplete)
    return response.status(201).json(orderComplete)
})
app.get('/requests', (request, response) => {
    return response.json(requests)

})
app.put('/requests/:id', checkOrderCompleteId, (request,response) => {
    const { order, clientName, price } = request.body
    const index = request.orderCompleteIndex
    const id = request.orderCompleteId
    const upOrder = {id,  order, clientName, price, status:'Em preparaçao' } 
    requests[index] = upOrder
    return response.json(upOrder)

})
app.delete('/requests/:id', checkOrderCompleteId, (request, response) => {

    const index = request.orderCompleteIndex

    requests.splice(index, 1)



    return response.status(204).json()

})
app.get('/requests/:id', checkOrderCompleteId, (request,response) => {
    const id = request.orderCompleteId
    const orderGet = requests.find  ((orderUp) => orderUp.id ===  id )
   return response.json(orderGet)
})
app.patch('/requests/:id', checkOrderCompleteId, (request,response) => {
    const index = request.orderCompleteIndex
    const id = request.orderCompleteId
    const orderGet = requests.find  ((orderUp) => orderUp.id ===  id )
    orderGet.status = "Pronto"
    
    return response.json(orderGet)




})


app.listen(3001, () => {
    console.log(`✨Server Start on Port ${port}`)
})