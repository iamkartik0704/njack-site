import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        kind: 'contact',
        payload: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: (subject || 'General Inquiry').trim(),
          message: message.trim(),
          submittedAt: new Date().toISOString(),
        }),
        status: 'pending',
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing inquiry.' },
      { status: 500 }
    );
  }
}
