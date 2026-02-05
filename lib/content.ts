import { PaperIndex, PaperModule } from '@/types/paper';

// Import content files (Next.js will bundle these)
import paperIndexData from '@/content/paper_index.json';
import furtadoModule from '@/content/papers/furtado/module.json';
import yangModule from '@/content/papers/yang/module.json';
import yasukawaModule from '@/content/papers/yasukawa/module.json';
import daesFelixModule from '@/content/papers/daes-felix/module.json';
import clausModule from '@/content/papers/claus/module.json';
import ramserModule from '@/content/papers/ramser/module.json';

// Type assertion for imported JSON
export const paperIndex: PaperIndex = paperIndexData as PaperIndex;

// Module registry
const modules: Record<string, PaperModule> = {
  furtado: furtadoModule as PaperModule,
  yang: yangModule as PaperModule,
  yasukawa: yasukawaModule as PaperModule,
  'daes-felix': daesFelixModule as PaperModule,
  claus: clausModule as PaperModule,
  ramser: ramserModule as PaperModule,
};

export function getPaperIndex(): PaperIndex {
  return paperIndex;
}

export function getPaperModule(slug: string): PaperModule | null {
  return modules[slug] || null;
}

export function getPaperMeta(slug: string) {
  return paperIndex.papers.find((p) => p.slug === slug) || null;
}

export function getAllPaperSlugs(): string[] {
  return paperIndex.papers.map((p) => p.slug);
}

export function getNextPaper(currentSlug: string) {
  const currentIndex = paperIndex.papers.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1 || currentIndex >= paperIndex.papers.length - 1) {
    return null;
  }
  return paperIndex.papers[currentIndex + 1];
}

export function getPreviousPaper(currentSlug: string) {
  const currentIndex = paperIndex.papers.findIndex((p) => p.slug === currentSlug);
  if (currentIndex <= 0) {
    return null;
  }
  return paperIndex.papers[currentIndex - 1];
}

export function getFigurePath(slug: string, filename: string): string {
  return `/assets/papers/${slug}/figures/${filename}`;
}

export function getThumbPath(slug: string): string {
  return `/assets/papers/${slug}/thumb.jpg`;
}
