import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRecommendations } from '../redux/slices/recommendationSlice';
import { fetchTrendingItems } from '../redux/slices/trendingSlice';
import { fetchRestaurants } from '../redux/slices/restaurantSlice';
import { logout } from '../redux/slices/authSlice';
import { ChevronRight, LogOut, Menu } from 'lucide-react';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const recommendations = useSelector((state) => state.recommendation.recommendations);
  const trendingItems = useSelector((state) => state.trending.trendingItems);
  const restaurants = useSelector((state) => state.restaurant.restaurants);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      dispatch(fetchRecommendations());
      dispatch(fetchTrendingItems());
      dispatch(fetchRestaurants());
    }
  }, [isAuthenticated, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const FoodCard = ({ item }) => (
    <div className="relative h-40 w-64 flex-shrink-0 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
      <img src={item.imageUrl || `/api/placeholder/256/160`} alt={item.name} className="h-full w-full object-cover rounded-md" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-md"></div>
      <div className="absolute bottom-0 left-0 p-3">
        <h3 className="text-white font-bold">{item.name}</h3>
        <p className="text-gray-300 text-sm">{item.restaurant}</p>
      </div>
    </div>
  );

  const RestaurantCard = ({ restaurant }) => (
    <div className="relative h-40 w-64 flex-shrink-0 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
      <img src={restaurant.imageUrl || `/api/placeholder/256/160`} alt={restaurant.name} className="h-full w-full object-cover rounded-md" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-md"></div>
      <div className="absolute bottom-0 left-0 p-3">
        <h3 className="text-white font-bold">{restaurant.name}</h3>
        <p className="text-gray-300 text-sm">{restaurant.cuisine}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black bg-opacity-90 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-4 cursor-pointer" />
            <h1 className="text-red-600 text-2xl font-bold">Netflix for Food</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center text-gray-300 hover:text-white">
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="pt-20 pb-10">
        <section className="mb-12">
          <div className="relative h-[70vh]">
            <img src="/api/placeholder/1920/1080" alt="Featured dish" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10">
              <h2 className="text-5xl font-bold mb-4">Featured Dish</h2>
              <p className="text-xl mb-6">Discover our chef's special creation of the week</p>
              <button className="bg-white text-black py-2 px-6 rounded-md flex items-center hover:bg-gray-200">
                Order Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {trendingItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {recommendations.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Top Restaurants</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black bg-opacity-90 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">© 2024 Netflix for Food. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
