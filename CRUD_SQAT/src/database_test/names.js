const client = require('./students.js');
async function getAllProducts(){
    try {
        const {rows: apellido} = await client.query(`
      SELECT * FROM products;
    `);
        return apellido; //ID
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts
};