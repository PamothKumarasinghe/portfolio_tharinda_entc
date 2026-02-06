import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { SkillCategory } from '@/lib/types';

// GET all skill categories
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const skills = await db.collection<SkillCategory>('skills')
      .find({})
      .sort({ order: 1 })
      .toArray();
    
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST create new skill category
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const body = await request.json();
    
    const { _id, ...bodyWithoutId } = body;
    
    const newSkillCategory = {
      ...bodyWithoutId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection('skills').insertOne(newSkillCategory);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...newSkillCategory }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create skill category' },
      { status: 500 }
    );
  }
}

// PUT update skill category
export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'Skill category ID is required' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('skills').updateOne(
      { _id: new (require('mongodb').ObjectId)(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Skill category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update skill category' },
      { status: 500 }
    );
  }
}

// DELETE skill category
export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Skill category ID is required' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('skills').deleteOne({
      _id: new (require('mongodb').ObjectId)(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Skill category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete skill category' },
      { status: 500 }
    );
  }
}
