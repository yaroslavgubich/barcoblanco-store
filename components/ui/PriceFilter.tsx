"use client";

import React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 100;
const MIN = 0;
const MAX = 100000;

interface PriceFilterProps {
  value: [number, number];
  onChange: (newRange: [number, number]) => void;
}

export default function PriceFilter({ value, onChange }: PriceFilterProps) {
  const handleRangeChange = (values: number[]) => {
    if (values[1] - values[0] >= 500) {
      onChange([values[0], values[1]]);
    }
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (value[1] - newMin >= 500) {
      onChange([newMin, value[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax - value[0] >= 500) {
      onChange([value[0], newMax]);
    }
  };

  return (
    <div className="mb-6 text-sm text-gray-600">
      <h3 className="font-medium text-[#1996A3] mb-3">Ціна</h3>

      {/* Ввод чисел */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          min={MIN}
          max={value[1] - 500}
          value={value[0]}
          onChange={handleMinInputChange}
          className="w-full max-w-[100px] bg-gray-100 rounded-lg p-2 text-center"
        />
        <span className="text-[#1996A3] font-medium">—</span>
        <input
          type="number"
          min={value[0] + 500}
          max={MAX}
          value={value[1]}
          onChange={handleMaxInputChange}
          className="w-full max-w-[100px] bg-gray-100 rounded-lg p-2 text-center"
        />
      </div>

      {/* Слайдер */}
      <Range
        values={value}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handleRangeChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              background: getTrackBackground({
                values: value,
                colors: ["#4FA7B9", "#CFE8EC"],
                min: MIN,
                max: MAX,
              }),
              borderRadius: "3px",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              borderRadius: "50%",
              backgroundColor: "#1996A3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                fontSize: "12px",
                backgroundColor: "#1996A3",
                color: "#fff",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              {value[index]}
            </div>
          </div>
        )}
      />
    </div>
  );
}
