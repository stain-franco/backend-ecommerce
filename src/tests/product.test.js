const app = require("../app");
const request = require("supertest");
const ProductImg = require("../models/ProductImg");
require("../models");

let token;
let productId;

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

test("POST /products should create one product", async()=>{
    const product = {
        title: "Iphone",
        description: "shgdiwu",
        price: "200"
    }
    const res = await request(app)
    .post("/products")
    .send(product)
    .set('Authorization',`Bearer ${token}`);
    productId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(product.title);
});

test("GET /products should return all products", async()=>{
    const res = await request(app)
    .get("/products")
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("GET /products/:id should return one product", async() => {
    const res = await request(app).get(`/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Iphone")
});

test("POST /products/:id/images should set the products images", async()=>{
    const image = await ProductImg.create({url: "lope", filename: "hope"});
    const res = await request(app)
    .post(`/products/${productId}/images`)
    .send([image.id])
    .set('Authorization',`Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT /products/:id should update one product", async()=>{
    const body = {
        title: "Iphone",
        description: "shgdiwu",
        price: "200"
    }
    const res = await request(app)
    .put(`/products/${productId}`).send(body)
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("DELETE /products/:id should delete one product", async()=>{
    const res = await request(app).delete(`/products/${productId}`)
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(204);
});
