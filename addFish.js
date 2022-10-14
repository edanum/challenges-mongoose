const argv = require("minimist-lite")(process.argv.slice(2));
console.log(argv);

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/challenges-mongoose");
  console.log("connected");

  const fischSchema = mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: String },
  });

  const Fish = mongoose.model("fish", fischSchema);

  const newFish = Fish({
    name: argv[1],
    description: argv[2],
    price: argv[3],
    category: argv[4],
  });

  await newFish.save();

  process.exit;
}
