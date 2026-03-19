/**
 * Drug API - Mock implementation for medication lookup by code.
 * Replace with real API call when backend is ready.
 *
 * @param {string} code - Drug code to look up
 * @returns {Promise<{ code: string, name: string } | null>} Drug data or null if not found
 */
export async function getDrugByCode(code) {
  const normalizedCode = String(code).trim();

  if (!normalizedCode) {
    return null;
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const MOCK_DRUGS = {
    "123456": { code: "123456", name: "Aspirin 100mg" },
    "234567": { code: "234567", name: "Paracetamol 500mg" },
    "345678": { code: "345678", name: "Ibuprofen 400mg" },
    "456789": { code: "456789", name: "Vitamin D3 1000IU" },
    "567890": { code: "567890", name: "Metformin 500mg" },
    "678901": { code: "678901", name: "Omeprazole 20mg" },
    "789012": { code: "789012", name: "Amoxicillin 500mg" },
  };

  return MOCK_DRUGS[normalizedCode] || null;
}
