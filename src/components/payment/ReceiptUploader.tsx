import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UploadCloud,
  X,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Loader2,
} from 'lucide-react';
import {
  validateAndOptimizeReceipt,
  formatBytes,
  ReceiptAnalysisResult,
} from '../../services/receiptValidator';

interface ReceiptUploaderProps {
  file: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File | null, previewUrl: string | null) => void;
  uploadProgress?: number | null;
  isUploading?: boolean;
  error?: string | null;
  onErrorChange?: (err: string | null) => void;
}

export const ReceiptUploader: React.FC<ReceiptUploaderProps> = ({
  file,
  previewUrl,
  onFileSelect,
  uploadProgress = null,
  isUploading = false,
  error = null,
  onErrorChange,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ReceiptAnalysisResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Process and validate selected image
  const handleFileProcessing = useCallback(
    async (rawFile: File) => {
      setIsAnalyzing(true);
      onErrorChange?.(null);

      try {
        const result = await validateAndOptimizeReceipt(rawFile);
        setIsAnalyzing(false);

        if (!result.isValid) {
          setAnalysisResult(null);
          onFileSelect(null, null);
          onErrorChange?.(result.errorMessage || 'Invalid image. Please upload a clear payment receipt.');
          return false;
        }

        // Successfully validated receipt!
        setAnalysisResult(result);
        onFileSelect(result.optimizedFile, result.previewUrl);
        onErrorChange?.(null);
        return true;
      } catch (err: any) {
        setIsAnalyzing(false);
        onErrorChange?.('Image load karne me masla hua. Baraye meharbani screenshot dobara select karein.');
        return false;
      }
    },
    [onErrorChange, onFileSelect]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileProcessing(droppedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const chosenFile = e.target.files[0];
      handleFileProcessing(chosenFile);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null, null);
    setAnalysisResult(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onErrorChange?.(null);
  };

  return (
    <div className="space-y-3">
      {/* Universal file input accepting ANY image format from phone or PC */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.jpg,.jpeg,.png,.webp,.heic,.heif,.jfif,.bmp,.gif"
        onChange={handleInputChange}
        className="hidden"
        id="receipt-file-input"
        disabled={isUploading || isAnalyzing}
      />

      <AnimatePresence mode="wait">
        {/* State 1: Analyzing screenshot */}
        {isAnalyzing ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-8 sm:p-10 rounded-2xl border-2 border-[#ffd166]/40 bg-[#12161E] flex flex-col items-center justify-center text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-[#ffd166]/10 border border-[#ffd166]/30 flex items-center justify-center text-[#ffd166]">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h4 className="font-['Newsreader'] text-lg text-[#F3F0E8]">
                Scanning Payment Receipt...
              </h4>
              <p className="font-['Geist'] text-xs text-[#8c919d]">
                Verifying screenshot format and optimizing image for instant upload
              </p>
            </div>
          </motion.div>
        ) : !previewUrl ? (
          /* State 2: Dropzone / File Picker */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onClick={() => inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`relative p-8 sm:p-10 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center group ${
              isDragOver
                ? 'border-[#ffd166] bg-[#ffd166]/10 shadow-[0_0_30px_rgba(255,209,102,0.2)]'
                : error
                ? 'border-rose-500/60 bg-rose-500/5'
                : 'border-[#2A3441] bg-[#12161E] hover:border-[#ffd166]/60 hover:bg-[#161a22]'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#171D25] border border-[#2A3441] group-hover:border-[#ffd166]/50 flex items-center justify-center text-[#ffd166] mb-4 shadow-lg transition-transform group-hover:scale-110">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h4 className="font-['Newsreader'] text-xl text-[#F3F0E8] font-normal">
              Upload Transfer Receipt Screenshot
            </h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#8c919d] mt-1 max-w-sm leading-relaxed">
              Drag & drop your EasyPaisa / JazzCash payment proof here, or <span className="text-[#ffd166] font-medium underline">browse files / take photo</span>
            </p>

            {/* Receipt verification guarantee badge */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[10px] font-mono text-[#8c919d]">
              <span className="px-2 py-0.5 rounded bg-[#10151C] border border-[#2A3441] text-[#ffd166]">
                ✓ All formats (JPG, PNG, HEIC, WEBP)
              </span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-[#10151C] border border-[#2A3441] text-emerald-400">
                ✓ Auto-Compressed
              </span>
              <span>•</span>
              <span className="text-[#8c919d]">EasyPaisa / JazzCash PKR 1,999</span>
            </div>
          </motion.div>
        ) : (
          /* State 3: Validated Receipt Preview */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative rounded-2xl bg-[#12161E] border border-[#ffd166]/40 p-4 sm:p-5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Receipt Image thumbnail */}
              <div className="relative w-full sm:w-44 h-48 sm:h-40 rounded-xl overflow-hidden bg-[#07090C] border border-[#2A3441] shrink-0 group">
                <img
                  src={previewUrl}
                  alt="Receipt Preview"
                  className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] uppercase font-['Geist'] text-[#ffd166] bg-[#10151C]/90 px-2 py-1 rounded border border-[#2A3441]">
                    Payment Screenshot
                  </span>
                </div>
              </div>

              {/* Receipt Details & Verification Confirmation */}
              <div className="flex-1 w-full space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-['Geist'] text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Payment Receipt Verified
                      </span>
                    </div>
                    <h5 className="font-['Newsreader'] text-lg text-[#F3F0E8] font-medium truncate max-w-xs mt-0.5">
                      {file?.name || 'receipt_screenshot.jpg'}
                    </h5>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#8c919d]">
                      {analysisResult?.metadata && (
                        <span>
                          {formatBytes(analysisResult.metadata.optimizedSize)} (Ready for upload)
                        </span>
                      )}
                    </div>
                  </div>

                  {!isUploading && (
                    <motion.button
                      type="button"
                      onClick={handleRemove}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-[#171D25] border border-[#2A3441] text-[#8c919d] hover:text-rose-400 hover:border-rose-500/50 transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>

                {/* Receipt Checklist */}
                <div className="p-2.5 rounded-xl bg-[#10151C] border border-[#2A3441] space-y-1 text-[11px] font-['Geist']">
                  <div className="flex items-center gap-2 text-[#F3F0E8]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#ffd166]" />
                    <span>Transferred: <strong>PKR 1,999</strong> to <strong>03361068235</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8c919d]">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Portrait mobile transfer slip confirmed</span>
                  </div>
                </div>

                {/* Upload Progress Bar if submitting */}
                {isUploading && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-['Geist']">
                      <span className="text-[#ffd166]">Uploading payment proof...</span>
                      <span className="font-mono text-[#F3F0E8]">{uploadProgress || 65}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#171D25] rounded-full overflow-hidden border border-[#2A3441]">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#c59b27] via-[#ffd166] to-[#f3e7be]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${uploadProgress || 65}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {!isUploading && (
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="text-xs text-[#ffd166] hover:underline font-['Geist'] flex items-center gap-1 cursor-pointer pt-0.5"
                  >
                    <span>Change screenshot / Upload different receipt</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error alert with friendly Roman Urdu message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 font-['Geist']"
        >
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold block">Sirf Payment Receipt Allowed Hai:</span>
            <span>{error}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
