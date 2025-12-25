/*
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fsPromises from 'fs/promises';
import { GET as getQueryHandler } from '../../src/app/api/route';

const CACHE_VALUE = 'public, max-age=60, s-maxage=86400, stale-while-revalidate=3600';

vi.mock('fs/promises');

describe('query API handler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns 200 + cache header on success', async () => {
    const sample = { stats: { foo: 1 } };
    (fsPromises.readFile as unknown as vi.Mock).mockResolvedValueOnce(JSON.stringify(sample));

    const req = new Request('http://localhost/api?year=2005&category=J2');
    const res = await getQueryHandler(req as Request);

    expect(res.status).toBe(200);
    const body = await (res as Response).json();
    expect(body).toEqual(sample);
    expect(res.headers.get('cache-control')).toBe(CACHE_VALUE);
  });

  it('returns 404 when dataset file is missing', async () => {
    (fsPromises.readFile as unknown as vi.Mock).mockRejectedValueOnce(new Error('not found'));
    const req = new Request('http://localhost/api?year=2005&category=J2');
    const res = await getQueryHandler(req as Request);
    expect(res.status).toBe(404);
  });

  it('includes meta.club when club query provided', async () => {
    const sample = { stats: { foo: 1 } };
    (fsPromises.readFile as unknown as vi.Mock).mockResolvedValueOnce(JSON.stringify(sample));
    const req = new Request('http://localhost/api?year=2005&category=J2&club=someClub');
    const res = await getQueryHandler(req as Request);
    expect(res.status).toBe(200);
    const body = await (res as Response).json();
    expect(body.meta).toMatchObject({ year: '2005', category: 'J2', club: 'someClub' });
    expect(res.headers.get('cache-control')).toBe(CACHE_VALUE);
  });
});
*/
