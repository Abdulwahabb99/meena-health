import API from "shared/functions/axios";

export interface CatalogItem {
  id: number;
  name: string;
  price: number;
  vatPrice: number;
}

export interface ItemsEnvelope {
  success: boolean;
  message?: string;
  data?: CatalogItem[];
}

export async function fetchItems(): Promise<CatalogItem[]> {
  const { data } = await API.get<ItemsEnvelope>("/Item");
  if (!data?.success || !Array.isArray(data.data)) {
    throw new Error(data?.message || "Failed to load items");
  }
  return data.data;
}
