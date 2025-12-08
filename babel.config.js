const path = require("path");
const directory = path.resolve();

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "babel-plugin-react-compiler",
        {
          logger: {
            logEvent(filename, event) {
              switch (event.kind) {
                case "CompileSuccess": {
                  console.log(`✅ Compiled: ${filename}`.replace(directory, ""));
                  break;
                }
                case "CompileError": {
                  console.log(`❌ CompileError: ${filename}`.replace(directory, ""));
                  console.log(`   Reason: ${event.detail?.reason ?? "unknown"}`);
                  if (event.detail?.loc) {
                    console.log(
                      `   Location: line ${event.detail.loc.start?.line ?? "?"}, col ${event.detail.loc.start?.column ?? "?"}`,
                    );
                  }
                  break;
                }
              }
            },
          },
        },
      ],
    ],
  };
};
