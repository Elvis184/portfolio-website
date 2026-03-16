from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


def _font(size: int, bold: bool = False):
    """Best-effort font loader with safe fallback."""
    preferred = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    try:
        return ImageFont.truetype(preferred, size=size)
    except OSError:
        try:
            return ImageFont.truetype("arial.ttf", size=size)
        except OSError:
            return ImageFont.load_default()


def _text_size(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont):
    """Get text dimensions in a Pillow-version-safe way."""
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def create_circular_logo(input_path, output_path):
    # Load original logo and force RGBA to preserve transparency.
    source = Image.open(input_path).convert("RGBA")

    # Output settings.
    size = 512
    outer_pad = 32
    ring_width = 16

    # Center-crop rectangular input to a square before resizing.
    src_w, src_h = source.size
    side = min(src_w, src_h)
    left = (src_w - side) // 2
    top = (src_h - side) // 2
    square_logo = source.crop((left, top, left + side, top + side))

    # Resize cropped logo to fit inside ring area.
    inner_diameter = size - (outer_pad + ring_width) * 2
    square_logo = square_logo.resize((inner_diameter, inner_diameter), Image.Resampling.LANCZOS)

    # Create a transparent output canvas.
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    # Prepare a layer for the logo and mask it into a circle.
    logo_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    logo_x = (size - inner_diameter) // 2
    logo_y = (size - inner_diameter) // 2 - 20
    logo_layer.paste(square_logo, (logo_x, logo_y))

    circle_mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(circle_mask)
    mask_draw.ellipse((logo_x, logo_y, logo_x + inner_diameter, logo_y + inner_diameter), fill=255)
    logo_layer.putalpha(circle_mask)
    canvas.alpha_composite(logo_layer)

    # Build a smooth left-to-right gradient (blue -> purple).
    gradient = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    grad_draw = ImageDraw.Draw(gradient)
    start = (0, 164, 255, 255)
    end = (139, 92, 246, 255)
    for x in range(size):
        t = x / max(1, size - 1)
        r = int(start[0] * (1 - t) + end[0] * t)
        g = int(start[1] * (1 - t) + end[1] * t)
        b = int(start[2] * (1 - t) + end[2] * t)
        grad_draw.line([(x, 0), (x, size)], fill=(r, g, b, 255))

    # Create ring mask so gradient appears only on circular border.
    ring_mask = Image.new("L", (size, size), 0)
    ring_draw = ImageDraw.Draw(ring_mask)
    outer = (outer_pad, outer_pad, size - outer_pad, size - outer_pad)
    inner = (
        outer_pad + ring_width,
        outer_pad + ring_width,
        size - outer_pad - ring_width,
        size - outer_pad - ring_width,
    )
    ring_draw.ellipse(outer, fill=255)
    ring_draw.ellipse(inner, fill=0)
    ring_mask = ring_mask.filter(ImageFilter.GaussianBlur(1.2))

    border_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    border_layer.paste(gradient, (0, 0), ring_mask)
    canvas.alpha_composite(border_layer)

    # Add centered initials and brand text.
    draw = ImageDraw.Draw(canvas)
    initials = "EH"
    brand = "ELVION TECH"
    tagline = "Innovating the Digital Future"

    initials_font = _font(72, bold=True)
    brand_font = _font(34, bold=True)
    tagline_font = _font(20, bold=False)

    # Place initials at center of circular mark.
    ix, iy = size // 2, logo_y + inner_diameter // 2
    draw.text(
        (ix, iy),
        initials,
        font=initials_font,
        fill=(245, 249, 255, 245),
        anchor="mm",
        stroke_width=2,
        stroke_fill=(8, 17, 37, 170),
    )

    # Place brand and tagline under the mark.
    brand_w, brand_h = _text_size(draw, brand, brand_font)
    tag_w, _ = _text_size(draw, tagline, tagline_font)
    brand_y = int(size * 0.84)
    tag_y = brand_y + brand_h + 6
    draw.text(((size - brand_w) // 2, brand_y), brand, font=brand_font, fill=(230, 238, 255, 235))
    draw.text(((size - tag_w) // 2, tag_y), tagline, font=tagline_font, fill=(186, 201, 235, 220))

    # Save final output as transparent PNG.
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output_path, "PNG")
    print(f"Saved circular logo with gradient: {output_path}")


if __name__ == "__main__":
    create_circular_logo(
        "de9def9e-e39d-4360-9eb8-4710344e3bcc.png",
        "images/elvion_tech_round_gradient.png",
    )
