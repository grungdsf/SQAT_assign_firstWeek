require('dotenv').config();
const { getAllProducts } = require('../database_check');
const students = require('CRUD_SQAT/src/database_test/database_check.js');

let studentsFromDatabase, studentsFromAdapter;
describe('Database', () => {
    beforeAll(async() => {
        students.connect();
        // "control" test data
        const {rows} = await students.query(`
      SELECT * FROM products;
    `);
        studentsFromDatabase = rows;
        studentsFromAdapter = await getAllStudents();
    })
    afterAll(async() => {
        students.end();
    })
    describe('getAllStudents', () => {
        it('returns an array', async () => {
            expect(Array.isArray(studentsFromAdapter)).toBe(true);
        })
        it('selects and returns ', async () => {
            expect(studentsFromAdapter).toEqual(studentsFromDatabase);
        })
        it('each students has a ID', async () => {
            const [product] = studentsFromAdapter;
            expect(product).toHaveProperty('name');
        })
    })

})