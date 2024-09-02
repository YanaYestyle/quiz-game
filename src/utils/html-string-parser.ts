export const htmlStringParser = (htmlString: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const decodedString = doc.documentElement.textContent
  return decodedString
}
