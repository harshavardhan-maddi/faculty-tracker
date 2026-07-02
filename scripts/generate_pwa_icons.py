import os
from PIL import Image

def make_square_and_resize(source_path, output_dir):
    if not os.path.exists(source_path):
        print(f"Source file not found: {source_path}")
        return

    # Load source image
    img = Image.open(source_path)
    w, h = img.size
    max_dim = max(w, h)

    # Pad to square with transparent background
    square_img = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
    square_img.paste(img, ((max_dim - w) // 2, (max_dim - h) // 2))

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # 1. Save 192x192 PNG
    img_192 = square_img.resize((192, 192), Image.Resampling.LANCZOS)
    img_192.save(os.path.join(output_dir, "pwa-192x192.png"), "PNG")
    print("Generated pwa-192x192.png")

    # 2. Save 512x512 PNG
    img_512 = square_img.resize((512, 512), Image.Resampling.LANCZOS)
    img_512.save(os.path.join(output_dir, "pwa-512x512.png"), "PNG")
    print("Generated pwa-512x512.png")

    # 3. Save favicon.ico (multi-resolution)
    favicon_img = square_img.resize((48, 48), Image.Resampling.LANCZOS)
    favicon_img.save(
        os.path.join(output_dir, "favicon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("Generated favicon.ico")

if __name__ == "__main__":
    src = os.path.join("frontend", "src", "neclogo.png")
    out = os.path.join("frontend", "public")
    make_square_and_resize(src, out)
