import { Storage } from '@google-cloud/storage';
import speech from '@google-cloud/speech';
import { v4 as uuidv4 } from 'uuid';

// Configura las credenciales de autenticación de GCP
const storage = new Storage({
  credentials: {
    client_email: 'administradores@googlegroups.com',
    private_key: 'AIzaSyBB_MvYY_O_zkvHaqSQxBuyW4VJovrq-Wo',
  },
});

const client = new speech.SpeechClient();

// Función para convertir el BLOB a texto
export async function convertBlobToText(blob) {
  try {
    // Guarda el BLOB en Google Cloud Storage
    const bucketName = 'test-1183';
    const fileName = `blob-${uuidv4()}.webm`;

    await storage.bucket(bucketName).file(fileName).save(blob);

    // Configura la solicitud de reconocimiento de voz
    const audio = {
      uri: `gs://${bucketName}/${fileName}`,
    };

    const config = {
      encoding: 'WEBM_OPUS',
      sampleRateHertz: 48000,
      languageCode: 'es-ES',
    };

    const request = {
      audio,
      config,
    };

    // Realiza la solicitud de reconocimiento de voz a la API de Cloud Speech-to-Text
    const [response] = await client.recognize(request);

    // Extrae el texto reconocido del resultado de la API
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n');

    return transcription;
  } catch (error) {
    console.error('Error durante la conversión', error);
    throw error;
  }
}