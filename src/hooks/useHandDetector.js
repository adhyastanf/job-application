'use client';
import { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

export function useHandDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detector, setDetector] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [gestureStage, setGestureStage] = useState(0);
  const [message, setMessage] = useState('Tunjukkan 3 jari untuk mulai');
  const [_, setPoseLabel] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let stream;

    async function init() {
      try {
        setIsLoading(true);

        if (!videoRef.current) {
          console.warn('videoRef belum siap, tunggu render berikutnya...');
          return;
        }

        const video = videoRef.current;
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();

        const filesetResolver = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');

        const handLandmarker = await HandLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task',
          },
          runningMode: 'VIDEO',
          numHands: 1,
        });

        setDetector(handLandmarker);
        setMessage('Tunjukkan 3 jari untuk mulai');
      } catch (err) {
        console.error('❌ Gagal inisialisasi:', err);
        setMessage('Tidak dapat mengakses kamera 😢');
      } finally {
        setIsLoading(false);
      }
    }

    const timeout = setTimeout(init, 300);

    return () => {
      clearTimeout(timeout);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    if (!detector) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    let rafId;

    async function detectFrame() {
      if (!video.videoWidth || !video.videoHeight) {
        requestAnimationFrame(detectFrame);
        return;
      }

      if (gestureStage === 99) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const results = await detector.detectForVideo(video, performance.now());
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (results.landmarks.length > 0) {
        const hand = results.landmarks[0];
        const bbox = drawBoundingBox(ctx, hand);
        const fingers = countFingers(hand);
        drawPoseLabel(ctx, fingers, bbox);
        handleGestureSequence(fingers);
      } else {
        setPoseLabel('');
      }

      rafId = requestAnimationFrame(detectFrame);
    }

    detectFrame();
    return () => cancelAnimationFrame(rafId);
  }, [detector, gestureStage, isCounting]);

  const countFingers = (landmarks) => {
    const tips = [4, 8, 12, 16, 20];
    const mcp = [2, 5, 9, 13, 17];
    let count = 0;
    for (let i = 0; i < tips.length; i++) {
      if (i === 0) {
        if (landmarks[tips[i]].x < landmarks[mcp[i]].x) count++;
      } else {
        if (landmarks[tips[i]].y < landmarks[mcp[i]].y) count++;
      }
    }
    return count;
  };

  const handleGestureSequence = (fingers) => {
    if (isCounting || gestureStage === 99) return;

    if (gestureStage === 0 && fingers === 3) {
      setGestureStage(1);
      setMessage('Bagus! Sekarang tunjukkan 2 jari ✌️');
      setPoseLabel('Pose 3');
    } else if (gestureStage === 1 && fingers === 2) {
      setGestureStage(2);
      setMessage('Mantap! Sekarang tunjukkan 1 jari ☝️');
      setPoseLabel('Pose 2');
    } else if (gestureStage === 2 && fingers === 1) {
      setGestureStage(3);
      setMessage('Bersiap, foto akan diambil dalam 3 detik...');
      setPoseLabel('Pose 1');
      startCountdown();
    }
  };

  const startCountdown = () => {
    setIsCounting(true);
    let counter = 3;
    setCountdown(counter);

    const interval = setInterval(() => {
      counter -= 1;
      if (counter > 0) {
        setCountdown(counter);
      } else {
        clearInterval(interval);
        setCountdown(null);
        setIsCounting(false);
        takePhoto();
        setMessage('📸 Foto diambil!');
        setGestureStage(99);
        setPoseLabel('Selesai');
      }
    }, 1000);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    const ctx = tempCanvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const image = tempCanvas.toDataURL('image/png');
    setPhoto(image);
  };

  const drawBoundingBox = (ctx, landmarks) => {
    const xs = landmarks.map((p) => p.x);
    const ys = landmarks.map((p) => p.y);
    const minX = Math.min(...xs) * ctx.canvas.width;
    const maxX = Math.max(...xs) * ctx.canvas.width;
    const minY = Math.min(...ys) * ctx.canvas.height;
    const maxY = Math.max(...ys) * ctx.canvas.height;

    ctx.strokeStyle = '#008343';
    ctx.lineWidth = 3;
    ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);

    return { minX, minY, maxX, maxY };
  };

  const drawPoseLabel = (ctx, fingers, bbox) => {
    let label = '';
    if (fingers === 3) label = 'Pose 3';
    else if (fingers === 2) label = 'Pose 2';
    else if (fingers === 1) label = 'Pose 1';
    else label = 'Undetected';

    ctx.font = '22px Arial';
    ctx.fillStyle = '#008343';
    ctx.fillText(label, bbox.minX + 10, bbox.minY - 10);
  };

  const resetGesture = () => {
    setPhoto(null);
    setGestureStage(0);
    setMessage('Tunjukkan 3 jari untuk mulai');
    setPoseLabel('');
  };

  return {
    videoRef,
    canvasRef,
    photo,
    message,
    countdown,
    isLoading,
    resetGesture,
  };
}
