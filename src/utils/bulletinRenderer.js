import convert from "xml-js";
import fs from "fs";
import nodeZip from "node-zip";
const zip = nodeZip();

export const generateODT = (data, pupil) => {
  let toPrint = {
    "text:h": { _attributes: { "style-name": "Headin_2" }, _text: "YOLO" }
  };
  let odt = convert.js2xml(toPrint, { compact: true });
  console.log(odt);
  fs.writeFile(
    "content.xml",
    '<?xml version="1.0" encoding="UTF-8"?>' + odt,
    function(err) {
      if (err) {
        return console.log(err);
      }

      console.log(odt);
      zip.file("content.xml", odt);
      zip.file(
        "meta.xml",
        fs.readFileSync("./src/renderer/assets/odtTemplate/meta.xml")
      );
      zip.file(
        "mimetype",
        fs.readFileSync("./src/renderer/assets/odtTemplate/mimetype")
      );
      zip.file(
        "settings.xml",
        fs.readFileSync("./src/renderer/assets/odtTemplate/settings.xml")
      );
      zip.file(
        "styles.xml",
        fs.readFileSync("./src/renderer/assets/odtTemplate/styles.xml")
      );
      let zippedData = zip.generate({ base64: false, compression: "DEFLATE" });
      fs.writeFileSync("test.odt", zippedData, "binary");
      console.log("The file was saved!");
    }
  );
};

export const generateMD = (data, pupil) => {
  let toPrint = `# Bulletin Scolaire\nElève : ${data.pupils[pupil].firstname} ${
    data.pupils[pupil].lastname
  }\n## Compétences acquises :\n`;
  for (let category of data.skills) {
    console.log(category);
    if (data.pupils[pupil].skills.find(skill => skill.cat === category.num)) {
      toPrint += `| ${category.name} |\n| ------ |\n`;
      for (let skillRef of category.list) {
        if (
          data.pupils[pupil].skills.find(
            skill => skill.cat === category.num && skill.num === skillRef.num
          )
        ) {
          toPrint += `| ${skillRef.name} |\n`;
        }
      }
      toPrint += "\n";
    }
  }
  download(toPrint, "bulletin.md", "text");
};

function download(data, filename, type) {
  let file = new Blob([data], { type: type });
  let a = document.createElement("a"),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}
