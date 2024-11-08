import Announcements from "@/components/Announcement"
import AttendanceChat from "@/components/AttendanceChat"
import CountChart from "@/components/CountChart"
import EventCalender from "@/components/EventCalender"
import Footer from "@/components/Footer"
import UserCard from "@/components/UserCard"

const Dashboard = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row overflow-y-auto">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-12">
        {/* USER CARD */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="lecturer" />
          <UserCard type="staff" />
        </div>
      {/* MIDDLE CHARTS */}
      <div className="flex gap-4 flex-col lg:flex-row">
        {/* COUNT CHART */}
        <div className="w-full lg:w-1/3 h-[480px]">
          <CountChart />
        </div>
        {/* ATTENDANCE CHART */}
        <div className="w-full lg:w-2/3 h-[480px]">
        <AttendanceChat/>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="">
        <Footer />
      </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalender />
        <Announcements />
      </div>
    </div>
  )
}

export default Dashboard
