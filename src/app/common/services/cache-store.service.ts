import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CacheStoreService {
  private inMemory = new Map<string, { ts: number, res: Response }>();
  private useBrowserCache: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.useBrowserCache =
      isPlatformBrowser(this.platformId) &&
      typeof caches !== 'undefined';
  }

  async getWithTTL(key: string, ttlMs: number): Promise<Response | null> {
    const stored = await this.get(key);
    if (!stored) return null;

    const metadata = this.useBrowserCache
      ? Number(stored.headers.get('X-Cached-Ts'))
      : this.inMemory.get(key)?.ts;
    if (Date.now() - (metadata || 0) > ttlMs) {
      await this.delete(key);
      return null;
    }
    return stored;
  }

  private async get(key: string): Promise<Response | null> {
    if (this.useBrowserCache) {
      const cache = await caches.open('app-cache');
      const res = await cache.match(key);
      return res || null;
    }
    return this.inMemory.get(key)?.res || null;
  }

  async set(key: string, res: Response): Promise<void> {
    if (this.useBrowserCache) {
      const headers = new Headers(res.headers);
      headers.set('X-Cached-Ts', Date.now().toString());
      const cloned = new Response(await res.clone().blob(), { headers });
      const cache = await caches.open('app-cache');
      await cache.put(key, cloned);
    } else {
      this.inMemory.set(key, { ts: Date.now(), res });
    }
  }

  async delete(key: string): Promise<void> {
    if (this.useBrowserCache) {
      const cache = await caches.open('app-cache');
      await cache.delete(key);
    } else {
      this.inMemory.delete(key);
    }
  }
}
