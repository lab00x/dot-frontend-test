// Define types for the product and the extracted structure
export interface Product {
    id: number;
    name: string;
    category: string;
    subCategory: string;
    price: number;
    stock: number;
    brand: string;
    description: string;
    imageUrl: string;
    rating: number;
    reviews: number;
    specifications: Record<string, string>; // Adjust type as needed
  }
  
  interface ExtractedCategory {
    category: string;
    subCategories: string[];
  }
  
  interface Data {
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    products: Product[];
  }
  
  // Utility function to extract categories and subcategories
  export function extractCategories(data: Data): ExtractedCategory[] {
    const categoryMap: Record<string, Set<string>> = {};
  
    data.products.forEach(product => {
      const { category, subCategory } = product;
  
      // Initialize the category if it doesn't exist
      if (!categoryMap[category]) {
        categoryMap[category] = new Set(); // Use a Set to avoid duplicates
      }
  
      // Add the subCategory to the respective category
      categoryMap[category].add(subCategory);
    });
  
    // Convert the categoryMap into the desired JSON structure
    const categories: ExtractedCategory[] = Object.keys(categoryMap).map(category => ({
      category,
      subCategories: Array.from(categoryMap[category]),
    }));
  
    return categories;
  }