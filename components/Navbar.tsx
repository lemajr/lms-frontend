import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4'>
      {/* Welcome Note */}
      <div className='hidden md:flex'>
        <p className='text-gray-700 text-lg  poppins'>Dashboard</p>
      </div>
      {/* ICONS AND USER */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer' >
          <Image src="/message.png" alt='message' width={20} height={20} />
        </div>
        <div className='relative bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <Image src="/announcement.png" alt='message' width={20} height={20} />
          <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 rounded-full text-white'>2</div>
        </div>
        <div className='flex flex-col'>
          <span className='text-xs leading-3 font-medium'>John Doe</span>
          <span className='text-[10px] text-gray-500 text-right'>Admin</span>
        </div>
        <Image src="/avatar.png" alt='avatar' width={36} height={36} className='rounded-full' />
      </div>
    </div>
  )
}

export default Navbar