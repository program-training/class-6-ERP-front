
export interface ShopProductInterface {
    name: string;
    sale_price: number;
    quantity: number;
    description: string;
    category: string;
    discount_percentage: number;
    image_url: string;
    image_alt: string;
  }
  
  export interface AdminProductInterface extends ShopProductInterface {
    is_for_sale: boolean;
    cost_price: number;
    supplier: string;
  }
  