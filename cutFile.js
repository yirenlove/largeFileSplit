const CHUNK_SIZE = 3 * 1024 * 1024; //3M
const THREAT_NUM = navigator.hardwareConcurrency || 4;
export default function cutFile(file){
    return new Promise(async (resolve, reject)=>{
        const chunk_num = Math.ceil(file.size / CHUNK_SIZE);
        const every_task = Math.ceil(chunk_num / THREAT_NUM);
        const results = []; 
        let finishedCount = 0;
        for(let i=0;i<THREAT_NUM;i++){
            let start = i*every_task;
            let end = start+every_task>chunk_num?chunk_num:start+every_task;
            const worker = new Worker('./worker.js',{type:'module'});
            worker.postMessage({
                file,
                start,
                end,
                CHUNK_SIZE,
            })
            worker.addEventListener('message',(e)=>{
                for(let i=start;i<end;i++){
                    results[i] = e.data[i-start];
                }
                finishedCount++;
                if(finishedCount===THREAT_NUM){
                    resolve(results);
                }
                worker.terminate();
            })
        }
    })
}