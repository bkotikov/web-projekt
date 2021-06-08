const { text } = require('body-parser');
const { createWorker } = require('tesseract.js');

const worker = createWorker();
function reg(pic) {
    (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(pic);
        console.log(text);
        await worker.terminate();
      })();
    
}
module.exports = {
    reg,
}
