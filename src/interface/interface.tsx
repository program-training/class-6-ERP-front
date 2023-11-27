export interface ShopProductInterface {
    "product.product_id"?: string; // Optional product ID
    "product.name": string; // Product name
    "product.sale_price": number; // Product sale price
    "product.quantity": number; // Product quantity
    "product.description": string; // Product description
    "product.category": string; // Product category
    "product.discount_percentage": number; // Product discount percentage
    "product.image_url": string; // Product image URL
    "product.image_alt": string; // Product image alt text
  }
  
  // Interface for admin product details, extending shop product interface
  export interface AdminProductInterface extends ShopProductInterface {
    is_for_sale: boolean; // Flag indicating whether the product is for sale
    cost_price: number; // Product cost price
    supplier: string; // Product supplier
  }
  
  export interface FormData {
    username: string;
    password: string;
  }

  export interface FormDataSignUp {
    username: string;
    password: string;
    confirmPassword: string;
  }
  