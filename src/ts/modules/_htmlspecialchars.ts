/**
 *@summary 文字列から特殊文字をエスケープする（主にユーザーから入力された文字列などに使用）
 * @param {string} str エスケープする文字列
 * @returns {string}
 */
export const htmlspecialchars = (str: string): string => {
  return (`${str}`)
  .replace(/&/g,'&amp;')
  .replace(/"/g,'&quot;')
  .replace(/'/g,'&#039;')
  .replace(/</g,'&lt;')
  .replace(/>/g,'&gt;');
};