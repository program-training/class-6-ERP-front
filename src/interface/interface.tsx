export interface ShopProductInterface {
    "product.product_id"?: string; 
    "product.name": string; 
    "product.sale_price": number; 
    "product.quantity": number; 
    "product.description": string; 
    "product.category": string; 
    "product.discount_percentage": number; 
    "product.image_url": string; 
    "product.image_alt": string; 
  }
  
  export interface AdminProductInterface extends ShopProductInterface {
    is_for_sale: boolean; 
    cost_price: number;
    supplier: string; 
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
  
  export interface newAdminProductInterface {
  
      product_id: number,
      name: string,
      sale_price: number,
      quantity: number,
      description: string,
      category: string,
      discount_percentage: number,
      image_url: string,
      image_alt: string,
      is_for_sale: boolean,
      cost_price: number,
      supplier: string,
  }

  