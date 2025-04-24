import { handleImageRequest } from '@/lib/api-util';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  return await handleImageRequest(
    id,
    'bannerThumbnail',
    (filename, id) => [
      // Try these paths in order
      `/uploads/events/${filename}`,
      `/uploads/events/thumbnails/${filename}`,
      `/uploads/events/banners/thumbnails/${filename}`,
      `/images/events/thumbnails/${filename}`,
      `/images/${filename}`,
      `/api/v2/events/thumbnail/${id}`
    ]
  );
} 