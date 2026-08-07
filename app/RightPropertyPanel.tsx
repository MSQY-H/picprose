"use client";

import React from "react";
import {
  Button,
  CheckboxIcon,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { TwitterPicker } from "react-color";
import { getTranslations } from "./translations";
import { deviconList } from "./devicon";
import { usePicprose } from "./PicproseContext";
import { SVG_BACKGROUNDS } from "./svgBackgrounds";

const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
    <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" fill="currentColor" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-5 h-5 text-[#2F6EE7]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8" />
  </svg>
);

const SelectChevron = () => (
  <svg className="pp-select-chevron" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path d="M5 7l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const toSliderNumber = (value: number | string, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const blurClassToValue = (blur: string) => {
  const levels: Record<string, number> = {
    "backdrop-blur-none": 0,
    "backdrop-blur-sm": 20,
    "backdrop-blur": 40,
    "backdrop-blur-md": 60,
    "backdrop-blur-lg": 80,
    "backdrop-blur-xl": 100,
  };

  return levels[blur] ?? 0;
};

const blurValueToClass = (value: number) => {
  if (value <= 0) return "backdrop-blur-none";
  if (value <= 20) return "backdrop-blur-sm";
  if (value <= 40) return "backdrop-blur";
  if (value <= 60) return "backdrop-blur-md";
  if (value <= 80) return "backdrop-blur-lg";
  return "backdrop-blur-xl";
};

const transparencyHexToPercent = (hex: string) => {
  const parsed = parseInt(hex || "00", 16);
  return Number.isFinite(parsed) ? Math.round((parsed / 255) * 100) : 0;
};

const percentToTransparencyHex = (value: number) => {
  const clamped = Math.max(0, Math.min(100, value));
  return Math.round((clamped / 100) * 255).toString(16).padStart(2, "0");
};

const MASK_COLORS = [
  "#1F2937",
  "#111827",
  "#374151",
  "#E11D48",
  "#DB2777",
  "#9333EA",
  "#4F46E5",
  "#2563EB",
  "#0891B2",
  "#0F766E",
  "#16A34A",
  "#CA8A04",
];

type NativeSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
};

const NativeSlider = ({ label, value, min, max, step, suffix = "", onChange }: NativeSliderProps) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="pp-native-slider">
      <div className="pp-native-slider-head">
        <span>{label}</span>
        <span>{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(event) => onChange(Number(event.currentTarget.value))}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        style={{ ["--pp-range-value" as string]: `${percent}%` }}
      />
    </div>
  );
};

type NativeFieldProps = {
  value: string;
  placeholder?: string;
  type?: "text" | "search" | "number";
  min?: number;
  multiline?: boolean;
  onChange: (value: string) => void;
};

const NativeField = ({ value, placeholder, type = "text", min, multiline = false, onChange }: NativeFieldProps) => {
  if (multiline) {
    return (
      <textarea
        className="pp-native-field pp-native-textarea"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    );
  }

  return (
    <input
      className="pp-native-field"
      type={type}
      min={min}
      value={value}
      placeholder={placeholder}
      autoComplete="off"
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};

type SelectOption = {
  key: string;
  label: string;
  iconClass?: string;
};

type NativeSelectProps = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

const NativeSelect = ({ value, options, onChange }: NativeSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.key === value) || options[0];

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className={`pp-native-select ${open ? "is-open" : ""}`}>
      <button type="button" className="pp-native-select-trigger" onClick={() => setOpen((current) => !current)}>
        <span className="pp-native-select-value">
          {selected?.iconClass && <i className={`${selected.iconClass} text-lg`} />}
          <span>{selected?.label || "请选择"}</span>
        </span>
        <SelectChevron />
      </button>
      {open && (
        <div className="pp-native-select-menu">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              className={`pp-native-select-option ${option.key === value ? "is-selected" : ""}`}
              onClick={() => {
                onChange(option.key);
                setOpen(false);
              }}
            >
              {option.iconClass && <i className={`${option.iconClass} text-xl`} />}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const RightPropertyPanel = () => {
  const t = getTranslations("RightPropertyPanel");
  const {
    propertyInfo,
    updateProperty,
    downloadImage,
    selectedSvgIndex,
    svgPatternParams,
    setSvgPatternParams,
    setBackgroundPattern,
    setBackgroundType,
    showSvgPanel,
    setShowSvgPanel,
    backgroundType,
    imagePosition,
    setImagePosition,
  } = usePicprose();

  const iconInputRef = React.useRef<HTMLInputElement>(null);
  const fontInputRef = React.useRef<HTMLInputElement>(null);
  const maskColorRef = React.useRef<HTMLDivElement>(null);
  const [showDimensionsModal, setShowDimensionsModal] = React.useState(false);
  const [isMaskColorOpen, setIsMaskColorOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isMaskColorOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (maskColorRef.current && !maskColorRef.current.contains(event.target as Node)) {
        setIsMaskColorOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isMaskColorOpen]);

  const horizontalAspectOptions = [
    { label: "1 : 1", value: "horizontal-square-aspect-square", description: "1185 x 1185", ratio: "aspect-square" },
    { label: "2 : 1", value: "horizontal-2x1-aspect-[2/1]", description: "1185 x 593", ratio: "aspect-[2/1]" },
    { label: "3 : 2", value: "horizontal-3x2-aspect-[3/2]", description: "1185 x 790", ratio: "aspect-[3/2]" },
    { label: "4 : 3", value: "horizontal-4x3-aspect-[4/3]", description: "1185 x 889", ratio: "aspect-[4/3]" },
    { label: "16 : 9", value: "horizontal-16x9-aspect-[16/9]", description: "1185 x 667", ratio: "aspect-[16/9]" },
  ];

  const verticalAspectOptions = [
    { label: "1 : 2", value: "vertical-1x2-aspect-[1/2]", description: "593 x 1185", ratio: "aspect-[1/2]" },
    { label: "2 : 3", value: "vertical-2x3-aspect-[2/3]", description: "790 x 1185", ratio: "aspect-[2/3]" },
    { label: "3 : 4", value: "vertical-3x4-aspect-[3/4]", description: "889 x 1185", ratio: "aspect-[3/4]" },
    { label: "9 : 16", value: "vertical-9x16-aspect-[9/16]", description: "667 x 1185", ratio: "aspect-[9/16]" },
  ];

  const socialMediaAspectOptions = [
    { label: "微信", value: "social-wechat-aspect-[900/383]", description: "900 x 383", ratio: "aspect-[900/383]" },
    { label: "BiliBili", value: "social-bilibili-aspect-[16/9]", description: "1920 x 1080", ratio: "aspect-[16/9]" },
    { label: "YouTube 频道", value: "social-youtube-channel-aspect-[16/9]", description: "2560 x 1440", ratio: "aspect-[16/9]" },
    { label: "YouTube 视频", value: "social-youtube-video-aspect-[16/9]", description: "1280 x 720", ratio: "aspect-[16/9]" },
    { label: "X / Twitter", value: "social-twitter-aspect-[3/1]", description: "1500 x 500", ratio: "aspect-[3/1]" },
    { label: "Facebook 桌面", value: "social-facebook-desktop-aspect-[820/312]", description: "820 x 312", ratio: "aspect-[820/312]" },
    { label: "Facebook 移动", value: "social-facebook-mobile-aspect-[16/9]", description: "640 x 360", ratio: "aspect-[16/9]" },
  ];

  const deviceAspectOptions = [
    { label: "全高清", value: "device-fullhd-aspect-[16/9]", description: "1920 x 1080", ratio: "aspect-[16/9]" },
    { label: "MacBook", value: "device-macbook-aspect-[16/10]", description: "2560 x 1600", ratio: "aspect-[16/10]" },
    { label: "iPhone 13", value: "device-iphone13-aspect-[9/19.5]", description: "1170 x 2532", ratio: "aspect-[9/19.5]" },
    { label: "Galaxy S10", value: "device-galaxys10-aspect-[9/19]", description: "1440 x 3040", ratio: "aspect-[9/19]" },
    { label: "iPhone SE", value: "device-iphonese-aspect-[9/16]", description: "750 x 1334", ratio: "aspect-[9/16]" },
  ];

  const fontOptions = [
    { label: "钉钉进步体", value: "font-dingtalk" },
    { label: "鸿蒙黑体", value: "font-hm" },
    { label: "阿里巴巴普惠体", value: "font-alibaba" },
    { label: "Open Sans", value: "font-opensans" },
    { label: "Anek Latin", value: "font-anke" },
    { label: "Roboto Mono", value: "font-roboto-mono" },
    { label: "金山云技术体", value: "font-kingsoft" },
    { label: "字魂新意冠黑体", value: "font-xinyiguanhei" },
  ];

  const allAspectOptions = [
    ...horizontalAspectOptions,
    ...verticalAspectOptions,
    ...socialMediaAspectOptions,
    ...deviceAspectOptions,
  ];

  const selectedDeviconKey = propertyInfo.devicon || "aarch64-plain";
  const iconOptions = deviconList.map((item) => ({
    key: `${item.name}-${item.versions.font[0]}`,
    label: item.name,
    iconClass: `devicon-${item.name}-${item.versions.font[0]} text-slate-800 dev-icon`,
  }));
  const fontSelectOptions = fontOptions.map((font) => ({
    key: font.value,
    label: font.label,
  }));

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      updateProperty("icon", URL.createObjectURL(event.target.files[0]));
      updateProperty("devicon", "");
    }
  };

  const loadFont = (fontName: string, fontUrl: string) => {
    const font = new FontFace(fontName, `url(${fontUrl})`);
    font
      .load()
      .then(() => {
        document.fonts.add(font);
        document.documentElement.style.setProperty("--font-custom", fontName);
      })
      .catch((error) => console.error("Font loading failed:", error));
  };

  const handleFontUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      loadFont("--font-custom", URL.createObjectURL(event.target.files[0]));
      updateProperty("font", "font-custom");
    }
  };

  const handleBlurTransChange = (value: number) => {
    updateProperty("blurTrans", percentToTransparencyHex(value));
  };

  const handleAspectSelect = (option: (typeof allAspectOptions)[number]) => {
    const dimensions = option.description.split(" x ");
    updateProperty("aspect", option.ratio);
    updateProperty("selectedValue", option.value);
    updateProperty("isCustomAspect", false);
    updateProperty("customWidth", parseInt(dimensions[0]));
    updateProperty("customHeight", parseInt(dimensions[1]));
  };

  const getCurrentDimensionsText = () => {
    if (propertyInfo.isCustomAspect) {
      return {
        ratio: `${propertyInfo.customWidth || 1920}:${propertyInfo.customHeight || 1080}`,
        dimensions: `${propertyInfo.customWidth || 1920} x ${propertyInfo.customHeight || 1080}`,
      };
    }

    const selectedOption = allAspectOptions.find((option) => option.value === propertyInfo.selectedValue);
    return {
      ratio: selectedOption?.label || "16 : 9",
      dimensions: selectedOption?.description || "1920 x 1080",
    };
  };

  const handleSvgParamChange = (param: string, value: any) => {
    if (selectedSvgIndex === null) return;

    const currentSvg = SVG_BACKGROUNDS[selectedSvgIndex];
    const newParams = {
      ...currentSvg.defaultParams,
      ...svgPatternParams,
      [param]: value,
    };

    setSvgPatternParams(newParams);
    setBackgroundType("svg");
    setBackgroundPattern(`url("data:image/svg+xml;utf8,${encodeURIComponent(currentSvg.svgTemplate(newParams))}")`);
  };

  const randomizeSvgParams = () => {
    if (selectedSvgIndex === null) return;

    const currentSvg = SVG_BACKGROUNDS[selectedSvgIndex];
    const params = {
      ...currentSvg.defaultParams,
      color1: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      color2: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      amplitude: Math.floor(Math.random() * 70) + 30,
      frequency: 0.006 + Math.random() * 0.012,
      layers: Math.floor(Math.random() * 4) + 2,
      speed: 0.2 + Math.random() * 0.4,
      wavesOpacity: 0.55 + Math.random() * 0.35,
    };

    setSvgPatternParams(params);
    setBackgroundType("svg");
    setBackgroundPattern(`url("data:image/svg+xml;utf8,${encodeURIComponent(currentSvg.svgTemplate(params))}")`);
  };

  const renderAspectGroup = (label: string, options: typeof allAspectOptions) => (
    <>
      <p className="pp-section-label mt-4 first:mt-0">{label}</p>
      {options.map((option) => (
        <div
          key={option.value}
          onClick={() => handleAspectSelect(option)}
          className={`p-3 rounded-md flex justify-between items-center cursor-pointer pp-card-option mt-2 ${
            propertyInfo.selectedValue === option.value ? "border-primary-500 bg-blue-50" : ""
          }`}
        >
          <div>
            <div className="font-medium">{option.label}</div>
            <div className="text-sm text-slate-500">{option.description}</div>
          </div>
          {propertyInfo.selectedValue === option.value && <CheckboxIcon className="w-5 h-5 text-primary-500" />}
        </div>
      ))}
    </>
  );

  const renderSvgControls = () => {
    if (selectedSvgIndex === null || !SVG_BACKGROUNDS[selectedSvgIndex]) return null;

    const currentSvg = SVG_BACKGROUNDS[selectedSvgIndex];
    const params = { ...currentSvg.defaultParams, ...svgPatternParams };

    return (
      <div className="space-y-5">
        <Button color="primary" className="pp-button w-full" onClick={randomizeSvgParams}>
          {t("randomize_wave")}
        </Button>

        <div>
          <p className="pp-section-title">{t("shape")}</p>
          <NativeSlider label={t("amplitude")} value={Number(params.amplitude || 50)} onChange={(value) => handleSvgParamChange("amplitude", value)} min={5} max={150} step={5} />
          <NativeSlider label={t("frequency")} value={Number(params.frequency || 0.01)} onChange={(value) => handleSvgParamChange("frequency", value)} min={0.005} max={0.05} step={0.001} />
          <NativeSlider label={t("speed")} value={Number(params.speed || 0.3)} onChange={(value) => handleSvgParamChange("speed", value)} min={0.05} max={1} step={0.05} />
          <NativeSlider label={t("layers")} value={Number(params.layers || 3)} onChange={(value) => handleSvgParamChange("layers", value)} min={1} max={8} step={1} />
          <NativeSlider label={t("layer_opacity")} value={Number(params.wavesOpacity || 0.7)} onChange={(value) => handleSvgParamChange("wavesOpacity", value)} min={0.1} max={1} step={0.05} />
        </div>

        <Divider />

        <div>
          <p className="pp-section-title">{t("colors")}</p>
          <div className="grid grid-cols-2 gap-3">
            <Dropdown>
              <DropdownTrigger>
                <button className="pp-card-option p-3 text-left" type="button">
                  <span className="block h-8 rounded-md border border-slate-200" style={{ backgroundColor: params.color1 }} />
                  <span className="mt-2 block text-xs text-slate-600">{t("start_color")}</span>
                </button>
              </DropdownTrigger>
              <DropdownMenu classNames={{ base: "pp-dropdown-content" }}>
                <DropdownItem key="color1">
                  <TwitterPicker color={params.color1} onChangeComplete={(color) => handleSvgParamChange("color1", color.hex)} triangle="hide" />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <button className="pp-card-option p-3 text-left" type="button">
                  <span className="block h-8 rounded-md border border-slate-200" style={{ backgroundColor: params.color2 }} />
                  <span className="mt-2 block text-xs text-slate-600">{t("end_color")}</span>
                </button>
              </DropdownTrigger>
              <DropdownMenu classNames={{ base: "pp-dropdown-content" }}>
                <DropdownItem key="color2">
                  <TwitterPicker color={params.color2} onChangeComplete={(color) => handleSvgParamChange("color2", color.hex)} triangle="hide" />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pp-sidebar w-full flex flex-col h-screen max-w-md mx-auto relative overflow-hidden border-l">
      <div className={`absolute inset-0 flex flex-col w-full h-full transition-transform duration-300 ${showDimensionsModal || showSvgPanel ? "-translate-x-full" : "translate-x-0"}`}>
        <Navbar className="pp-sidebar-header" classNames={{ wrapper: "px-0 max-w-none" }}>
          <NavbarBrand>
            <div>
              <p className="pp-sidebar-title">{t("property")}</p>
              <p className="pp-sidebar-subtitle">排版、遮罩与导出</p>
            </div>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button as={Link} color="primary" variant="flat" target="_blank" href="https://github.com/MSQY-H/picprose" className="pp-button gap-2 px-3">
                <i className="devicon-github-plain text-[#2F6EE7] dev-icon text-xl" />
                GitHub
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <div className="flex-grow overflow-y-auto overflow-x-hidden pp-sidebar-scroll pp-sidebar-content">
          <div className="pp-section">
            <p className="pp-section-title">{t("aspect")}</p>
            <div className="pp-card-option p-4 flex justify-between items-center cursor-pointer" onClick={() => setShowDimensionsModal(true)}>
              <div>
                <div className="text-lg font-bold">{getCurrentDimensionsText().ratio}</div>
                <div className="text-sm text-slate-500">{getCurrentDimensionsText().dimensions}</div>
              </div>
              <span className="text-xl text-slate-400">{String.fromCharCode(8250)}</span>
            </div>
          </div>

          <div className="pp-section">
            <p className="pp-section-title">{t("mask")}</p>
            <div className="pp-control-row">
              <NativeField value={propertyInfo.color} placeholder="#1F2937" onChange={(value) => updateProperty("color", value)} />
              <div className="pp-mask-color-picker" ref={maskColorRef}>
                <button
                  type="button"
                  className="pp-color-swatch"
                  style={{
                    ["--pp-swatch" as string]: propertyInfo.color || "#1F2937",
                    backgroundColor: propertyInfo.color || "#1F2937",
                  }}
                  aria-label="遮罩颜色"
                  aria-expanded={isMaskColorOpen}
                  onClick={() => setIsMaskColorOpen((current) => !current)}
                />
                {isMaskColorOpen && (
                  <div className="pp-mask-color-popover">
                    {MASK_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`pp-mask-color-option ${propertyInfo.color?.toUpperCase() === color ? "is-selected" : ""}`}
                        style={{ ["--pp-swatch" as string]: color }}
                        aria-label={color}
                        onClick={() => {
                          updateProperty("color", color);
                          setIsMaskColorOpen(false);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <NativeSlider label="透明度" value={transparencyHexToPercent(propertyInfo.blurTrans)} onChange={handleBlurTransChange} min={0} max={100} step={1} suffix="%" />
            <NativeSlider label="背景模糊度" value={blurClassToValue(propertyInfo.blur)} onChange={(value) => updateProperty("blur", blurValueToClass(value))} min={0} max={100} step={20} suffix="%" />
            {backgroundType === "image" && (
              <NativeSlider label={t("image_position") || "Image position"} value={imagePosition} onChange={setImagePosition} min={-100} max={100} step={1} />
            )}
          </div>

          <div className="pp-section">
            <p className="pp-section-title">{t("icon")}</p>
            <div className="pp-control-row">
              <NativeSelect value={selectedDeviconKey} options={iconOptions} onChange={(value) => updateProperty("devicon", value)} />
              <input type="file" className="hidden" onChange={handleIconUpload} ref={iconInputRef} />
              <Button isIconOnly color="primary" variant="flat" size="lg" className="pp-icon-button" onClick={() => iconInputRef.current?.click()}>
                <UploadIcon />
              </Button>
            </div>
          </div>

          <div className="pp-section">
            <p className="pp-section-title">{t("font")}</p>
            <div className="pp-control-row">
              <NativeSelect value={propertyInfo.font} options={fontSelectOptions} onChange={(value) => updateProperty("font", value)} />
              <input type="file" className="hidden" onChange={handleFontUpload} ref={fontInputRef} />
              <Button isIconOnly color="primary" variant="flat" size="lg" className="pp-icon-button" onClick={() => fontInputRef.current?.click()}>
                <UploadIcon />
              </Button>
            </div>
          </div>

          <div className="pp-section">
            <p className="pp-section-title">{t("title")}</p>
            <NativeField value={propertyInfo.title} placeholder={t("title_place")} multiline onChange={(value) => updateProperty("title", value)} />
            <NativeSlider label={t("font_size")} value={toSliderNumber(propertyInfo.fontSizeValue, 40)} onChange={(value) => updateProperty("fontSizeValue", value.toString())} min={10} max={100} step={1} />
            <NativeSlider label={t("title_width")} value={toSliderNumber(propertyInfo.titleWidthValue || 100, 100)} onChange={(value) => updateProperty("titleWidthValue", value.toString())} min={50} max={150} step={1} suffix="%" />
          </div>

          <div className="pp-section">
            <p className="pp-section-title">{t("author")}</p>
            <NativeField value={propertyInfo.author} placeholder={t("author")} onChange={(value) => updateProperty("author", value)} />
            <NativeSlider label={t("author_size")} value={toSliderNumber(propertyInfo.authorFontSizeValue, 25)} onChange={(value) => updateProperty("authorFontSizeValue", value.toString())} min={10} max={100} step={1} />
          </div>

          <div className="pp-section">
            <div className="pp-section-title mb-2">{t("download")}</div>
            <div className="grid grid-cols-4 gap-2">
  <Button onClick={() => downloadImage("jpg")} as={Link} color="primary" variant="flat" className="pp-button">JPG</Button>
  <Button onClick={() => downloadImage("png")} as={Link} color="primary" variant="flat" className="pp-button">PNG</Button>
  <Button onClick={() => downloadImage("svg")} as={Link} color="primary" variant="flat" className="pp-button">SVG</Button>
  <Button onClick={() => downloadImage("webp")} as={Link} color="primary" variant="flat" className="pp-button">WEBP</Button>
</div>
<div className="text-center text-xs text-slate-400 py-4 border-t border-slate-200/50 mt-4">
            由 MSQY 基于 LiuShen-Fork/picprose 二次修改而来。<br />
            最上游仓库为 pixpark/picprose。
          </div>
          </div>
        </div>
      </div>

      <div className={`absolute inset-0 flex flex-col w-full h-full pp-sidebar-drawer transition-transform duration-300 ${showDimensionsModal ? "translate-x-0" : "translate-x-full"}`}>
        <Navbar className="pp-sidebar-header" classNames={{ wrapper: "px-0 max-w-none" }}>
          <NavbarBrand>
            <Button isIconOnly variant="light" onPress={() => setShowDimensionsModal(false)} className="mr-2"><ChevronLeftIcon /></Button>
            <p className="pp-sidebar-title">{t("select_dimensions")}</p>
          </NavbarBrand>
        </Navbar>

        <div className="flex-grow overflow-y-auto overflow-x-hidden pp-sidebar-scroll pp-sidebar-content">
          <div className="pp-section">
            <p className="pp-section-title">{t("custom_resolution")}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-500">{t("width")}</div>
                <NativeField type="number" min={1} value={String(propertyInfo.customWidth || 1185)} onChange={(value) => { const width = parseInt(value) || 1185; updateProperty("customWidth", width); updateProperty("isCustomAspect", true); updateProperty("aspect", `aspect-[${width}/${propertyInfo.customHeight || 1185}]`); }} />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-500">{t("height")}</div>
                <NativeField type="number" min={1} value={String(propertyInfo.customHeight || 1185)} onChange={(value) => { const height = parseInt(value) || 1185; updateProperty("customHeight", height); updateProperty("isCustomAspect", true); updateProperty("aspect", `aspect-[${propertyInfo.customWidth || 1185}/${height}]`); }} />
              </div>
            </div>
            <Divider className="my-4" />
            {renderAspectGroup(t("landscape"), horizontalAspectOptions)}
            {renderAspectGroup(t("portrait"), verticalAspectOptions)}
            {renderAspectGroup(t("social_media"), socialMediaAspectOptions)}
            {renderAspectGroup(t("devices"), deviceAspectOptions)}
          </div>
        </div>
      </div>

      <div className={`absolute inset-0 flex flex-col w-full h-full pp-sidebar-drawer transition-transform duration-300 ${showSvgPanel ? "translate-x-0" : "translate-x-full"}`}>
        <Navbar className="pp-sidebar-header" classNames={{ wrapper: "px-0 max-w-none" }}>
          <NavbarBrand className="flex-1">
            <Button size="sm" variant="flat" onClick={() => setShowSvgPanel(false)} className="mr-2"><ChevronLeftIcon /></Button>
            <p className="pp-sidebar-title">{t("customize_svg")}</p>
          </NavbarBrand>
        </Navbar>
        <div className="flex-grow overflow-y-auto pp-sidebar-scroll pp-sidebar-content">
          <div className="pp-section">{renderSvgControls()}</div>
        </div>
      </div>
    </div>
  );
};
