'use client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Globe,Upload } from 'lucide-react';
import React, { useRef, useState } from "react";
import { Input } from '../components/ui/input';
import { getlistoffilesfromapi } from '../components/listoffiles'
import {useSearchParams} from 'next/navigation'
import Link from "next/link";

export default function InitUI(){
  const inputRef = useRef(null);
  const [ipvis,setipvis] = useState(true);
  const [ufvis,setufvis] = useState(false);
  const searchParams = useSearchParams()

    const [ipaddress, setipaddress] = useState(searchParams!.get('ipaddress')!==null?searchParams!.get('ipaddress')!:"");
    const handleClick = () => {
      console.log("clicked")
      // 👇 "inputRef.current.value" is input value
      console.log(inputRef.current.value);
      setipaddress(inputRef.current.value);
    };
    
    // React.useEffect(() => {
    //     setipaddress(ipad as string)
    //     // console.log("ran once")
          
    //   // code to run after render goes here
    // }, []) // <-- empty array means 'run once'
    return(
        <>
        <div className='flex justify-center'>
          <Button className="rounded-md border shadow-md mr-3" onClick={()=>{setipvis(!ipvis)}}><Globe className='mr-2 h-4 w-4' />IP</Button>
          <Button variant={"destructive"} className="rounded-md border shadow-md" onClick={()=>{setufvis(!ufvis)}}><Upload className='mr-2 h-4 w-4' />Upload</Button>
        </div>
        <div className={`rounded-md border shadow-md flex-wrap flex flex-col ${ipvis ? '' : 'hidden'}`}>
          <h2 className='flex justify-center'>Connected to: {ipaddress}</h2>
       
        <p className="mt-5 flex justify-center">{"Enter IP address to connect to"}</p>
        <div className="flex justify-center p-2">
          <Input
              id="ipaddress"
              ref={inputRef}
              placeholder='Enter IP Address'
              className='max-w-sm'
              defaultValue={ipaddress}
            />
          <Button className="ml-4 rounded-md border shadow-md" onClick={handleClick} variant={"default"}>Connect</Button>
        </div>
        </div>
        
    <div className={ufvis ? '' : 'hidden'}>

        <div className="flex justify-center p-5">
        <form method="post" action="/upload.html" encType="multipart/form-data">
            <p className="mb-5 mt-5 flex justify-center">{"Send files to"}</p>
          <div className="flex flex-row">
            <Input type="file" name="upfile" id="fileinput" required={true}/>
            <Input type="submit" value="Send" className=""/>
          </div>
        </form>
        </div>
    </div>

        <div className="flex justify-center p-5">
      <div className="flex flex-col w-[60%] sm:w-[30%]">
        <ProgressDemo/>
        {/* <progress id="pr" max="100" value="77.68211229853571"></progress> */}
        {/* <p>
          Seleted Storage has
        </p> */}
      </div>
        </div>
    <div>
      {/* <table>
        <thead>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
          </tr>
        </thead>
        <tbody> */}
        <div>

          {getlistoffilesfromapi(ipaddress)}
        </div>
        {/* </tbody>
      </table> */}
    </div>
        <ReactQueryDevtools/>        
        </>
        );
}

import { Progress } from "../components/ui/progress"
import { Button } from './ui/button';

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)
 
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])
 
  return <Progress value={progress} className="w-full" />
}