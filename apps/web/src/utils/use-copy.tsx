export function useCopyTable(tableId: string, callback?: () => void) {
  return () => {
    const table = document.querySelector(`#${tableId}`);
    if (table) {
      const range = document.createRange();
      const selection = document.getSelection();

      selection?.removeAllRanges();

      try {
        range.selectNodeContents(table);
        selection?.addRange(range);
      } catch (e) {
        range.selectNode(table);
        selection?.addRange(range);
      }

      const string = selection?.toString();
      if (string && navigator.clipboard) {
        navigator.clipboard.writeText(string.replace(/,/g, "")).then(callback);
      }
      selection?.removeAllRanges();
    }
  };
}
