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

  if (!argv["c"]) {
    console.log("Nothing was saved. Please provide a category for the fish");
    process.exit;
  } else {
    const newFish = Fish({
      name: argv["n"] || "unknown name",
      description: argv["d"] || "This is an unknown fish",
      price: argv["p"] || 0,
      category: argv["c"] || "unknown category",
    });

    await newFish.save();

    console.log("Following Fish added");
    console.log(newFish);

    process.exit;
  }
}
