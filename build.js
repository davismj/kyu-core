var fs = require("fs"),
	browserify = require("browserify"),
	to5ify = require("6to5ify");

browserify({ debug: true })
  .transform(to5ify)
  .require("./src/main.js", { entry: true })
  .bundle()
  .pipe(fs.createWriteStream("./dist/kyu-core.js"));