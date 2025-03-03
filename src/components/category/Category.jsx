// category 
const category = [
    {
        image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcT7LceIm3J8P6zymSuPsdf6Bwobhw55TXe00YfgOoxMtLuqt9bDBsYnCqpyGOR7Zppw6-8E7WlLj6aCq1--OzFLcFYM7-lI1m0VxrDklQ',
        name: 'Kathmandu'
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Clean-_Lalitpur.jpg',
        name: 'Lalitpur'
    },
    {
        image: 'https://hsj.com.np/uploads/0000/1/2023/08/06/bhaktapur-rainy.jpg',
        name: 'Bhaktapur'
    },
    {
        image: 'https://nepalintrepidtreks.com/wp-content/uploads/2024/03/image-1536x864.png',
        name: 'Pokhara'
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Aerial_View_of_Biratnagar-IMG_8813.jpg/1200px-Aerial_View_of_Biratnagar-IMG_8813.jpg?20210514063351',
        name: 'Biratnagar'
    },
    
]

const Category = () => {
    return (
        <div>
            <div className="flex flex-col mt-5">
                {/* main 1 */}
                <div className="flex overflow-x-scroll lg:justify-center  hide-scroll-bar">
                    {/* main 2  */}
                    <div className="flex ">
                        {/* category  */}
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10">
                                    {/* Image  */}
                                    <div className=" w-30 h-15 lg:w-50 lg:h-50 max-w-xs rectangle-full  bg-blue-300 transition-all hover:bg-blue-400 cursor-pointer mb-1 " >
                                        <div className="flex justify-center mb-12">
                                            {/* Image tag  */}
                                            <img src={item.image} alt="img" />
                                        </div>
                                    </div>

                                    {/* Name Text  */}
                                    <h1 className=' text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase '>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />
        </div>
    );
}

export default Category;