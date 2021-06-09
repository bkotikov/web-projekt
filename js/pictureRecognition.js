
const { createWorker } = require('tesseract.js');


const reg = async (pic) => {
    console.log("Start");
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const  { data: { text } } = await worker.recognize(pic);
    await worker.terminate();
    return text;
  }
    
    
    

module.exports = {
    reg,
}
