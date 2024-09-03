// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requireModule = (require as NodeRequire & { context: any }).context('./vi', true, /\.json$/);
const modules: Record<string, string> = {};

requireModule.keys().forEach((fileName: string) => {
  const module = fileName.replace(/(\.\/|\.json)/g, '');
  modules[module] = requireModule(fileName);
});

export default modules;
