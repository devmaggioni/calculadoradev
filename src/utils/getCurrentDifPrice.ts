export default function getCurrentDifPrice(lvl: string, ls: any) {
  if (lvl === 'easy') return parseFloat(ls.getItem('c_easy') || '1000');
  if (lvl === 'medium') return parseFloat(ls.getItem('c_medium') || '2000');
  if (lvl === 'hard') return parseFloat(ls.getItem('c_hard') || '3000');
  return 0;
}
