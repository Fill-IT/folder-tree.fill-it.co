export function asciiToIndented(text: string): string {
  if (!text.trim()) return "";

  const lines = text.split("\n").filter((line) => line.trim());
  let result = "";

  lines.forEach((line) => {
    if (line.trim() === "." || !line.trim()) return;
    const match = line.match(/^(.*?)(├──|└──)\s*(.*)$/);
    if (match) {
      const [, prefix, , name] = match;
      const depth = (prefix.match(/(│ {3}| {4})/g) || []).length;
      const cleanLine = name.replace(/\/$/, "");
      const indentation = "\t".repeat(depth);
      result += indentation + cleanLine + "\n";
    }
  });

  return result.trim();
}
