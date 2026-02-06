import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Experience } from '@/lib/types';

// GET all experiences
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const experiences = await db.collection<Experience>('experiences')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

// POST create new experience
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const body = await request.json();
    
    const { _id, ...experienceData } = body;
    
    const newExperience = {
      ...experienceData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection('experiences').insertOne(newExperience);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...newExperience }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}

// PUT update experience
export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'Experience ID is required' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('experiences').updateOne(
      { _id: new (require('mongodb').ObjectId)(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Experience not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

// DELETE experience
export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Experience ID is required' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('experiences').deleteOne({
      _id: new (require('mongodb').ObjectId)(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Experience not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}
