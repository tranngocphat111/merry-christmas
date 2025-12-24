# Hướng dẫn thêm nhạc Giáng Sinh 🎵

## Vấn đề
Các URL nhạc bên ngoài đều bị chặn bởi CORS hoặc 403 Forbidden.

## Giải pháp: Sử dụng file nhạc local

### Bước 1: Tải nhạc Giáng Sinh miễn phí

Chọn một trong các nguồn sau:

#### Tùy chọn 1: Pixabay (Recommended)
1. Vào https://pixabay.com/music/search/christmas/
2. Tìm bài nhạc Giáng Sinh bạn thích
3. Click **Download** (miễn phí, không cần đăng ký)
4. Chọn MP3 format

#### Tùy chọn 2: YouTube Audio Library
1. Vào https://www.youtube.com/audiolibrary
2. Tìm "Christmas" hoặc "Holiday"
3. Download bài bạn thích

#### Tùy chọn 3: Free Music Archive
1. Vào https://freemusicarchive.org/
2. Search "Christmas" với License: Creative Commons
3. Download file MP3

### Bước 2: Đổi tên và đặt file vào thư mục public

1. Đổi tên file thành: **christmas-music.mp3**
2. Copy file vào thư mục: `d:\cmgs\merry-christmas\public\`
3. File path cuối cùng sẽ là: `d:\cmgs\merry-christmas\public\christmas-music.mp3`

### Bước 3: Reload trang web

1. Mở terminal và chạy dev server (nếu chưa chạy):
   ```bash
   npm run dev
   ```

2. Reload trang web trong browser (Ctrl + R)

3. Click vào nút nhạc ở góc dưới bên phải

4. Nhạc sẽ tự động phát! 🎄🎵

## Gợi ý file nhạc hay

- **Jingle Bells** - Classic Christmas song
- **We Wish You a Merry Christmas** - Traditional
- **Silent Night (Instrumental)** - Peaceful
- **Deck the Halls** - Cheerful

## Lưu ý

- File nên dưới 5MB để load nhanh
- Format: MP3
- Nên chọn bài nhạc không có lời (instrumental) để không làm xao lãng
