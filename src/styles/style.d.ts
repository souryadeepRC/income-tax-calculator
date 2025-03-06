// globals.d.ts or style.d.ts
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
