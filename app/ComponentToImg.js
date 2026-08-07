import React, { forwardRef } from "react";
import domtoimage from "dom-to-image";

export const ComponentToImg = forwardRef((props, ref) => {
  const [loading, setLoading] = React.useState(false);
  const componentRef = React.createRef();

  // 修改：支持传入扩展名
  async function saveImage(data, extension = "") {
    var a = document.createElement("A");
    a.href = data;
    a.download = getCurrentTimeForFileName() + (extension ? "." + extension : "");
    document.body.appendChild(a);
    setLoading(false);
    a.click();
    document.body.removeChild(a);
  }

  function getCurrentTimeForFileName() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
  }

  const downloadImage = async (imgFormat) => {
    setLoading(true);
    const element = componentRef.current;
    var scale = 1.6;
    var config = {
      height: element.offsetHeight * scale,
      width: element.offsetWidth * scale,
      style: {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
        width: element.offsetWidth + "px",
        height: element.offsetHeight + "px",
      },
      quality: 1.0,
    };

    if (imgFormat === 'jpg') {
      let data = await domtoimage.toJpeg(componentRef.current, config);
      await saveImage(data, 'jpg');
    } else if (imgFormat === 'png') {
      let data = await domtoimage.toPng(componentRef.current, config);
      await saveImage(data, 'png');
    } else if (imgFormat === 'svg') {
      let data = await domtoimage.toSvg(componentRef.current, config);
      await saveImage(data, 'svg');
    } else if (imgFormat === 'webp') {
      // 使用 toBlob 并指定 image/webp 类型
      let blob = await domtoimage.toBlob(componentRef.current, { ...config, type: 'image/webp' });
      let data = URL.createObjectURL(blob);
      await saveImage(data, 'webp');
    }
  };

  React.useImperativeHandle(ref, () => ({
    downloadImage: (imgFormat) => {
      downloadImage(imgFormat);
    }
  }));

  return (
    <div ref={componentRef}>{props.children}</div>
  );
});

ComponentToImg.displayName = "ComponentToImg";