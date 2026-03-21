export const highlightText = (text, keyword) => {
  if (!keyword) return text;

  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");

  return text.split(regex).map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark key={i} className="bg-warning text-dark radius-4">
        {part}
      </mark>
    ) : (
      part
    )
  );
};