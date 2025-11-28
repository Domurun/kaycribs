import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { userEmail, userMessage } = body;

    const data = await resend.emails.send({
      // 1. STRICTLY use this format for the 'from' field
      from: 'Portfolio Contact <onboarding@resend.dev>',
      
      // 2. Your personal email goes here
      to: 'domurunbeeyah@gmail.com',
      
      // 3. This allows you to hit "Reply" and email the visitor back
      reply_to: userEmail,
      
      subject: 'New Form Submission',
      html: `
        <p><strong>From:</strong> ${userEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${userMessage}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}