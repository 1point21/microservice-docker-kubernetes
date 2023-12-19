const app = require("../app")
const request = require("supertest")

describe('get healthcheck', () => {
    it('200: should return message of ok when endpoint hit', () => {
        return request(app)
        .get("/api/fridge/healthcheck")
        .expect(200)
        .then(({body}) => {
            expect(body.health).toBe("OK")
        })
    });
});

describe('get fridge contents', () => {
    it('200: should return the contents of the fridge when endpoint hit', () => {
        return request(app)
        .get("/api/fridge")
        .expect(200)
        .then(({body}) => {
            const {contents} = body
            expect(contents.length).toBe(3)
            contents.forEach(item => {
                expect(item).toHaveProperty('id', expect.any(Number))
                expect(item).toHaveProperty('item', expect.any(String))
                expect(item).toHaveProperty('quantity', expect.any(Number))
            });
        })
    });
});

describe('post fridge contents', () => {
    it('201: should add an item to the fridge and return that item', () => {
        const newItem = {item: "chocolate", quantity: 7}
        return request(app)
        .post("/api/fridge")
        .send(newItem)
        .expect(201)
        .then(({body}) => {
            const {addedItem} = body
            expect(addedItem).toMatchObject({
                id: expect.any(Number),
                item: "chocolate",
                quantity: 7
            })
        })
    });
});

describe('delete fridge item', () => {
    it('201: should delete item according to id', () => {
        
    });
});