import {
  MAX_SEATS,
  MIN_SEATS,
  PLANS,
  type Billing,
  type ModelAccess,
  type PlanId,
  type PriceBand,
} from "@/lib/pricing.config";

export interface BreakdownRow {
  from: number;
  to: number | null;
  seatsInBand: number;
  pricePerSeat: number;
  subtotal: number;
}

export interface PricingBreakdown {
  rows: BreakdownRow[];
  total: number;
}

const toCents = (amount: number) => Math.round(amount * 100);

export function clampSeats(value: number) {
  if (!Number.isFinite(value)) return MIN_SEATS;
  return Math.min(MAX_SEATS, Math.max(MIN_SEATS, Math.round(value)));
}

/** Average Standard seat price for the whole team, shown on the plan card. */
export function getAverageStandardSeatPrice(
  plan: PlanId,
  seats: number,
  billing: Billing,
  access: ModelAccess,
) {
  const count = clampSeats(seats);
  const { total } = calculateBreakdown(plan, count, billing, access);
  return Math.round((total / count) * 100) / 100;
}

/** Starting Standard seat price: first band, or the flat BYOK price. */
export function getStandardSeatPrice(
  plan: PlanId,
  billing: Billing,
  access: ModelAccess,
) {
  const { standardBands, byokSeat } = PLANS[plan];
  return access === "byok" ? byokSeat[billing] : standardBands[0][billing];
}

export function getPowerSeatPrice(plan: PlanId, billing: Billing) {
  return PLANS[plan].powerSeat?.[billing] ?? null;
}

function seatsInBand(band: PriceBand, seats: number) {
  const upper = band.to === null ? seats : Math.min(seats, band.to);
  return Math.max(0, upper - band.from + 1);
}

/**
 * Graduated Standard seat pricing: like tax brackets, each band price only
 * applies to the seats inside that band. BYOK seats have one flat price.
 */
export function calculateBreakdown(
  plan: PlanId,
  seats: number,
  billing: Billing,
  access: ModelAccess,
): PricingBreakdown {
  const count = clampSeats(seats);

  if (access === "byok") {
    const price = PLANS[plan].byokSeat[billing];
    const subtotal = (toCents(price) * count) / 100;
    return {
      rows: [
        { from: 1, to: null, seatsInBand: count, pricePerSeat: price, subtotal },
      ],
      total: subtotal,
    };
  }

  const rows = PLANS[plan].standardBands.map((band) => {
    const inBand = seatsInBand(band, count);
    return {
      from: band.from,
      to: band.to,
      seatsInBand: inBand,
      pricePerSeat: band[billing],
      subtotal: (toCents(band[billing]) * inBand) / 100,
    };
  });

  const totalCents = rows.reduce(
    (sum, row) => sum + toCents(row.pricePerSeat) * row.seatsInBand,
    0,
  );

  return { rows, total: totalCents / 100 };
}
