const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');

let token;
let purchaseId;

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

// test("POST /purchases should create one purchase", async()=>{
//     const product = await Product.create( {
//         title: "Iphone",
//         description: "shgdiwu",
//         price: "200"
//     })
//     const body = {
//         quantity: 1,
//         productId: product.id
//     }
//     const res = await request(app)
//     .post("/purchases")
//     .send(body)
//     .set('Authorization',`Bearer ${token}`);
//     purchaseId = res.body.id;
//     console.log(res.body)
//     await product.destroy();
//     expect(res.status).toBe(201);
//     expect(res.body.quantity).toBe(product.quantity);
// });


test("GET /purchases should return all the purchase", async()=>{
    const res = await request(app)
    .get("/purchases")
    .set('Authorization',`Bearer ${token}`)
    console.log(res.body)
    expect(res.status).toBe(200);
    // expect(res.body).toHaveLength(1);
});