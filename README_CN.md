# LiuShen Cover - 封面图片生成工具

[![GitHub stars](https://img.shields.io/github/stars/LiuShen-Fork/picprose)](https://github.com/LiuShen-Fork/picprose/stargazers)
[![License](https://img.shields.io/github/license/LiuShen-Fork/picprose)](https://github.com/LiuShen-Fork/picprose/blob/main/LICENSE)

## 项目简介

LiuShen Cover 是一个封面图片生成工具，适用于博客、视频、社交媒体和技术文章封面。当前版本保留中文界面，支持图片、纯色、渐变和 SVG 纹理背景，并提供标题、作者、图标、遮罩、模糊、尺寸和导出设置。

## 主要功能

- 图片资源：支持 Unsplash 搜索和本地上传。
- 背景资源：支持图片、颜色和纹理背景。
- 排版设置：支持标题、作者、字体、字号和标题宽度调整。
- 遮罩设置：支持遮罩颜色、透明度和背景模糊度。
- 尺寸设置：内置常见横屏、竖屏、社交媒体和设备尺寸，也支持自定义分辨率。
- 导出格式：支持 JPG、PNG 和 SVG。

## 快速开始

```bash
git clone https://github.com/LiuShen-Fork/picprose.git
cd picprose
npm install
npm run dev
```

## 环境变量

创建 `.env.local` 并添加 Unsplash 访问密钥：

```bash
UNSPLASH_API_KEY=你的 Unsplash Access Key
```

## 常用命令

```bash
npm run dev
npm run build
```

## 技术栈

- Next.js
- TypeScript
- NextUI
- Tailwind CSS
- Unsplash API

## 许可证

本项目采用 [MIT 许可证](https://github.com/LiuShen-Fork/picprose/blob/main/LICENSE)。

## 反馈

如有问题或建议，请通过 [GitHub Issues](https://github.com/LiuShen-Fork/picprose/issues) 提交。
