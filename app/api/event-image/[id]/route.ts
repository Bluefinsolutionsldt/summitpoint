import { handleImageRequest } from '@/lib/api-util';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  return await handleImageRequest(
    id,
    'bannerImage',
    (filename, id) => [
      // Try these paths in order
      `/uploads/events/${filename}`,
      `/uploads/events/banners/${filename}`,
      `/images/events/${filename}`,
      `/images/${filename}`,
      `/api/v2/events/banner/${id}`,
      `/api/v2/events/image/${id}`
    ]
  );
} 