import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Heart } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoSelect: (photo: string) => void;
  currentPhoto?: string;
}

export const PhotoUpload = ({ onPhotoSelect, currentPhoto }: PhotoUploadProps) => {
  const [isOpen, setIsOpen] = useState(!currentPhoto);
  const [preview, setPreview] = useState<string | null>(currentPhoto || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onPhotoSelect(result);
        setTimeout(() => setIsOpen(false), 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="relative w-full max-w-md"
          >
            {preview && (
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            )}

            <div className="glass rounded-3xl p-8 border-2 border-white/30 shadow-2xl">
              {!preview ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-center mb-6"
                  >
                    <Heart className="w-16 h-16 text-pink-300 mx-auto mb-4 fill-pink-300" />
                    <h2 className="text-2xl font-serif text-white mb-2">
                      Thêm ảnh người yêu của bạn
                    </h2>
                    <p className="text-white/80 text-sm">
                      Để làm món quà này trở nên đặc biệt hơn ✨
                    </p>
                  </motion.div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClick}
                    className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-3 transition-all"
                  >
                    <Camera className="w-6 h-6" />
                    Chọn ảnh từ thư viện
                  </motion.button>

                  <p className="text-white/60 text-xs text-center mt-4">
                    Ảnh sẽ được lưu trên trình duyệt của bạn
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="relative mb-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-2xl shadow-xl"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 bg-green-500 rounded-full p-2 shadow-lg"
                    >
                      <Heart className="w-5 h-5 text-white fill-white" />
                    </motion.div>
                  </div>
                  <p className="text-white font-serif text-lg">Hoàn hảo! 💕</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClick}
                    className="mt-4 text-white/80 hover:text-white text-sm underline"
                  >
                    Đổi ảnh khác
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Floating hearts */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -60],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                💖
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
