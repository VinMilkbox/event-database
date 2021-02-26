const sampleData = require('../sampleData/single.json');
const {parseData} = require('../src/index');
test('Passing EventJson return OBJ', () => {
    let testIt = parseData(sampleData);
});