import fs from 'fs';
import path from 'path';

const mapPath = path.resolve('data/tmdb-map.json');
const outputPath = path.resolve('data/series.json');

const TMDB_TOKEN = process.env.TMDB_TOKEN;

if (!TMDB_TOKEN) {
  console.error('Error: TMDB_TOKEN environment variable is missing.');
  process.exit(1);
}

const mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const results = {};

// Auto-detect if TMDB_TOKEN is a v3 API Key (32 hex characters) or a v4 Bearer Token
const isV3Key = /^[a-f0-9]{32}$/i.test(TMDB_TOKEN.trim());

console.log('Fetching metadata from TMDB...');

for (const [key, info] of Object.entries(mapData)) {
  const { tmdb_id, type, use_tmdb_poster, use_tmdb_synopsis } = info;
  const baseUrl = `https://api.themoviedb.org/3/${type}/${tmdb_id}?language=en-US`;
  const url = isV3Key ? `${baseUrl}&api_key=${TMDB_TOKEN.trim()}` : baseUrl;
  
  try {
    const headers = { accept: 'application/json' };
    if (!isV3Key) {
      headers.authorization = `Bearer ${TMDB_TOKEN.trim()}`;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) {
      throw new Error(`Failed to fetch TMDB ID ${tmdb_id}: ${res.statusText}`);
    }

    const data = await res.json();
    
    results[key] = {
      tmdb_id,
      type,
      use_tmdb_poster: !!use_tmdb_poster,
      use_tmdb_synopsis: !!use_tmdb_synopsis,
      rating: data.vote_average,
      episodes: data.number_of_episodes || null,
      status: data.status,
      poster_path: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
      overview: data.overview || null
    };
    console.log(`Success: Loaded TMDB details for "${key}"`);
  } catch (err) {
    console.error(`Error loading data for ${key}:`, err.message);
  }
}

// Ensure the parent directory of outputPath exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
console.log(`Written merged database to ${outputPath}`);
