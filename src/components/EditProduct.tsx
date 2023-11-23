import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

interface shopProductInterface {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  image: {
    url: string;
    alt: string;
  };
}

interface adminProductInterface extends shopProductInterface {
  isForSale: boolean;
  costPrice: number;
  supplier: string;
}

const EditProduct = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<adminProductInterface>();

  // נתוני המוצר שיש להציג למשתמש לעיצוב הטופס
  const initialProductData: adminProductInterface = {
    id: '1',
    name: 'Laptop',
    salePrice: 1200,
    quantity: 10,
    description: 'High-performance laptop for work and gaming.',
    category: 'Electronics',
    discountPercentage: 5,
    image: {
      url: 'https://example.com/laptop.jpg',
      alt: 'Laptop Image',
    },
    isForSale: true,
    costPrice: 1000,
    supplier: 'TechSupplier',
  };

  const onSubmit: SubmitHandler<adminProductInterface> = (data: adminProductInterface) => {
    // כאן יש לבצע שליחת המידע לשרת ועדכון במסד הנתונים
    // אחרי שעדכון מוצלח, יש לנווט לדף "פרטי מוצר"
    console.log(data);
    // ניתן להשתמש בפונקציות של fetch או axios כדי לבצע את הפעולה
    navigate(`/Product/${data.id}`);
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <button onClick={() => navigate('/')}>Logout</button>
      <button onClick={() => navigate(`/Product/${initialProductData.id}`)}>
        Back to Product Details
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* נוסיף את השדות החדשים של shopProductInterface */}
        <label htmlFor="isForSale">Is For Sale:</label>
        <input
          type="checkbox"
          id="isForSale"
          defaultChecked={initialProductData.isForSale}
          {...register('isForSale', { required: true })}
        />
        {errors.isForSale && <p>Is For Sale is required.</p>}

        <label htmlFor="costPrice">Cost Price:</label>
        <input
          type="number"
          id="costPrice"
          defaultValue={initialProductData.costPrice}
          {...register('costPrice', { required: true })}
        />
        {errors.costPrice && <p>Cost Price is required.</p>}

        <label htmlFor="supplier">Supplier:</label>
        <input
          type="text"
          id="supplier"
          defaultValue={initialProductData.supplier}
          {...register('supplier', { required: true })}
        />
        {errors.supplier && <p>Supplier is required.</p>}

        {/* שדות shopProductInterface יופיעו כמו שהם בקוד הקודם */}
        <label htmlFor="id">Product ID:</label>
        <input
          type="text"
          id="id"
          defaultValue={initialProductData.id}
          {...register('id', { required: true })}
        />
        {errors.id && <p>Product ID is required.</p>}

        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          defaultValue={initialProductData.name}
          {...register('name', { required: true })}
        />
        {errors.name && <p>Product Name is required.</p>}

        <label htmlFor="salePrice">Sale Price:</label>
        <input
          type="number"
          id="salePrice"
          defaultValue={initialProductData.salePrice}
          {...register('salePrice', { required: true })}
        />
        {errors.salePrice && <p>Sale Price is required.</p>}

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          defaultValue={initialProductData.quantity}
          {...register('quantity', { required: true })}
        />
        {errors.quantity && <p>Quantity is required.</p>}

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          defaultValue={initialProductData.description}
          {...register('description', { required: true })}
        />
        {errors.description && <p>Description is required.</p>}

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          defaultValue={initialProductData.category}
          {...register('category', { required: true })}
        />
        {errors.category && <p>Category is required.</p>}

        <label htmlFor="discountPercentage">Discount Percentage:</label>
        <input
          type="number"
          id="discountPercentage"
          defaultValue={initialProductData.discountPercentage}
          {...register('discountPercentage', { required: true })}
        />
        {errors.discountPercentage && <p>Discount Percentage is required.</p>}

        <label htmlFor="image.url">Image URL:</label>
        <input
          type="text"
          id="image.url"
          defaultValue={initialProductData.image.url}
          {...register('image.url', { required: true })}
        />
        {/* {errors['image.url'] && <p>Image URL is required.</p>} */}

        <label htmlFor="image.alt">Image Alt:</label>
        <input
          type="text"
          id="image.alt"
          defaultValue={initialProductData.image.alt}
          {...register('image.alt', { required: true })}
        />
        {/* {errors['image.alt'] && <p>Image Alt is required.</p>} */}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;



