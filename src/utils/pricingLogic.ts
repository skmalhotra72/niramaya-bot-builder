// NirAmaya Pathlabs - Pricing, Discount & Home Collection Logic

export interface LineItem {
  code: string;
  name: string;
  mrp: number;
  maxDiscount: number;
  quantity?: number;
}

export interface PricingResult {
  lineItems: {
    code: string;
    name: string;
    mrp: number;
    discountApplied: number;
    finalPrice: number;
    quantity: number;
  }[];
  orderTotal: number;
  totalDiscount: number;
  homeCollectionCharge: number;
  finalPayable: number;
  isFreeCollection: boolean;
}

export type DiscountTier = 'standard' | 'negotiated' | 'maximum';

export const DISCOUNT_RATES = {
  standard: 0.20, // 20%
  negotiated: 0.25, // 25%
  maximum: 1.0 // Up to max discount per item
};

// Home collection charge slabs (based on order total after discount)
export const HOME_COLLECTION_SLABS = [
  { min: 600, charge: 0 },      // Free above ₹600
  { min: 400, charge: 100 },    // ₹100 for ₹400-₹599
  { min: 200, charge: 125 },    // ₹125 for ₹200-₹399
  { min: 100, charge: 150 },    // ₹150 for ₹100-₹199
  { min: 0, charge: 200 }       // ₹200 for below ₹100
];

export function calculatePricing(
  items: LineItem[],
  discountTier: DiscountTier = 'standard'
): PricingResult {
  const lineItems = items.map(item => {
    const quantity = item.quantity || 1;
    const unitMrp = item.mrp;
    
    // Calculate discount per unit
    let discountRate: number;
    if (discountTier === 'maximum') {
      discountRate = Math.min(item.maxDiscount / 100, 1); // Don't exceed max discount
    } else {
      const baseRate = DISCOUNT_RATES[discountTier];
      discountRate = Math.min(baseRate, item.maxDiscount / 100); // Don't exceed max discount
    }
    
    const discountPerUnit = unitMrp * discountRate;
    const finalPricePerUnit = unitMrp - discountPerUnit;
    
    return {
      code: item.code,
      name: item.name,
      mrp: unitMrp * quantity,
      discountApplied: discountPerUnit * quantity,
      finalPrice: finalPricePerUnit * quantity,
      quantity
    };
  });
  
  // Calculate totals
  const orderTotal = lineItems.reduce((sum, item) => sum + item.mrp, 0);
  const totalDiscount = lineItems.reduce((sum, item) => sum + item.discountApplied, 0);
  const orderTotalAfterDiscount = orderTotal - totalDiscount;
  
  // Calculate home collection charge
  const homeCollectionCharge = calculateHomeCollectionCharge(orderTotalAfterDiscount);
  const isFreeCollection = homeCollectionCharge === 0;
  
  const finalPayable = orderTotalAfterDiscount + homeCollectionCharge;
  
  return {
    lineItems,
    orderTotal,
    totalDiscount,
    homeCollectionCharge,
    finalPayable,
    isFreeCollection
  };
}

export function calculateHomeCollectionCharge(orderTotal: number): number {
  for (const slab of HOME_COLLECTION_SLABS) {
    if (orderTotal >= slab.min) {
      return slab.charge;
    }
  }
  return HOME_COLLECTION_SLABS[HOME_COLLECTION_SLABS.length - 1].charge;
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function calculateSavings(mrp: number, finalPrice: number): number {
  return mrp - finalPrice;
}

// Helper to get discount percentage applied
export function getDiscountPercentage(mrp: number, finalPrice: number): number {
  if (mrp === 0) return 0;
  return Math.round(((mrp - finalPrice) / mrp) * 100);
}

// Helper to check if user should add items for free collection
export function getUpsellMessage(currentTotal: number): string | null {
  if (currentTotal >= 600) return null;
  
  const needed = 600 - currentTotal;
  return `Add ₹${needed} more for FREE home collection!`;
}