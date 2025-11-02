'use client';
import { useEffect } from 'react';
import { useHandDetector } from '@/hooks/useHandDetector';

export default function HandDetector({ onPhotoCaptured, onReady }) {
  const { videoRef, canvasRef, photo, message, countdown, isLoading, resetGesture } = useHandDetector();

  useEffect(() => {
    if (photo && onPhotoCaptured) {
      onPhotoCaptured(photo);
    }
  }, [photo, onPhotoCaptured]);

  useEffect(() => {
    if (onReady) onReady({ resetGesture });
  }, [onReady]);

  return (
    <div className='flex flex-col items-center space-y-4 w-full'>
      <div className='relative w-full h-[400px]'>
        <video ref={videoRef} className='hidden' />
        <canvas ref={canvasRef} className='w-full h-full object-cover' />

        {isLoading && <div className='absolute inset-0 flex items-center justify-center bg-black/60 text-white text-lg font-semibold rounded-lg'>Mengaktifkan kamera...</div>}

        {!isLoading && <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xl bg-black/60 px-4 py-2 rounded-xl'>{message}</div>}

        {countdown && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/30 text-white font-bold'>
            <div>
              <p className='text-sm text-center'>Capturing photo in</p>
              <p className='text-5xl text-center'>{countdown}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
