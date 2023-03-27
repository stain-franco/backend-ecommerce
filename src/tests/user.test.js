const request = require('supertest');
const app = require('../app');
const USer = require('../models/User');

let userId;
let token;

test("POST /users should create a user", async()=>{
    const newUser = {
        firstName: "sebastian",
        lastName: "franco",
        email: "Sebas18pet@gmail.com",
        password: "sebastian1234",
        phone: "123456789"
    }
    const res = await request(app)
    .post("/users")
    .send(newUser);
    userId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newUser.firstName);
});

test("POST /users/login should do login", async()=>{
    const user = {
        email: "Sebas18pet@gmail.com",
        password: "sebastian1234",
    }
    const res = await request(app)
    .post("/users/login")
    .send(user);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.token).toBeDefined();
});

test("POST /users/login with invalid credentails should return 401", async()=>{
    const user = {
        email: "Sebas18pet@gmail.com",
        password: "sebastian123",
    }
    const res = await request(app)
    .post("/users/login")
    .send(user);
    expect(res.status).toBe(401);
});

test("GET /users should return all the user", async()=>{
    const res = await request(app)
    .get("/users")
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    // expect(res.body[0].?).toBeDefined();
});

test("PUT /users/:id should update one user", async()=>{
    const body = {
        firstName: "Sebastian",
        lastName: "Franco",
        email: "Sebas18pet@gmail.com",
        password: "sebastian1234",
        phone: "123456789"
    }
    const res = await request(app)
    .put(`/users/${userId}`).send(body)
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});


test("DELETE /users/:id should delete one user", async()=>{
    const res = await request(app).delete(`/users/${userId}`)
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(204);
});