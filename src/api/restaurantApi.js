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

  getRestaurantById: async (id) => {
    return await axiosRestaurantClient.get(
      `/Restaurants/get-all-restaurant-by-id?id=${id}`
    )
  },

  searchRestaurants: async (query) => {
    return await axiosRestaurantClient.get('/Restaurants/search', {
      params: { name: query },
    })
  },
}

export default RestaurantsApi
