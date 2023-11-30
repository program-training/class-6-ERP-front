// import fetch from 'node-fetch';

// const fetchUser = async (id: string) => {
//   const response = await fetch(`https://erp-beak1-6.onrender.com/erp/api/products/inventory/${id}`);
//   const data = await response.json();
//   return data;
// };

// // Mock the 'node-fetch' module
// jest.mock('node-fetch', () => {
//   return jest.fn().mockImplementationOnce(() =>
//     Promise.resolve({
//       json: jest.fn().mockResolvedValueOnce({ name: 'example' }),
//     })
//   );
// });

// describe('fetchUser', () => {
//   it('returns the user data', async () => {
//     const result = await fetchUser('15');

//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(fetch).toHaveBeenCalledWith('https://erp-beak1-6.onrender.com/erp/api/products/inventory/15');
//     expect(result).toEqual({ name: 'example' });
//   });
// });

import request from 'supertest';
import App from '../../App';

describe('Product Controller', () => {
    test('should get all banners successfully', async () => {
        const response = await request(App)
            .get('https://erp-beak1-6.onrender.com/erp/api/products/inventory')
            .timeout({ response: 200000 })
            .expect(200);
        expect(response.body).toBeDefined();
    }, 300000);
});