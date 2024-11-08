'use client'
import Image from "next/image";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Mon',
        present: 10,
        absent: 35,
    },
    {
        name: 'Tue',
        present: 43,
        absent: 85,
    },
    {
        name: 'Wed',
        present: 40,
        absent: 66,
    },
    {
        name: 'Thu',
        present: 54,
        absent: 49,
    },
    {
        name: 'Fri',
        present: 60,
        absent: 95,
    },

];

const AttendanceChat = () => {
    return (
        <div className="bg-white rounded-lg p-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold"> Attendance </h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <ResponsiveContainer width="100%" height="98%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                   barSize={20}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd"/>
                    <XAxis dataKey="name" axisLine={false} tick={{fill: "#d1d5d"}}  tickLine={false}/>
                    <YAxis  axisLine={false} tick={{fill: "#d1d5d"}}  tickLine={false}/>
                    <Tooltip contentStyle={{borderRadius: "10px", borderColor: "gray", backgroundColor: "#403d39"}} />
                    <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px", color: "black" }} />
                    <Bar dataKey="present" legendType="circle" radius={[10,10,0,0]}
                        fill=" #fef08a" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar legendType="circle" radius={[10,10,0,0]}
                        dataKey="absent" fill="#e9d5ff" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AttendanceChat