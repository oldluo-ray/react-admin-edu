const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias,
} = require("customize-cra");

const { resolve } = require("path");

function resolvePath(path) {
  return resolve(__dirname, "src", path);
}

module.exports = override(
  // 按需加载
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  // 自定义主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#1DA57A",
    },
  }),
  // 添加装饰器语法
  // yarn add @babel/plugin-proposal-decorators --dev
  addDecoratorsLegacy(),
  // 路径简写 / 路径别名
  addWebpackAlias({
    "@utils": resolvePath("utils"),
    "@api": resolvePath("api"),
    "@comps": resolvePath("components"),
    "@assets": resolvePath("assets"),
    "@pages": resolvePath("pages"),
    "@redux": resolvePath("redux"),
    "@conf": resolvePath("config"),
  })
);
