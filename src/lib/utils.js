export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function isExternalLink(href) {
  return /^https?:|^mailto:|^tel:/.test(href);
}
