export default function checkOverflow(el) {
  const currentOverflow = el.style.overflow;
  if (!currentOverflow || currentOverflow === 'visible') {
    el.style.overflow = 'hidden';
  }
  const isOverflowing =
    el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
  el.style.overflow = currentOverflow;
  return isOverflowing;
}
