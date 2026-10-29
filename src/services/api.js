const BASE_URL = "https://dummyjson.com";

export async function getProducts(params = {}) {
  try {
    const { search } = params;
    const endpoint = search
      ? `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=0`
      : `${BASE_URL}/products?limit=0`;

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

export async function getPaginatedItems({
  limit = 10,
  skip = 0,
  category = "",
  search = "",
} = {}) {
  if (category && search) {
    const endpoint = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=0`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch products (HTTP ${response.status})`);
    }

    const data = await response.json();
    const normalizedSearch = search.toLowerCase();
    const matchingProducts = data.products.filter((product) =>
      [product.title, product.description].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      ),
    );

    return {
      products: matchingProducts.slice(skip, skip + limit),
      total: matchingProducts.length,
    };
  }

  const endpoint = category
    ? `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    : search
      ? `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
      : `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch products (HTTP ${response.status})`);
  }

  const data = await response.json();
  return { products: data.products, total: data.total };
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

export async function getCategoryList() {
  try {
    const response = await fetch(`${BASE_URL}/products/category-list`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export const getCategories = getCategoryList;
