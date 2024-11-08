'use client'
import Image from 'next/image';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';


const data = [
    {
        name: 'Total',
        count: 200,
        fill: 'white',
    },
    {
        name: 'Boys',
        count: 120,
        fill: '#e9d5ff',
    },
   
    {
        name: 'Girls',
        count: 80,
        fill: '#fef08a',
    },
];


const CountChart = () => {
    return (
        <div className='bg-white rounded-xl w-full p-4'>
        {/* TITLE */}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Students</h1>
            <Image src="/moreDark.png" alt='' width={20} height={20} />
        </div>
        {/* CHART */}
        <div className='relative w-full h-[350px]'>
            <ResponsiveContainer>
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="100%" barSize={32} data={data}>
                    <RadialBar background dataKey="count" />
                </RadialBarChart>
            </ResponsiveContainer>
            <Image src="/maleFemale.png" alt='' width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        </div>
        {/* BOTTOM */}
        <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-1 items-center">
                <div className="w-5 h-5 bg-purple-200 rounded-full"></div>
                <h1 className="font-bold text-lg">1,234</h1>
                <h2 className="text-xs text-gray-700">Boys (55%)</h2>
            </div>
            <div className="flex flex-col gap-1 items-center">
                <div className="w-5 h-5 bg-yellow-200 rounded-full"></div>
                <h1 className="font-bold text-lg">1,204</h1>
                <h2 className="text-xs text-gray-700">Girls (45%)</h2>
            </div>
        </div>
    </div>
    
    
    )
}

export default CountChart

