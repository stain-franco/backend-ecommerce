const app = require("../app");
const request = require("supertest");
const Product = require("../models/Product");

let token;
let cartId;

beforeAll(async()=>{
    const credentials = {
        email: "test@gmail.com",
        password: "test1234"
    }
    const res = await request(app)
    .post("/users/login")
    .send(credentials);
    token = res.body.token;
});


test("POST /carts should create one cart", async()=>{
    const product = await Product.create( {
        title: "Iphone",
        description: "shgdiwu",
        price: "200"
    })
    const cart = {
        quantity: 1,
        productId: product.id
    }
    const res = await request(app)
    .post("/carts")
    .send(cart)
    .set('Authorization',`Bearer ${token}`);
    await product.destroy();
    cartId = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body.quantity).toBe(cart.quantity);
});

// test("GET /carts should return all cart", async()=>{
//     const res = await request(app)
//     .get("/carts")
//     expect(res.status).toBe(200);
//     expect(res.body).toHaveLength(1);
// });

test("PUT /carts/:id should update one cart", async()=>{
    const product = await Product.create( {
        title: "Iphone",
        description: "shgdiwu",
        price: "200"
    })
    const body = {
        quantity: 1,
        productId: product.id
    }
    const res = await request(app)
    .put(`/carts/${cartId}`).send(body)
    .set('Authorization',`Bearer ${token}`)
    await product.destroy();
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(body.quantity);
});

test("DELETE /carts should delete one cart", async()=>{
    const res = await request(app).delete(`/carts/${cartId}`)
    .set('Authorization',`Bearer ${token}`)
    expect(res.statusCode).toBe(204);
});