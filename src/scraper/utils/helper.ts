export let currentEle = (tag: string, data: any) => data.is(tag);

export const prettifyTitle = (data: any, textToRemove: string) => {
  return data.text().replaceAll(textToRemove, "");
};
