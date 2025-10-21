import { axiosRestaurantClient } from './axios'

const RestaurantsApi = {
  getAllRestaurants: async () => {
    return await axiosRestaurantClient.get('/Restaurants/get-all-restaurant')
  },

  findRestaurantsByLocation: async (data) => {
    return await axiosRestaurantClient.post(
      '/Restaurants/find-by-location-10km',
      data
    )
  },

  getRestaurantByPlaceId: async (placeId) => {
    // Rename or adjust logic
    // Assuming the endpoint is updated like this:
    return await axiosRestaurantClient.get(
      `/Restaurants/get-restaurant-by-place-id?placeId=${placeId}`
    )
    // OR if the original endpoint accepts placeId:
    // return await axiosRestaurantClient.get(
    //    `/Restaurants/get-all-restaurant-by-id?placeId=${placeId}` // Use placeId query param
    // );
  },

  // searchRestaurants: async (query) => {
  //   return await axiosRestaurantClient.get('/Restaurants/search', {
  //     params: { name: query },
  //   })
  // },

  // get restaurant at homepage
  getAllSimpleRestaurants: async (currentPage = 1, pageSize = 10) => {
    return await axiosRestaurantClient.get('/Restaurants/get-all-simple', {
      params: {
        currentPage,
        pageSize,
      },
    })
  },

  //search Google with paging
  searchNearbyWithPaging: async ({
    latitude,
    longitude,
    radius = 5000, // Bán kính mặc định 5km
    type = '', // Loại (cafe, restaurant, ...)
    keyword = '', // Từ khóa tìm kiếm
    currentPage = 1,
    pageSize = 5, // Kích thước trang mặc định
  }) => {
    // API này dùng query params, nên gửi trong 'params' của axios config
    return await axiosRestaurantClient.post(
      '/GooglePlaces/search-import-nearby-with-paging',
      null, // Body là null vì API này không dùng body
      {
        params: {
          latitude,
          longitude,
          radius,
          type,
          keyword,
          currentPage,
          pageSize,
        },
      }
    )
  },
}

export default RestaurantsApi
