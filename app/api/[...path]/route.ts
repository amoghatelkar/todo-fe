import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL =
  process.env.BACKEND_API_BASE_URL?.replace(/\/$/, '') ||
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'http://localhost:4000';

const buildBackendUrl = (path: string[], search: string) => {
  const joinedPath = path.join('/');
  return `${BACKEND_API_BASE_URL}/${joinedPath}${search}`;
};

const proxyRequest = async (
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) => {
  const { path } = await context.params;
  const targetUrl = buildBackendUrl(path, request.nextUrl.search);
  const contentType = request.headers.get('content-type');
  const body =
    request.method === 'GET' || request.method === 'DELETE'
      ? undefined
      : await request.text();

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: contentType ? { 'Content-Type': contentType } : undefined,
    body,
    cache: 'no-store',
  });

  const responseText = await response.text();

  return new NextResponse(responseText, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('content-type') || 'application/json',
    },
  });
};

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
