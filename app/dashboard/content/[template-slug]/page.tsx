"use client"
import React, { useState } from 'react'
import FormSection from '../components/FormSection'
import OutputSection from '../components/OutputSection'
import Templates from '@/app/(data)/Templates'
import type { TEMPLATE } from '../../_components/TemplateListSection'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModal'
import { AIOutput } from '@/utils/schema'
import { db } from '@/utils/db'
import {useUser} from '@clerk/clerk-react'
import moment from 'moment'


interface PROPS {
  params: {
    'template-slug': string
  }
}
const CreateNewContent = (props: PROPS) => {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug == props.params['template-slug']);
  const [loading,setLoading]=useState(false);
  const {user}=useUser()
  const [aiOutput, setAiOutput]=useState<string>('');

  const GenerateAIContent = async(formData: any) => {
    setLoading(true);
    const SelectedPrompt=selectedTemplate?.aiPrompt;

    const FinalAIPrompt=JSON.stringify(formData)+", "+ SelectedPrompt;

    const result=await chatSession.sendMessage(FinalAIPrompt);

    
    setAiOutput(result?.response.text());
    await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug,result?.response.text())
    setLoading(false);
  }

  const SaveInDb=async(formData:any, slug:any, aiResp:string)=>{
    const result=await db.insert(AIOutput).values({
      formData:formData,
      templateSlug:slug,
      aiResponse:aiResp,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD/MM/yyyy'),
    })

    console.log(result);
  }
  return (
    <div className='p-10'>
      <Link href={"/dashboard"}>
        <Button><ArrowLeft/>Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        <FormSection selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)} 
          loading={loading}/>

        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent
