const req = require('supertest')
const app = require('../app')
const { connect, disconnect, cleanup } = require('../db')
const User = require('../models/user.model')
const faker = require('faker')

describe('user',() => {
    beforeAll(() => { connect() })
    beforeEach(() => { cleanup() })
    afterAll(() => { disconnect() })

    const user= {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name:  faker.name.firstName(),
        lastName: faker.name.lastName()
    }

    it('should signup user correctly', async() => {
        const res = await req(app).post('/users/signup').send(user)
    
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('token')
        expect(res.body.token).toMatch(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
    })

    it('should not signup user if email is not provided', async() => {
        const res = await req(app).post('/users/signup').send({...user, email:''})
        
        expect(res.statusCode).toBe(400)
        expect(res.body.error.message).toMatch(/Email is required/i)
    })
    
    it('should not signup user if email is invalid', async() => {
        const res = await req(app).post('/users/signup').send({...user, email:faker.name.firstName()})

        expect(res.statusCode).toBe(400)
        expect(res.body.error.message).toMatch(/Invalid email/i)
    })

    it('should not signup user if email is already in use', async() => {
        await User.create(user)
        const res = await req(app).post('/users/signup').send(user)

        expect(res.statusCode).toBe(400)
        expect(res.body.error.message).toMatch(/email entered is already in use/i)
    })

    it('should not signup user if password is not provided', async() => {
        const res = await req(app).post('/users/signup').send({...user, password:''})

        expect(res.statusCode).toBe(400)
        expect(res.body.error.message).toMatch(/Password is required/i)
    })

    it('should not signup user if password has less than 6 characters', async() => {
        const diferentPassword =Math.ceil(Math.random() * 10000)
        const res = await req(app).post('/users/signup').send({...user, password:diferentPassword })

        expect(res.statusCode).toBe(400)
        expect(res.body.error.message).toMatch(/Password must contain at least 6 characters/i)
    })

    it('should signin user correctly', async() => {
        await User.create(user)
        const res = await req(app).post('/users/signin').send(user)

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('token')
        expect(res.body.token).toMatch(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
    })

    it('should not signin user if email does not exist', async() => {
        const res = await req(app).post('/users/signin').send(user)

        expect(res.statusCode).toBe(400)
        expect(res.body.message).toMatch(/Email or password is invalid/i)
    })

    it('should not signin user if password is incorrect', async() => {
        await User.create(user)
        const res = await req(app).post('/users/signin').send({...user, password:faker.internet.password()})

        expect(res.statusCode).toBe(400)
        expect(res.body.message).toMatch(/Email or password is invalid/i)
    })
})