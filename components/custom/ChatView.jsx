'use client'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import Prompt from '@/data/Prompt'
import { useConvex, useMutation } from 'convex/react'
import { ArrowRight, Link, Loader, Loader2Icon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'


const ChatView = () => {
  const { id } = useParams()
  const convex = useConvex()
  const { messages, setMessages } = useContext(MessagesContext)
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const { userInput, setUserInput } = useState()
  const {loading, setLoading} = useState(false);
  const UpdateMessages=useMutation(api.workspace.UpdateMessages);

  useEffect(() => {
    id && GetWorkspaceData()
  }, [id])

  //   used to get workspace data using workspace id
  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspaceData, {
      workspaceId: id,
    })
    setMessages(result?.messages)
    console.log(result)
  }

  const GetAiResponse = async () => {
    setLoading(true)
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post('/api/ai-chat', {
      prompt: PROMPT,
    })
    console.log(result.data.result);
    const aiResp= {
        role: 'ai',
        content: result.data.result,
    }
    setMessages(prev => [...prev, aiResp]) 

    await UpdateMessages({
        messages: [...messages, aiResp]
    })
    setLoading(false)
  }

  useEffect(()=> {
    if(messages?.length>0){
        const role=messages[messages?.length-1].role;
        if(role=='user'){
            GetAiResponse();
        }
    }
  }, [messages])

  const onGenerate = (input) => {
    setMessages ((prev) => [
      ...prev,
      {
        role: 'user',
        content: input,
      },
    ]);
    setUserInput('')
  }





  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            {msg?.role == 'user' && (
              <Image
                src={userDetail?.picture}
                alt="userpic"
                width={35}
                height={35}
                className="roundex-full"
              />
            )}
            <h2>{msg.content}</h2>
            
          </div>
        ))}

            {loading&& <div className='p-3 rounded-lg mb-2 flex gap-2 items-center'
            style={{
                backgroundColor:Colors.CHAT_BACKGROUND
            }}>
                <Loader2Icon className='animate-spin' />
                <h2>Generating response...</h2>
            </div> }
      </div>

      {/* input area */}
      <div className="p-5 border rounded-xl max-w-2xl w-full mt-3">
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            className="outline-none bg-transparent w-full h-32"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-8 w-8 rounded-md"
            />
          )}
        </div>
        <div>
          <Link className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}

export default ChatView