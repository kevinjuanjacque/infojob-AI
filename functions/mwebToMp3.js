import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export function convertToMP3(fileName) {
  const audioFilePath = path.join(fileName);

  // Comprobar si el archivo existe
  if (!fs.existsSync(audioFilePath)) {
    throw new Error('Archivo no encontrado');
  }

  // Generar el nombre del archivo MP3
  const mp3FilePath = path.join(process.cwd(), 'uploads', `converts.mp3`);

  // Convertir el archivo de audio a MP3 utilizando FFmpeg
  const ffmpeg = spawn('ffmpeg', ['-i', audioFilePath, mp3FilePath]);

  return new Promise((resolve, reject) => {
    ffmpeg.on('error', (error) => {
      console.error('Error al convertir el archivo de audio:', error);
      reject(new Error('Error al convertir el archivo de audio'));
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve(mp3FilePath);
      } else {
        console.error('Error al convertir el archivo de audio. Código de salida:', code);
        reject(new Error('Error al convertir el archivo de audio'));
      }
    });
  });
}

export default async function handler(req, res) {
  const { fileName } = req.query; // Recibir el nombre del archivo como parámetro

  // Comprobar si el nombre del archivo fue proporcionado
  if (!fileName) {
    return res.status(400).json({ error: 'Nombre del archivo requerido' });
  }

  try {
    const convertedFilePath = await convertToMP3(fileName);

    // Devolver el archivo MP3 como respuesta
    return res.status(200).sendFile(convertedFilePath);
  } catch (error) {
    console.error('Error al convertir el archivo de audio:', error);
    return res.status(500).json({ error: 'Error al convertir el archivo de audio' });
  }
}



