import UserCard from "@/components/UserCard"

const Dashboard = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3">
        {/* USER CARD */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="lecturer" />
          <UserCard type="staff" />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3">
        Right
      </div>
    </div>
  )
}

export default Dashboard
