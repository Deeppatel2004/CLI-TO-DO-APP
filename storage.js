       const fs = require('fs');
       const FILE = 'todos.json';

       function load() {
         if (!fs.existsSync(FILE)) return [];
         return JSON.parse(fs.readFileSync(FILE, 'utf8'));
       }

       function save(todos) {
         fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
       }

       module.exports = { load, save };