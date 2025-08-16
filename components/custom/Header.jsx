import Colors from '@/data/Colors'
import React from 'react'
import Image from 'next/image'
import { Button} from '../ui/button'
import { UserDetailContext } from '@/context/UserDetailContext'


const Header = () => {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  return (
    <div className='p-4 flex justify-between items-center'>
        <Image src={'/logo.png'} alt='logo' width={40} height={40} />
        {userDetail.name && <div className="flex gap-5">
            <Button variant="ghost">Sign In</Button>
            <Button className="text-white" style={{
                backgoundColor:Colors.BLUE
            }}>Get Started</Button>    
        </div> }

    </div>
  )
}

export default Header