
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dva: {
        immer: true
      },
      dynamicImport: false,
      title: 'cx-create-umi',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
      
    }],
  ],
}
