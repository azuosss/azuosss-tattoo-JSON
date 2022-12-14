const request = require('supertest')
const app = require('../src/app')

describe('Testing materials routes', () => {

  it('GET /materials ', async () =>{
    const response = await request(app)
		.get('/materials')
    expect(response.body).toHaveProperty('result')
  })

  it('POST /materials', async () => {
    const response = await request(app)
    .post('/materials')
    .send({
      nome:'agulha',
      marca:'barata',
      precoEntrada: '4$',
      quantidade: '4'
    })
    expect(response.body).toHaveProperty('message')
  })

  it('POST /materials', async () => {
    const response = await request(app)
    .post('/materials')
    .send({
      nome:'biqueira',
      marca:'barata',
      precoEntrada: '55$',
      quantidade: '10'
    })
    expect(response.body).toHaveProperty('message')
  })

  it('PUT: /materials/id', async () => {
    const response = await request(app)
		.put('/materials/5')
		.send({
      nome:'maquina',
      marca:'azuosss',
      precoEntrada: '250$',
      quantidade: '1'
    })
    expect(response.body).toHaveProperty('message')
  })

  it('DELETE /materials/id', async () =>{
    const response = await request(app)
    .delete('/materials/1')
    expect(response.body).toHaveProperty('message')
  })
})