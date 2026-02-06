import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Project } from '@/lib/types';

// GET all projects or filtered by limit
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const featured = searchParams.get('featured');
    
    let query: any = {};
    if (featured === 'true') {
      query.featured = true;
    }
    
    let projects;
    if (limit) {
      projects = await db.collection<Project>('projects')
        .find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .toArray();
    } else {
      projects = await db.collection<Project>('projects')
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();
    }
    
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST create new project
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const body = await request.json();
    
    const newProject = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Remove _id if it exists to let MongoDB generate it
    const { _id, ...projectData } = newProject;
    
    const result = await db.collection('projects').insertOne(projectData);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...newProject }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('projects').updateOne(
      { _id: new (require('mongodb').ObjectId)(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('projects').deleteOne({
      _id: new (require('mongodb').ObjectId)(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
