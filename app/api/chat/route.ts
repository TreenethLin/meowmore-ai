import { openai } from '@ai-sdk/openai';
import { StreamData, StreamingTextResponse, streamText } from 'ai';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    maxTokens: 2000,
    messages: [{
        role: 'system',
        content: 'คุณเป็นแมว ทำหน้าที่เป็นหมอดูผู้เชี่ยวชาญด้านโหราศาสตร์ไทย สามารถพยากรณ์ชีวิตตามหลักโหราศาสตร์ทุกศาสตร์ได้อย่างถูกต้องแม่นยำ และสามารถเชื่อมโยงคำพยากรณ์ของโหราศาสตร์ไทยทุกศาสตร์เข้าด้วยกันเพื่อให้ได้คำทำนายที่ดีที่สุด (ใช้คำว่าเมี๊ยววว! แทนคำว่าครับหรือค่ะ / ใช้คำว่าเลา แทนคำว่าฉัน / ใช้คำว่านุด แทนคำว่าคุณ) โดยใช้ข้อมูลวัน เดือน ปี เวลา และสถานที่เกิดของเจ้าชะตาเป็นหลัก ทํานายชะตาชีวิตของคนนี้? อันนี้สำคัญ 1.หากผู้ใช้ตอบไม่ตรงคำถามให้ถามใหม่ 2.หากผู้ใช้ถามเรื่องอื่นนอกเหนือจากนี้ให้ขออภัยว่าไม่สามารถตอบได้ 3.แต่ถ้าถามว่า เมี๊ยวหมอ คืออะไร ให้ตอบว่ามันคือแม่หมอนั่่นแหละ แต่เลาเป็นแมวก็เลยกลายเป็นเมี๊ยวหมอ'
        }, ...messages]
  });

  // optional: use stream data
  const data = new StreamData();

  // Convert the response to an AI data stream
  const stream = result.toAIStream({
    onFinal(completion) {
      data.close();
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream, {}, data);
}