"use client";
import React, { useState } from "react";
import {
  ScrollShadow,
  Avatar,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { getTranslations } from "./translations";
import { usePicprose } from "./PicproseContext";
import { SVG_BACKGROUNDS } from "./svgBackgrounds";

// ==================== 图标组件（原文件内定义） ====================
export const GalleryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="none" focusable="false" height="24" role="presentation" viewBox="0 0 24 24" width="24" {...props}>
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="M2.67004 18.9501L7.60004 15.6401C8.39004 15.1101 9.53004 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

export const PaletteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="none" focusable="false" height="24" role="presentation" viewBox="0 0 24 24" width="24" {...props}>
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="16" cy="8" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="8" cy="16" r="2" fill="currentColor" opacity="0.8" />
    <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.3" />
  </svg>
);

export const SvgIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="none" focusable="false" height="24" role="presentation" viewBox="0 0 24 24" width="24" {...props}>
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="M6 6L18 6" stroke="currentColor" strokeLinecap="round" strokeWidth="1" opacity="0.5" />
    <path d="M6 10L18 10" stroke="currentColor" strokeLinecap="round" strokeWidth="1" opacity="0.5" />
    <path d="M6 14L18 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1" opacity="0.5" />
    <path d="M6 18L18 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1" opacity="0.5" />
    <path d="M10 6L10 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1" opacity="0.3" />
    <path d="M14 6L14 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1" opacity="0.3" />
  </svg>
);

// ==================== 颜色预设 ====================
const SOLID_COLORS = [
  "#1F2937", "#1E3A8A", "#312E81", "#4C1D95", "#5B21B6", "#6D28D9",
  "#7C3AED", "#8B5CF6", "#9333EA", "#A855F7", "#C026D3", "#D946EF",
  "#831843", "#9D174D", "#BE185D", "#DB2777", "#E11D48", "#F43F5E",
  "#991B1B", "#B91C1C", "#DC2626", "#EF4444", "#F59E0B", "#F97316",
  "#FBBF24", "#065F46", "#047857", "#059669", "#10B981", "#34D399"
];

const GRADIENT_COLORS = [
  "linear-gradient(to right, #8e2de2, #4a00e0)",
  "linear-gradient(to right, #fc466b, #3f5efb)",
  "linear-gradient(to right, #00b09b, #96c93d)",
  "linear-gradient(to right, #ff9966, #ff5e62)",
  "linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b)",
  "linear-gradient(to right, #f953c6, #b91d73)",
  "linear-gradient(to right, #1e3c72, #2a5298)",
  "linear-gradient(to right, #c33764, #1d2671)",
  "linear-gradient(to right, #6190e8, #a7bfe8)",
  "linear-gradient(to right, #ff416c, #ff4b2b)",
  "linear-gradient(to right, #493240, #f09)",
  "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
];

// ==================== 颜色面板 ====================
const ColorPanel = () => {
  const { setBackgroundType, setBackgroundColor } = usePicprose();
  const t = getTranslations("LeftResourcePanel");

  const handleColorSelect = (color: string) => {
    setBackgroundType('color');
    setBackgroundColor(color);
  };

  return (
    <div className="space-y-4">
      <h3 className="pp-section-title">{t('solid_colors')}</h3>
      <div className="grid grid-cols-6 gap-2 mb-6">
        {SOLID_COLORS.map((color, index) => (
          <div
            key={index}
            className="pp-color-tile"
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>

      <h3 className="pp-section-title">{t('gradient_colors')}</h3>
      <div className="grid grid-cols-3 gap-2">
        {GRADIENT_COLORS.map((gradient, index) => (
          <div
            key={index}
            className="pp-gradient-tile"
            style={{ background: gradient }}
            onClick={() => handleColorSelect(gradient)}
          />
        ))}
      </div>
    </div>
  );
};

// ==================== SVG 图案面板 ====================
const SvgPatternPanel = () => {
  const {
    setBackgroundType,
    setBackgroundPattern,
    setSelectedSvgIndex,
    selectedSvgIndex,
    setSvgPatternParams,
    setShowSvgPanel
  } = usePicprose();
  const t = getTranslations("LeftResourcePanel");

  // 安全兜底
  const svgBgs = SVG_BACKGROUNDS.length > 0 ? SVG_BACKGROUNDS : [
    {
      name: "波浪",
      svgTemplate: (params: any) => `<svg width="100%" height="100%" viewBox="0 0 800 600"><rect width="800" height="600" fill="${params.backgroundColor}"/><path d="M0,100 Q200,180 400,100 T800,100 L800,600 L0,600 Z" fill="${params.color1}"/></svg>`,
      defaultParams: { color1: "#3b82f6", color2: "#06b6d4", backgroundColor: "#0f172a" }
    }
  ];

  const handlePatternSelect = (index: number) => {
    if (index < 0 || index >= svgBgs.length) return;
    const selectedSvg = svgBgs[index];
    const defaultParams = JSON.parse(JSON.stringify(selectedSvg.defaultParams));
    setSelectedSvgIndex(index);
    setSvgPatternParams(defaultParams);
    setShowSvgPanel(true);
    try {
      const svgPattern = selectedSvg.svgTemplate(defaultParams);
      const encodedSvg = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgPattern)}")`;
      setBackgroundType('svg');
      setBackgroundPattern(encodedSvg);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="pp-section-title">{t('svg_patterns')}</h3>
      <div className="grid grid-cols-2 gap-4">
        {svgBgs.map((svg, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-full aspect-[4/3] pp-card-option cursor-pointer overflow-hidden ${selectedSvgIndex === index ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => handlePatternSelect(index)}
              style={{ backgroundImage: `url(${svg.name === '波浪' ? 'waves.svg' : 'corners.svg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="text-center text-slate-600 text-sm mt-2">{svg.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== 主组件 ====================
export const LeftResourcePanel = () => {
  const t = getTranslations("LeftResourcePanel");
  const { setImageInfo, setBackgroundType } = usePicprose();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = React.useState<"colors" | "patterns">("colors");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setImageInfo({
        url: file,
        name: "MSQY Cover",
        avatar: "default-author.jpg",
        profile: "default",
        downloadLink: "",
      });
      setBackgroundType('image');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const PicproseLogo = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="pp-sidebar w-full flex flex-col h-screen border-r">
      <div className="w-full flex-none">
        <Navbar
          className="pp-sidebar-header"
          classNames={{ wrapper: "px-0 max-w-none" }}
        >
          <NavbarBrand className="gap-3">
            <div className="pp-brand-mark">
              <PicproseLogo />
            </div>
            <div>
              <p className="pp-sidebar-title">MSQY Cover</p>
              <p className="pp-sidebar-subtitle">Assets & backgrounds</p>
            </div>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Avatar
                isBordered
                className="w-9 h-9"
                src="https://i.ibb.co/Q3Zf7WnG/IMG-20260720-165500.png"
              />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>

      <div className="pp-sidebar-body">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className="pp-resource-topbar">
          <div className="pp-resource-tabs" role="tablist" aria-label="背景资源">
            <button
              type="button"
              className={`pp-resource-tab ${activeTab === "colors" ? "is-active" : ""}`}
              onClick={() => setActiveTab("colors")}
            >
              <PaletteIcon className="w-5 h-5" />
              <span>{t('colors_tab')}</span>
            </button>
            <button
              type="button"
              className={`pp-resource-tab ${activeTab === "patterns" ? "is-active" : ""}`}
              onClick={() => setActiveTab("patterns")}
            >
              <SvgIcon className="w-5 h-5" />
              <span>{t('patterns_tab')}</span>
            </button>
          </div>
          <Button
            variant="flat"
            color="primary"
            isIconOnly
            className="pp-resource-upload-tab"
            onClick={handleButtonClick}
            aria-label="上传背景"
          >
            <svg
              className="w-5 h-5 text-[#2F6EE7] dark:text-white/90 pointer-events-none flex-shrink-0 block"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
                d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
              />
            </svg>
          </Button>
        </div>
        <div className="pp-resource-content">
          {activeTab === "colors" && (
            <div className="pp-section pp-resource-panel">
              <ScrollShadow className="h-full overflow-y-auto pp-sidebar-scroll pr-1">
                <ColorPanel />
              </ScrollShadow>
            </div>
          )}
          {activeTab === "patterns" && (
            <div className="pp-section pp-resource-panel">
              <ScrollShadow className="h-full overflow-y-auto pp-sidebar-scroll pr-1">
                <SvgPatternPanel />
              </ScrollShadow>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};