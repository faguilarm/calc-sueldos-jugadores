const sample1 = require("../../utils/samples/simple1.json");
const sample2 = require("../../utils/samples/simple2.json");

export default (req, res) => {
  res.status(200).json([
    { "label": "sample1", "value": sample1 },
    { "label": "sample2", "value": sample2 }
  ]);
}