import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetail from '../../components/admin/ProductDetail';
import OrderDetail from '../../components/admin/OrderDetails';
import UserDetail from '../../components/admin/UserDetail';
import RoomRentDetail from '../../components/admin/RoomRentDetail';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {

    const [totalRooms, setTotalRooms] = useState(0);

    useEffect(() => {
      // Fetch the total number of rooms when the component mounts
      const fetchTotalRooms = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/getTotalRooms');
          setTotalRooms(response.data.totalRooms); // Set the totalRooms state with the response
        } catch (error) {
          console.error('Error fetching total rooms:', error);
        }
      };
  
      fetchTotalRooms();
    }, []);




    const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Fetch the total number of users when the component mounts
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/getTotalUsers');
        setTotalUsers(response.data.totalUsers); // Set the totalUsers state with the response
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);
    return (
        <div>
            {/* Top Section */}
            <div className="top mb-5 px-5 mt-5">
                <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg">
                    <h1 className="text-center text-2xl font-bold text-pink-500">Admin Dashboard</h1>
                </div>
            </div>

            <div className="px-5">
                {/* Mid Section */}
                <div className="mid mb-5">
                    {/* Main Profile Information */}
                    <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
                        {/* Image */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="Admin" />
                        </div>
                        {/* Text */}
                        <div className="text-center">
                            <h1 className="text-lg text-pink-500"><span className="font-bold">Name :</span> Kamal Nayan Upadhyay</h1>
                            <h1 className="text-lg text-pink-500"><span className="font-bold">Email :</span> test@gmail.com</h1>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Tabs */}
                <div className="">
                    <Tabs>
                        <TabList className="flex flex-wrap justify-center gap-4">
                            {/* Total Products Tab */}
                            <Tab className="p-4 w-full sm:w-1/3 cursor-pointer">
      <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl text-center">
        <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={50}
            height={50}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-basket"
          >
            <path d="m5 11 4-7" />
            <path d="m19 11-4-7" />
            <path d="M2 11h20" />
            <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
            <path d="m9 11 1 9" />
            <path d="M4.5 15.5h15" />
            <path d="m15 11-1 9" />
          </svg>
        </div>
        <h2 className="font-medium text-3xl text-pink-400">{totalRooms}</h2>
        <p className="text-pink-500 font-bold">Total Room</p>
      </div>
    </Tab>

                            {/* Total Orders Tab */}
                            <Tab className="p-4 w-full sm:w-1/3 cursor-pointer">
                                <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl text-center">
                                    <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={50}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-list-ordered"
                                        >
                                            <line x1={10} x2={21} y1={6} y2={6} />
                                            <line x1={10} x2={21} y1={12} y2={12} />
                                            <line x1={10} x2={21} y1={18} y2={18} />
                                            <path d="M4 6h1v4" />
                                            <path d="M4 10h2" />
                                            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                                        </svg>
                                    </div>
                                    <h2 className="font-medium text-3xl text-pink-400">{totalRooms}</h2>
                                    <p className="text-pink-500 font-bold">Total Rent</p>
                                </div>
                            </Tab>

                            {/* Total Users Tab */}
                            <Tab className="p-4 w-full sm:w-1/3 cursor-pointer">
                                <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl text-center">
                                    <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={50}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-users"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx={9} cy={7} r={4} />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                    <h2 className="font-medium text-3xl text-pink-400">{totalUsers}</h2>
                                    <p className="text-pink-500 font-bold">Total User</p>
                                </div>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <RoomRentDetail />
                        </TabPanel>

                     
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
