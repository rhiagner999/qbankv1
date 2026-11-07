// Loads the question bank. Data lives in public/data: meta.json (subjects, chapters, topics,
// flashcards...) plus one q-<subject>.json per subject, fetched in parallel.
const V = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev';

async function getJSON(path) {
  const res = await fetch(`${path}?v=${V}`);
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.json();
}

export async function loadData(onProgress) {
  const meta = await getJSON('data/meta.json');
  const total = meta.files.length;
  let done = 0;
  onProgress?.(0, total);
  const parts = await Promise.all(
    meta.files.map(async (f) => {
      const rows = await getJSON(`data/${f.file}`);
      onProgress?.(++done, total);
      return rows;
    })
  );
  const { files, ...rest } = meta;
  return { ...rest, ALL: parts.flat() };
}
