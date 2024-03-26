export function hideSecretData(text: string) {
  return text.replace(/./g, "*");
}
