export const chunkString = (str: string, chunkSize: number) => {
  return str.match(new RegExp('.{1,' + chunkSize + '}', 'g'))
}
