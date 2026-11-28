/** Display helpers shared by the admin screens. */

export function formatCurrency(amount: number, symbol = "$"): string {
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** "$2.1M" for large totals, "$1,240" otherwise (dashboard card). */
export function formatCurrencyCompact(amount: number, symbol = "$"): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 })}M`;
  }
  return `${symbol}${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/** "08 Jan 2026 · 12:10 PM" */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const date = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${date} · ${time}`;
}
