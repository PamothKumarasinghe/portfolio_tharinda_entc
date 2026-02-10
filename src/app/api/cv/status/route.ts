// API Route: Get CV Status (Admin)
// GET /api/cv/status - Returns whether CV exists and metadata
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const authCheck = await requireAuth(request);
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.error },
        { status: 401 }
      );
    }

    // Connect to database
    const client = await clientPromise;
    const db = client.db('portfolio');
    const settingsCollection = db.collection('settings');

    // Find CV reference
    const cvSettings = await settingsCollection.findOne({ type: 'cv' });

    if (!cvSettings || !cvSettings.fileId) {
      return NextResponse.json({
        success: true,
        data: {
          exists: false,
          cv: null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        exists: true,
        cv: {
          filename: cvSettings.filename || 'CV.pdf',
          uploadedAt: cvSettings.uploadedAt,
          size: cvSettings.size,
          fileId: cvSettings.fileId.toString(),
        },
      },
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check CV status' },
      { status: 500 }
    );
  }
}
