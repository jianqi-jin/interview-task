"use client";
import { MaskData } from "@/interface";
import { Canvas, PencilBrush } from "fabric";
import { RefObject, useEffect, useRef, useState } from "react";

export const useFabric = ({ maskData }: { maskData: MaskData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas>();
  const createCanvas = () => {
    var canvas = new Canvas(canvasRef.current!);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush!.width = 5;
    canvas.freeDrawingBrush!.color = "#00aeff";
    maskData && canvas.loadFromJSON(maskData);
    setCanvas(canvas);
  };
  useEffect(() => {
    createCanvas();
    return () => {
      canvas && canvas?.destroy();
    };
  }, []);
  return {
    canvas,
    FabricCanvas,
    canvasRef,
    createCanvas,
  };
};

const FabricCanvas = ({
  canvasRef,
  canvas,
  onChange,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  canvas?: Canvas;
  onChange?: (data: any) => void;
}) => {
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const onSectionChange = () => {
      onChange?.(canvas?.toJSON());
    };
    canvas?.on("after:render", onSectionChange);
    return () => {
      canvas?.off("after:render", onSectionChange);
    };
  }, [canvas]);
  return (
    <canvas ref={canvasRef} id="fabriccanvas" width={800} height={800}></canvas>
  );
};

// const FabricCanvas = () => {
//     return (<div>asd</div>);
// };

export default FabricCanvas;
