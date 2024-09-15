import cutFile from "./cutFile.js";

const uploadDom = document.querySelector("#file");

uploadDom.addEventListener("change", async function (e) {
  console.log(e.target.files[0]);
  console.time("cutFile");
  const chunks = await cutFile(e.target.files[0]);
  console.timeEnd("cutFile");
  console.log(chunks);
});

