import React from 'react'
import {
  Dialog,
  DialogContext,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Lookup from '@/data/Lookup'
import { UserDetailContext } from "@context/UserDetailContext";

const CreateUser=useMutation(api.users.CreateUser);

const SignInDialog = (openDialog, closeDialog) => {

    const googleLogin= userGoogleLogin({
        // here was a lot of code so writing only the important ones

        // afer login you get the userinfo
        // console.log(userInfo);
        // setUserDetail(userInfo?.data)
        const user= userInfo();
    await CreateUser({
        name:user?.name,
        email:user?.email,
        picture:user?.picture,
        uid:uuid4()
    })

    if (typeof window !== undefined) 
    {
        localStorage.setItem('user', JSON.stringify(user))
        
    }

//npm install uuid4
setUserDetail(userIndo?.data);


    })


  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="flex flex-col">
            <div>
                <h2 className="font-bold">{Lookup.SIGNIN_HEADING}</h2>
                <p>{Lookup.SIGNIN_SUBHEADING}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SignInDialog
