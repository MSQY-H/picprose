"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { getTranslations } from "./translations";
import { usePicprose } from "./PicproseContext";

interface ImageEditorToolbarProps {
  isDragMode: boolean;
  setIsDragMode: (value: boolean) => void;
  handleResetLayout: () => void;
  history: any[];
  historyIndex: number;
  setElements: (elements: any) => void;
  setHistoryIndex: (index: number) => void;
}

const LockIcon = ({ unlocked }: { unlocked: boolean }) => (
  <svg className="w-5 h-5 text-[#2563eb] block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    {unlocked ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 11V7a4 4 0 1 1 8 0m-4 8v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"
      />
    )}
  </svg>
);

const UndoIcon = () => (
  <svg className="w-5 h-5 text-[#2563eb] block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l-4-4 4-4" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10h11a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-5" />
  </svg>
);

const RedoIcon = () => (
  <svg className="w-5 h-5 text-[#2563eb] block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 14l4-4-4-4" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 10H8a4 4 0 0 0-4 4 4 4 0 0 0 4 4h5" />
  </svg>
);

const ResetIcon = () => (
  <svg className="w-5 h-5 text-[#2563eb] block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
    />
  </svg>
);

export const ImageEditorToolbar = ({
  isDragMode,
  setIsDragMode,
  handleResetLayout,
  history,
  historyIndex,
  setElements,
  setHistoryIndex,
}: ImageEditorToolbarProps) => {
  const t = getTranslations("ImageEditorToolbar");
  const { backgroundType } = usePicprose();

  const toggleEditMode = () => {
    setIsDragMode(!isDragMode);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setElements(history[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setElements(history[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  return (
    <div className={`pp-toolbar-float ${isDragMode ? "is-expanded" : ""}`}>
      <div className="pp-toolbar-hint" aria-hidden={!isDragMode}>
        {t("drag_mode_hint", {
          elements: backgroundType === "image" ? t("image_title_author_icon") : t("title_author_icon"),
        })}
      </div>

      <div className="pp-toolbar-shell">
        <div className="pp-toolbar-actions" aria-hidden={!isDragMode}>
          <Button
            color="primary"
            variant="flat"
            onClick={undo}
            isDisabled={historyIndex <= 0}
            title={t("undo_title")}
            isIconOnly
            size="md"
            className="pp-toolbar-button"
          >
            <UndoIcon />
          </Button>

          <Button
            color="primary"
            variant="flat"
            onClick={redo}
            isDisabled={historyIndex >= history.length - 1}
            title={t("redo_title")}
            isIconOnly
            size="md"
            className="pp-toolbar-button"
          >
            <RedoIcon />
          </Button>

          <Button
            color="primary"
            variant="flat"
            onClick={handleResetLayout}
            title={t("reset_title")}
            isIconOnly
            size="md"
            className="pp-toolbar-button"
          >
            <ResetIcon />
          </Button>
        </div>

        <Button
          color="primary"
          variant="flat"
          onClick={toggleEditMode}
          title={isDragMode ? t("lock_title") : t("edit_title")}
          isIconOnly
          size="md"
          className="pp-toolbar-button pp-toolbar-main-button"
          aria-expanded={isDragMode}
        >
          <LockIcon unlocked={isDragMode} />
        </Button>
      </div>
    </div>
  );
};
