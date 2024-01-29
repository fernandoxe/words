import { NextRequest, NextResponse } from 'next/server';
import { getWord } from '@/services/words-api';

export async function GET(req: NextRequest, { params }: { params: { app: string } }) {
  const { app } = params;
  try {
    const word = getWord(app, true);
    return NextResponse.json(word);
  } catch (error) {
    return NextResponse.error();
  }
};
