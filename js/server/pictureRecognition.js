const sizeOf = require('image-size')
const { createWorker } = require('tesseract.js');


const reg = async (pic) => {
    console.log("Start");
    const dimensions = sizeOf(pic);
    console.log(~~(dimensions.height/4));
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const  { data: { text } } = await worker.recognize(pic, {
      rectangle: { top: 0, right: 0, width: dimensions.width - 1, height: dimensions.height/8},
    });
    await worker.terminate();
    return text;
  }
    
    
    

module.exports = {
    reg,
}
