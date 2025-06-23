import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'artists.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const artists = JSON.parse(fileContents);
  return {
    props: { artists },
  };
}

export default function ArtistsStaticPage({ artists }) {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Artists (Static Generation Example)</h1>
      <ul className="space-y-3">
        {artists.map((artist) => (
          <li key={artist.id} className="bg-white rounded shadow p-4 border border-gray-200">
            <span className="font-semibold text-blue-700">{artist.name}</span> — {artist.category.join(', ')}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-gray-500 text-sm">This page is statically generated at build time using getStaticProps.</p>
    </div>
  );
} 