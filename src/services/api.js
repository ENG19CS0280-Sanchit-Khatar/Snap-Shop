const BASE_URL = "https://dummyjson.com";

export async function getProducts(params = {}) {
  try {
    const { search, category, brand } = params;
    const endpoint = search
      ? `${BASE_URL}/products/search?q=${encodeURIComponent(search)}`
      : `${BASE_URL}/products`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
