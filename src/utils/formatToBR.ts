export default function formatToBR(value: string | number) {
  return parseFloat(value.toString()).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
