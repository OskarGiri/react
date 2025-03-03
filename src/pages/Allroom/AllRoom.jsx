import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";

// productData 
const productData = [
    {
        id: 1,
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/17/97/fe/b8/kathmandu-airport-hotel.jpg',
        title:'kathmandu',
        price: 12222,
    },
    {
        id: 2,
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/2f/cf/ce/deluxe-room-with-private.jpg?w=700&h=-1&s=1',
        title:'kathmandu',
        price:13333,
    },
    {
        id: 3,
        image: 'https://soaltee.com/images/65a3d8e688a89_1705236710.jpg',
        title:'Pokhara',
        price: 14444,
    },
    {
        id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToRjNzLprqgvg8-asngTr5YLPa50G11AwUTA&s',
        title:'Biratnagar',
        price: 15555,
    },
    {
        id: 1,
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/514475765.jpg?k=1eca7d65bdc72b644a3c5291f3b8ac0dd5877dc0a5dfafadd4424508cd1243ac&o=&hp=1',
        title:'Baktapur',
        price: 16666,
    },
    {
        id: 2,
        image: 'https://royalkingshotel.com/wp-content/uploads/2018/05/Quadruple-Room-1.png',
        title:'Lalitpur',
        price: 17777,
    },
    
]
const AllProduct = () => {
    const navigate = useNavigate();
    return (
        <Layout>
    <div className="py-8">
            {/* Heading  */}
            <div className="">
                <h1 className=" text-center mb-5 text-2xl font-semibold">All Room</h1>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 lg:px-0 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {productData.map((item, index) => {
                            const { image, title, price } = item
                            return (
                                <div key={index} className="p-4 w-full md:w-1/4">
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                        <img
                                        onClick={()=> navigate('/productinfo')}
                                            className="lg:h-80  h-96 w-full"
                                            src={image}
                                            alt="blog"
                                        />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                E-bharat
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0, 25)}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>

                                            <div className="flex justify-center ">
                                                <button className=" bg-blue-500 hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                    Rent
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
        </Layout>
    );
}

export default AllProduct;