require('dotenv').config();
const { getAllProducts } = require('../database_check');
const students = require('CRUD_SQAT/src/database_test/database_check.js');

let productsFromDatabase, productsFromAdapter;
describe('Database', () => {
    beforeAll(async() => {
        students.connect();
        // "control" test data
        const {rows} = await students.query(`
      SELECT * FROM products;
    `);
        productsFromDatabase = rows;
        productsFromAdapter = await getAllProducts();
    })
    afterAll(async() => {
        students.end();
    })
    describe('getAllStudents', () => {
        it('returns an array', async () => {
            expect(Array.isArray(productsFromAdapter)).toBe(true);
        })
        it('selects and returns ', async () => {
            expect(productsFromAdapter).toEqual(productsFromDatabase);
        })
        it('each students has a ID', async () => {
            const [product] = productsFromAdapter;
            expect(product).toHaveProperty('name');
        })
    })

})