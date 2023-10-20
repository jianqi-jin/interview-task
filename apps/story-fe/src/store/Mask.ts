// Jianqi

import { MaskData } from "@/interface";
import { delay } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { createContainer } from "unstated-next";

const useMaskState = () => {
  const [maskData, setMaskData] = useState<MaskData>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalStep, setTotalStep] = useState(0);
  const isPlayingRef = useRef(false);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  const playMaskData = () => {
    let isCancel = false;
    setCurrentStep(0);
    setTotalStep(maskData?.objects?.length || 0);
    const cancel = () => {
      isCancel = true;
    };
    const run = async () => {
      setIsPlaying(true);
      const copyMaskData = {
        ...maskData,
        objects: [...maskData.objects],
      };
      const newObjects = [];
      for (const item of maskData.objects) {
        if (isCancel) {
          setIsPlaying(false);
          setMaskData({
            ...copyMaskData,
          });
          return;
        }
        setCurrentStep((val) => val + 1);
        newObjects.push(item);
        setMaskData({
          ...maskData,
          objects: newObjects,
        });
        await delay(1e3);
      }
      setIsPlaying(false);
    };
    run();
    return cancel;
  };
  const rollbackMaskData = (idx: number) => {
    const objects = maskData?.objects?.splice?.(0, idx + 1) || [];
    setMaskData({
      ...maskData,
      objects: objects,
    });
  };
  return {
    maskData,
    setMaskData,
    playMaskData,
    totalStep,
    isPlaying,
    rollbackMaskData,
    currentStep,
    setCurrentStep,
  };
};

export const MaskState = createContainer(useMaskState);
