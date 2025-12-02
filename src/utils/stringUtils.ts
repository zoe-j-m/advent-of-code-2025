export const chunkString = (str: string, chunkSize: number) => {
  return str.match(new RegExp('.{1,' + chunkSize + '}', 'g'))
}

export const getLinesCommaSeparated = (data: string[]): string[][] => {
  return data.map((a) => a.split(','))
}
