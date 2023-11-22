import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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

function AddProduct() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<adminProductInterface>();

  const onSubmit = (data: adminProductInterface) => {
    // כאן יש לבצע שליחת המידע לשרת ושמירה במסד הנתונים
    // אחרי שמירה מוצלחת, יש לנווט לדף "פרטי מוצר"
    
    console.log(data);
    // כאן אתה יכול להוסיף לשרת או לשלוח עם axios
    navigate(`/product/${data.id}`);
  };

  return (
    <div>
      <h1>Add Product</h1>
      <button onClick={() => navigate('/')}>Logout</button>
      <button onClick={() => navigate('/Products')}>All Products</button>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* הוספת שדות shopProductInterface */}
        <label htmlFor="id">Product ID:</label>
        <input
          type="text"
          id="id"
          {...register('id', { required: true })}
        />
        {errors.id && <p>Product ID is required.</p>}

        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
        />
        {errors.name && <p>Product Name is required.</p>}

        <label htmlFor="salePrice">Sale Price:</label>
        <input
          type="number"
          id="salePrice"
          {...register('salePrice', { required: true })}
        />
        {errors.salePrice && <p>Sale Price is required.</p>}

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          {...register('quantity', { required: true })}
        />
        {errors.quantity && <p>Quantity is required.</p>}

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          {...register('description', { required: true })}
        />
        {errors.description && <p>Description is required.</p>}

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          {...register('category', { required: true })}
        />
        {errors.category && <p>Category is required.</p>}

        <label htmlFor="discountPercentage">Discount Percentage:</label>
        <input
          type="number"
          id="discountPercentage"
          {...register('discountPercentage', { required: true })}
        />
        {errors.discountPercentage && <p>Discount Percentage is required.</p>}

        {/* הוספת שדות של adminProductInterface */}
        <label htmlFor="isForSale">Is For Sale:</label>
        <input
          type="checkbox"
          id="isForSale"
          {...register('isForSale', { required: true })}
        />
        {errors.isForSale && <p>Is For Sale is required.</p>}

        <label htmlFor="costPrice">Cost Price:</label>
        <input
          type="number"
          id="costPrice"
          {...register('costPrice', { required: true })}
        />
        {errors.costPrice && <p>Cost Price is required.</p>}

        <label htmlFor="supplier">Supplier:</label>
        <input
          type="text"
          id="supplier"
          {...register('supplier', { required: true })}
        />
        {errors.supplier && <p>Supplier is required.</p>}

        <label htmlFor="image.url">Image URL:</label>
        <input
          type="text"
          id="image.url"
          {...register('image.url', { required: true })}
        />
        {errors.image?.url && <p>Image URL is required.</p>}

        <label htmlFor="image.alt">Image Alt:</label>
        <input
          type="text"
          id="image.alt"
          {...register('image.alt', { required: true })}
        />
        {errors.image?.alt && <p>Image Alt is required.</p>}

        <button type="submit">Save Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
