export default function splitContent(html) {
  return html
    .replace(/(\r\n\t|\n|\r\t|^\s+)/gm, '')
    .match(/(<[^>]+>|[^<\s]+(?=( |<))|\s+)/gy);
}
