import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const UNSPLASH_API_BASE = 'https://api.unsplash.com';

const jsonHeaders = {
  Accept: 'application/json',
  'Accept-Version': 'v1',
};

function buildUnsplashResponse(status: number, response: unknown) {
  return {
    type: 'success',
    status,
    response,
  };
}

function buildUnsplashError(status: number, message: string) {
  return {
    type: 'error',
    status,
    errors: [message],
    response: null,
  };
}

async function fetchUnsplash(path: string, params: URLSearchParams) {
  const accessKey = process.env.UNSPLASH_API_KEY;

  if (!accessKey) {
    return NextResponse.json(
      buildUnsplashError(500, 'UNSPLASH_API_KEY is not configured'),
      { status: 500 },
    );
  }

  params.set('client_id', accessKey);
  const response = await fetch(`${UNSPLASH_API_BASE}${path}?${params.toString()}`, {
    headers: jsonHeaders,
    next: { revalidate: 60 },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = Array.isArray(payload?.errors)
      ? payload.errors.join(', ')
      : `Unsplash request failed with status ${response.status}`;

    return NextResponse.json(
      buildUnsplashError(response.status, message),
      { status: response.status },
    );
  }

  return NextResponse.json(buildUnsplashResponse(response.status, payload));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '30';
  
  try {
    if (query) {
      const params = new URLSearchParams({
        query,
        page,
        per_page: perPage,
      });

      return fetchUnsplash('/search/photos', params);
    }

    const params = new URLSearchParams({
      count: perPage,
    });

    return fetchUnsplash('/photos/random', params);
  } catch (error) {
    return NextResponse.json(
      buildUnsplashError(500, error instanceof Error ? error.message : 'Failed to fetch photos'),
      { status: 500 }
    );
  }
}
