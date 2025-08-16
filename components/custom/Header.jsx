import Colors from '@/data/Colors'
import React from 'react'

const Header = () => {
  return (
    <div className='p-4 flex justify-between items-center'>
        <Image src={'/logo.png'} alt='logo' width={40} height={40} />
        <div className="flex gap-5">
            <Button variant="ghost">Sign In</Button>
            <Button className="text-white" style={{
                backgoundColor:Colors.BLUE
            }}>Get Started</Button>    
        </div> 

    </div>
  )
}

export default Header