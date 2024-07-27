export function formatCurrency(amount: number, currency: string) {
  const numberStyle = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: amount % 1 === 0 ? 0 : undefined,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  })
  return numberStyle.format(amount)
}
