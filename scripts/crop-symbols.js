import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makePNGChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crcBuf]);
}

function encodeRGBPNG(width, height, rawRGB) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2; // RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const ihdrChunk = makePNGChunk('IHDR', ihdr);

  const scanlines = Buffer.alloc(height * (1 + width * 3));
  for (let y = 0; y < height; y++) {
    scanlines[y * (1 + width * 3)] = 0;
    rawRGB.copy(scanlines, y * (1 + width * 3) + 1, y * width * 3, (y + 1) * width * 3);
  }
  const idatData = zlib.deflateSync(scanlines);
  const idatChunk = makePNGChunk('IDAT', idatData);
  const iendChunk = makePNGChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function unfilterPNG(filePath) {
  const buf = fs.readFileSync(filePath);
  let pos = 8;
  const idatChunks = [];
  let width = 0;
  let height = 0;

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
    } else if (type === 'IDAT') {
      idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }

  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = 3;
  const stride = 1 + width * bpp;
  const pixels = Buffer.alloc(width * height * bpp);

  for (let y = 0; y < height; y++) {
    const filter = raw[y * stride];
    const rawRow = raw.subarray(y * stride + 1, (y + 1) * stride);
    const pixRowOffset = y * width * bpp;
    const prevPixRowOffset = (y - 1) * width * bpp;

    for (let i = 0; i < width * bpp; i++) {
      const a = (i >= bpp) ? pixels[pixRowOffset + i - bpp] : 0;
      const b = (y > 0) ? pixels[prevPixRowOffset + i] : 0;
      const c = (y > 0 && i >= bpp) ? pixels[prevPixRowOffset + i - bpp] : 0;
      let val = rawRow[i];
      if (filter === 1) val = (val + a) & 0xff;
      else if (filter === 2) val = (val + b) & 0xff;
      else if (filter === 3) val = (val + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        val = (val + pr) & 0xff;
      }
      pixels[pixRowOffset + i] = val;
    }
  }
  return { width, height, pixels };
}

export function processCharts() {
  const srcDir = path.join(rootDir, 'public/images/chart');
  const symbolDir = path.join(rootDir, 'public/images/chart_symbol');
  const wordDir = path.join(rootDir, 'public/images/chart_word');
  fs.mkdirSync(symbolDir, { recursive: true });
  fs.mkdirSync(wordDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.png'));
  for (const file of files) {
    const { width, height, pixels } = unfilterPNG(path.join(srcDir, file));

    // Crop symbol: height 96 preserves the card boundary and discards the bottom word
    const symbolH = 96;
    const symbolRGB = pixels.subarray(0, width * symbolH * 3);
    fs.writeFileSync(path.join(symbolDir, file), encodeRGBPNG(width, symbolH, symbolRGB));

    // Crop word: from row 92 to bottom
    const wordStart = 92;
    const wordH = height - wordStart;
    const wordRGB = pixels.subarray(width * wordStart * 3, width * height * 3);
    fs.writeFileSync(path.join(wordDir, file), encodeRGBPNG(width, wordH, wordRGB));
  }
  console.log(`Generated ${files.length} cropped symbol and word images.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  processCharts();
}
