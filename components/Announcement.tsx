
const Announcements = async () => {

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Announcements</h1>
                <span className="text-xs text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
            <div className="bg-blue-200 rounded-md p-4 h-28 ">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium w-full truncate">Lorem ipsum dolor sit amet </h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1 flex-nowrap w-24 text-center">
                            2024-11-07
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, aperiam libero. Quas voluptate dolor sequi modi delectus quos culpa vero expedita esse accusantium provident aliquam eum, consequatur autem dolorem nesciunt?</p>
                </div>
                <div className="bg-purple-200 rounded-md p-4 h-28 ">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium w-full truncate">Lorem ipsum dolor sit amet </h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1 flex-nowrap w-24 text-center">
                            2024-11-07
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, aperiam libero. Quas voluptate dolor sequi modi delectus quos culpa vero expedita esse accusantium provident aliquam eum, consequatur autem dolorem nesciunt?</p>
                </div>
                <div className="bg-yellow-200 rounded-md p-4 h-28 ">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium w-full truncate">Lorem ipsum dolor sit amet </h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1 flex-nowrap w-24 text-center">
                            2024-11-07
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, aperiam libero. Quas voluptate dolor sequi modi delectus quos culpa vero expedita esse accusantium provident aliquam eum, consequatur autem dolorem nesciunt?</p>
                </div>

            </div>
        </div>
    );
};

export default Announcements;
