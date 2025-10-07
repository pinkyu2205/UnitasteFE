import axiosClient from './axios'

const RestaurantsApi = {
  getAllRestaurants: async () => {
    return await axiosClient.get('/Restaurants/get-all-restaurant')
  },

  findRestaurantsByLocation: async (data) => {
    return await axiosClient.post('/Restaurants/find-by-location-10km', data)
  },

  getRestaurantById: async (id) => {
    return await axiosClient.get(
      `/Restaurants/get-all-restaurant-by-id?id=${id}`
    )
  },

  searchRestaurants: async (params) => {
    return await axiosClient.get('/Restaurants/search', { params })
  },
}

export default RestaurantsApi
