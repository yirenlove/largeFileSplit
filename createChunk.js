import "./SparkMd5.js";
export default function createChunk(file, idx, chunkSize) {
  return new Promise((resolve) => {
    const start = idx * chunkSize;
    const end = start + chunkSize > file.size ? file.size : start + chunkSize;
    const fileReader = new FileReader();
    const Md5 = new SparkMD5.ArrayBuffer();
    fileReader.onload = (e) => {
    //   console.log(e.target);
      Md5.append(e.target.result);
      resolve({
        start,
        end,
        index: idx,
        hash: Md5.end(),
      });
    };
    fileReader.readAsArrayBuffer(file.slice(start, end));
  });
}
