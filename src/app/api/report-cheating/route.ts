import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contestLink, reportedHandle, suspectedCollaborator, proofDetails, codeSubmissionLinks } = body;

    if (!contestLink || !reportedHandle || !proofDetails) {
      return NextResponse.json(
        { error: 'Contest link, reported handle, and evidence details are required.' },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        kind: 'report',
        payload: JSON.stringify({
          contestLink: contestLink.trim(),
          reportedHandle: reportedHandle.trim(),
          suspectedCollaborator: suspectedCollaborator ? suspectedCollaborator.trim() : null,
          proofDetails: proofDetails.trim(),
          codeSubmissionLinks: codeSubmissionLinks ? codeSubmissionLinks.trim() : null,
          submittedAt: new Date().toISOString(),
        }),
        status: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      id: submission.id,
      message: 'Anonymous plagiarism report submitted securely to the NJACK CP Division council.',
    });
  } catch (error) {
    console.error('Report submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing report.' },
      { status: 500 }
    );
  }
}
