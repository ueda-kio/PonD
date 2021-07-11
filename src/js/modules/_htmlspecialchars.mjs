export const htmlspecialchars = (str) =>{
  return (`${str}`)
  .replace(/&/g,'&amp;')
  .replace(/"/g,'&quot;')
  .replace(/'/g,'&#039;')
  .replace(/</g,'&lt;')
  .replace(/>/g,'&gt;');
};