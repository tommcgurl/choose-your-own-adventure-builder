export default function splitContent(html) {
  return html
    .replace(/(\r\n\t|\n|\r\t)/gm, '')
    .match(/(<[^>]+>|[^<\s]+(?=( |<))|\s+)/gy);
}
