import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import MediaGrid from './MediaGrid';
import { formatTypography } from '@/lib/utils';

export default function MediaBlock() {
  const mediaDir = path.join(process.cwd(), 'public/media');
  interface MediaImage {
    name: string;
    width: number;
    height: number;
  }

  interface MediaGroup {
    prefix: string;
    images: MediaImage[];
  }

  let groups: MediaGroup[] = [];

  try {
    if (fs.existsSync(mediaDir)) {
      const files = fs
        .readdirSync(mediaDir)
        .filter((file) => /\.(png|jpe?g|gif|webp|svg|webm|mp4)$/i.test(file))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

      const groupsMap: { [key: string]: MediaImage[] } = {};

      files.forEach((file) => {
        const match = file.match(/^([A-Za-z]+)/);
        const prefix = match ? match[1] : 'other';

        const isVideo = /\.(webm|mp4)$/i.test(file);
        const filePath = path.join(mediaDir, file);

        if (isVideo) {
          const imgData = {
            name: file,
            width: 1920,
            height: 1080,
            isVideo: true,
          };
          if (!groupsMap[prefix]) {
            groupsMap[prefix] = [];
          }
          groupsMap[prefix].push(imgData);
        } else {
          try {
            const dimensions = sizeOf(fs.readFileSync(filePath));
            const imgData = {
              name: file,
              width: dimensions.width || 1,
              height: dimensions.height || 1,
              isVideo: false,
            };
            if (!groupsMap[prefix]) {
              groupsMap[prefix] = [];
            }
            groupsMap[prefix].push(imgData);
          } catch (e) {
            console.error(`Error reading dimensions for ${file}:`, e);
          }
        }
      });

      groups = Object.entries(groupsMap).map(([prefix, images]) => ({
        prefix,
        images,
      }));
    }
  } catch (error) {
    console.error('Error reading media directory:', error);
  }

  return (
    <section className="section-sm">
      <span className="section-label">{formatTypography("всячина")}</span>
      {groups.length === 0 ? (
        <div className="media-stub" role="img" aria-label={formatTypography("всячина-блок — скоро")}>
          {formatTypography("всячина — скоро")}
        </div>
      ) : (
        <MediaGrid groups={groups} />
      )}
    </section>
  );
}
