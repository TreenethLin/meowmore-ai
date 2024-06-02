"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useChat } from "ai/react";
import Image from "next/image";
import Meowmore from './assets/pics/meowmore.png';
import { useCallback, useEffect } from 'react';

export default function Component() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat();

  useEffect(() => {
    // Initial prompt message
    setMessages([{
      id: 'initial',
      role: 'system',
      content: 'ตอบคำถามเหล่านี้ เพื่อเริ่มการพยากรณ์นะเมี๊ยวว!<br>1. เพศของนุด? (ชาย หญิง เพศทางเลือก)<br>2. วันเดือนปี และเวลาเกิดของนุด?<br>3. สถานที่เกิดของนุด (อำเภอ จังหวัด)?'
    }]);
  }, [setMessages]);

  const formatMessageContent = (content: any) => {
    // Replace **text** with <b>text</b>
    content = content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Replace #### text with <h4>text</h4>
    content = content.replace(/####\s(.*?)(\n|$)/g, '<h4>$1</h4>');

    // Replace ### text with <h3>text</h3>
    content = content.replace(/###\s(.*?)(\n|$)/g, '<h3>$1</h3>');

    // Replace ## text with <h2>text</h2>
    content = content.replace(/##\s(.*?)(\n|$)/g, '<h2>$1</h2>');

    // Replace # text with <h1>text</h1>
    content = content.replace(/#\s(.*?)(\n|$)/g, '<h1>$1</h1>');

    // Convert new lines to <br/>
    content = content.replace(/\n/g, '<br/>');

    return content;
  };

  const handleKeyDown = useCallback((e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      <div className="bg-[#fef9f3] flex flex-col items-center justify-center gap-4 px-4 py-6 md:py-8 md:px-8 md:gap-6 md:sticky top-0 md:h-screen md:max-w-[33.33%] md:flex-1">
        <div className="relative w-full max-w-[200px] md:max-w-[300px]">
          <Image src={Meowmore} alt="Cat" width={200} className="rounded-full w-full h-auto mb-4" />
          <div className="text-center font-bold text-lg md:text-2xl flex flex-col">
            Meowmore
            <span>(เมี๊ยวหมอพยากรณ์)</span>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 md:text-base">
          พูดคุยกับน้องแมวอัจฉริยะเพื่อรับคำพยากรณ์ที่คุณต้องการ!
        </p>
      </div>
      <div className="bg-[#f5f5f5] flex flex-col flex-1 overflow-auto">
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-4 mb-6">
              <Avatar className="border w-8 h-8">
                <AvatarImage src={m.role === 'user' ? "https://github.com/shadcn.png" : "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/lwZNzRb3FA-no-background-8z0pcUfeyvQjt5HEIM7t6lpfHqJtYA.png"} />
                <AvatarFallback>{m.role === 'user' ? '🙋‍♀️' : '🐱'}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-bold">{m.role === 'user' ? 'You' : 'Meowmore'}</div>
                <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formatMessageContent(m.content) }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white py-4 px-6 shadow-sm">
          <form className="relative" onSubmit={handleSubmit}>
            <Textarea
              placeholder="Type your message..."
              name="message"
              id="message"
              rows={1}
              onChange={handleInputChange}
              value={input}
              onKeyDown={handleKeyDown}
              className="min-h-[48px] rounded-2xl resize-none p-4 text-md w-full"
            />
            <Button type="submit" size="icon" className="absolute top-3 right-3 w-8 h-8">
              <ArrowUpOutlined className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
