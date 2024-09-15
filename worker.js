
import createChunk from "./createChunk.js";
self.addEventListener('message',async (e)=>{
    // console.log(e.data,555)
    const {file,start, end,CHUNK_SIZE} = e.data;
    let allPromise = []
    for(let i=start;i<end;i++){
        // !!!不要这样做，这样做还是在串行
        // const chunk = await createChunk(file,i,CHUNK_SIZE)
        allPromise.push(createChunk(file,i,CHUNK_SIZE))
    }
    const chunks = await Promise.all(allPromise)
    postMessage(chunks)
})