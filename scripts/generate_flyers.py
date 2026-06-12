from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public" / "flyers"
PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

BUSINESS = json.loads((ROOT / "data" / "negocio.json").read_text(encoding="utf-8"))
PRICING = json.loads((ROOT / "data" / "precios.json").read_text(encoding="utf-8"))

LOGO_PATH = ROOT / "public" / "images" / "logo-carnes-espinosa.png"
QR_PATH = ROOT / "public" / "flyers" / "qr-carnes-espinosa.png"
OUT_WEB = PUBLIC_DIR / "flyer-pagina-web.png"
OUT_WEDNESDAY = PUBLIC_DIR / "flyer-miercoles-de-plaza.png"

WIDTH = 1200
HEIGHT = 1800
MARGIN = 72

RED = (189, 40, 28)
RED_DARK = (145, 26, 18)
BLACK = (38, 30, 24)
TAUPE = (108, 97, 86)
CREAM = (248, 243, 236)
PANEL = (255, 252, 248)
LINE = (228, 216, 204)
BEIGE = (238, 229, 218)
GREEN = (44, 154, 81)

BASKERVILLE = "/System/Library/Fonts/Supplemental/Baskerville.ttc"
DIDOT = "/System/Library/Fonts/Supplemental/Didot.ttc"
AVENIR = "/System/Library/Fonts/Avenir.ttc"
AVENIR_NEXT = "/System/Library/Fonts/Avenir Next.ttc"
HELVETICA_NEUE = "/System/Library/Fonts/HelveticaNeue.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def crop_near_white(image: Image.Image, threshold: int = 245) -> Image.Image:
    rgba = image.convert("RGBA")
    bbox = None
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = rgba.getpixel((x, y))
            if a > 0 and not (r >= threshold and g >= threshold and b >= threshold):
                if bbox is None:
                    bbox = [x, y, x, y]
                else:
                    bbox[0] = min(bbox[0], x)
                    bbox[1] = min(bbox[1], y)
                    bbox[2] = max(bbox[2], x)
                    bbox[3] = max(bbox[3], y)
    if bbox is None:
        return rgba
    left, top, right, bottom = bbox
    return rgba.crop((left, top, right + 1, bottom + 1))


def contain(image: Image.Image, max_width: int, max_height: int) -> Image.Image:
    ratio = min(max_width / image.width, max_height / image.height)
    size = (max(1, int(image.width * ratio)), max(1, int(image.height * ratio)))
    return image.resize(size, Image.LANCZOS)


def wrap_text(draw: ImageDraw.ImageDraw, text: str, text_font: ImageFont.FreeTypeFont, max_width: int) -> str:
    words = text.split()
    if not words:
        return ""

    lines: list[str] = []
    current = words[0]
    for word in words[1:]:
        candidate = f"{current} {word}"
        if draw.textbbox((0, 0), candidate, font=text_font)[2] <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word
    lines.append(current)
    return "\n".join(lines)


def fit_text(draw: ImageDraw.ImageDraw, text: str, font_path: str, start_size: int, min_size: int, max_width: int) -> ImageFont.FreeTypeFont:
    size = start_size
    while size > min_size:
        candidate = font(font_path, size)
        if draw.textbbox((0, 0), text, font=candidate)[2] <= max_width:
            return candidate
        size -= 1
    return font(font_path, min_size)


def centered(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, text_font, fill, spacing: int = 4):
    bbox = draw.multiline_textbbox((0, 0), text, font=text_font, spacing=spacing)
    width = bbox[2] - bbox[0]
    draw.multiline_text((x - width / 2, y), text, font=text_font, fill=fill, spacing=spacing)


def add_background(draw: ImageDraw.ImageDraw):
    draw.rectangle((0, 0, WIDTH, HEIGHT), fill=CREAM)
    draw.rounded_rectangle((30, 30, WIDTH - 30, HEIGHT - 30), radius=40, outline=LINE, width=3)
    draw.ellipse((-120, -90, 380, 350), fill=(253, 249, 244))
    draw.ellipse((WIDTH - 430, -70, WIDTH + 80, 350), fill=(245, 236, 225))
    draw.ellipse((WIDTH - 250, HEIGHT - 250, WIDTH + 40, HEIGHT + 60), fill=(245, 236, 225))
    for x in (MARGIN - 28, WIDTH - MARGIN + 28):
        draw.line((x, 260, x, HEIGHT - 140), fill=LINE, width=2)


def round_box(draw: ImageDraw.ImageDraw, box, fill=PANEL, outline=LINE, radius: int = 30, width: int = 2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def format_price(value: int | float, unit: str = "kg") -> str:
    return f"${int(value)}/{unit}"


def get_lookup() -> dict[str, dict]:
    lookup = {}
    for category in PRICING["categorias"]:
        for product in category["productos"]:
            lookup[product["nombre"]] = product
    return lookup


def draw_label(draw: ImageDraw.ImageDraw, x: int, y: int, max_width: int, text: str):
    label_font = fit_text(draw, text, AVENIR_NEXT, 20, 16, max_width - 34)
    label_bbox = draw.textbbox((0, 0), text, font=label_font)
    label_width = min(max_width, (label_bbox[2] - label_bbox[0]) + 36)
    draw.rounded_rectangle((x, y, x + label_width, y + 38), radius=18, fill=RED)
    text_x = x + (label_width - (label_bbox[2] - label_bbox[0])) / 2
    text_y = y + 8
    draw.text((text_x, text_y), text, font=label_font, fill=(255, 255, 255))


def web_flyer():
    image = Image.new("RGB", (WIDTH, HEIGHT), CREAM)
    draw = ImageDraw.Draw(image)
    add_background(draw)

    logo = contain(crop_near_white(Image.open(LOGO_PATH)), 540, 290)
    image.paste(logo, (MARGIN - 4, 92), logo)
    qr = contain(Image.open(QR_PATH).convert("RGBA"), 260, 260)

    title_font = font(DIDOT, 54)
    subtitle_font = font(HELVETICA_NEUE, 26)
    body_font = font(AVENIR, 28)
    body_small = font(AVENIR, 23)
    body_bold = font(AVENIR_NEXT, 24)
    section_title = font(BASKERVILLE, 32)

    right_x = 620
    draw.rounded_rectangle((right_x, 108, WIDTH - MARGIN, 164), radius=26, fill=BEIGE)
    draw.text((right_x + 26, 122), "YA TENEMOS PÁGINA WEB", font=font(AVENIR_NEXT, 26), fill=RED_DARK)

    headline = wrap_text(draw, "Consulta precios, promociones y haz tu pedido", title_font, 460)
    draw.multiline_text((right_x, 204), headline, font=title_font, fill=BLACK, spacing=-4)
    lead = "Escanea el QR y entra directo a la página de Carnes Espinosa."
    draw.multiline_text((right_x, 380), wrap_text(draw, lead, subtitle_font, WIDTH - right_x - MARGIN), font=subtitle_font, fill=TAUPE, spacing=6)

    feature_y = 500
    feature_w = 230
    feature_h = 120
    feature_gap = 18
    feature_font = font(BASKERVILLE, 30)
    features = [
        ("PRECIOS", "Actualizados"),
        ("MIÉRCOLES", "De Plaza"),
        ("REPARTO", "A domicilio"),
        ("ALTO VACÍO", "Porcionado"),
    ]
    for idx, (eyebrow, value) in enumerate(features):
        if idx < 2:
            x = MARGIN + idx * (feature_w + feature_gap)
        else:
            x = right_x + (idx - 2) * (feature_w + feature_gap)
        round_box(draw, (x, feature_y, x + feature_w, feature_y + feature_h), radius=28)
        draw.text((x + 22, feature_y + 24), eyebrow, font=font(AVENIR_NEXT, 18), fill=RED_DARK)
        wrapped = wrap_text(draw, value, feature_font, feature_w - 44)
        draw.multiline_text((x + 22, feature_y + 52), wrapped, font=feature_font, fill=BLACK, spacing=0)

    left_box = (MARGIN, 674, 760, 1165)
    round_box(draw, left_box, radius=34)
    draw.text((left_box[0] + 40, left_box[1] + 38), "Haz tu pedido de forma rápida", font=section_title, fill=BLACK)
    main_copy = "Consulta la lista de precios, revisa promociones y envíanos tu pedido por WhatsApp para surtir la semana."
    wrapped_copy = wrap_text(draw, main_copy, body_font, 500)
    draw.multiline_text((left_box[0] + 40, left_box[1] + 102), wrapped_copy, font=body_font, fill=TAUPE, spacing=10)
    bullets = [
        "Pedidos por WhatsApp",
        "Reparto a domicilio",
        "Empacado al Alto Vacío",
    ]
    by = left_box[1] + 264
    for bullet in bullets:
        draw.ellipse((left_box[0] + 40, by + 7, left_box[0] + 54, by + 21), fill=RED)
        draw.text((left_box[0] + 74, by), bullet, font=body_bold, fill=BLACK)
        by += 58

    qr_box = (810, 710, WIDTH - MARGIN, 1100)
    round_box(draw, qr_box, radius=34, outline=RED, width=3)
    centered(draw, (qr_box[0] + qr_box[2]) // 2, qr_box[1] + 28, "ESCANEA AQUÍ", font(AVENIR_NEXT, 28), RED_DARK)
    image.paste(qr, (qr_box[0] + 70, qr_box[1] + 86), qr)
    centered(draw, (qr_box[0] + qr_box[2]) // 2, qr_box[1] + 355, "Abre la página en tu celular", font(AVENIR, 21), TAUPE)

    info_box = (MARGIN, 1170, WIDTH - MARGIN, 1450)
    round_box(draw, info_box, radius=34)
    draw.text((info_box[0] + 40, info_box[1] + 38), "Carnes Espinosa", font=section_title, fill=RED_DARK)
    info_text = "Consulta desde tu celular promociones, reparto a domicilio y pedidos listos para la semana."
    draw.multiline_text((info_box[0] + 40, info_box[1] + 108), wrap_text(draw, info_text, body_font, 560), font=body_font, fill=TAUPE, spacing=8)

    draw.rounded_rectangle((830, 1208, 1088, 1264), radius=22, fill=BEIGE)
    draw.text((857, 1221), "WhatsApp", font=font(AVENIR_NEXT, 26), fill=RED_DARK)
    draw.text((828, 1320), BUSINESS["whatsappDisplay"], font=font(AVENIR_NEXT, 42), fill=GREEN)

    footer_box = (MARGIN, 1480, WIDTH - MARGIN, HEIGHT - 100)
    draw.rounded_rectangle(footer_box, radius=40, fill=RED)
    draw.text((footer_box[0] + 48, footer_box[1] + 48), "Visítanos en", font=font(AVENIR_NEXT, 26), fill=(255, 244, 236))
    draw.text((footer_box[0] + 48, footer_box[1] + 104), "carnesespinosa.com.mx", font=font(AVENIR_NEXT, 54), fill=(255, 255, 255))
    draw.text((footer_box[0] + 48, footer_box[1] + 176), "Precios, promociones, reparto y pedidos por WhatsApp.", font=font(AVENIR, 27), fill=(255, 240, 232))

    image.save(OUT_WEB, quality=95)


def promo_price_box(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, item: dict, lookup: dict[str, dict]):
    source = lookup.get(item["producto"], {})
    old_price = item.get("precioAnterior", source.get("precio"))
    unit = item.get("unidad", source.get("unidad", "kg"))
    left_w = 258
    divider_x = x + left_w + 26
    price_x = divider_x + 24
    price_width = x + w - 28 - price_x

    draw.line((divider_x, y + 28, divider_x, y + h - 28), fill=LINE, width=2)

    draw_label(draw, x + 22, y + 20, 250, item["badge"])
    title = item.get("titulo") or item["producto"]
    title_font = fit_text(draw, title, BASKERVILLE, 28, 21, left_w - 8)
    title_wrapped = wrap_text(draw, title, title_font, left_w - 8)
    draw.multiline_text((x + 22, y + 74), title_wrapped, font=title_font, fill=BLACK, spacing=0)

    category_text = item["categoria"].upper()
    category_font = fit_text(draw, category_text, AVENIR_NEXT, 17, 13, left_w - 8)
    draw.text((x + 22, y + 126), category_text, font=category_font, fill=(173, 133, 72))
    copy_font = font(AVENIR, 17)
    copy = wrap_text(draw, item["copy"], copy_font, left_w - 8)
    draw.multiline_text((x + 22, y + 154), copy, font=copy_font, fill=TAUPE, spacing=4)

    if old_price:
        old_text = f"De {format_price(old_price, unit)}"
        old_font = fit_text(draw, old_text, AVENIR, 20, 16, price_width)
        old_bbox = draw.textbbox((0, 0), old_text, font=old_font)
        old_w = old_bbox[2] - old_bbox[0]
        old_x = price_x + price_width - old_w
        old_y = y + 38
        draw.text((old_x, old_y), old_text, font=old_font, fill=TAUPE)
        line_y = old_y + ((old_bbox[3] - old_bbox[1]) // 2)
        draw.line((old_x + 4, line_y, old_x + old_w - 4, line_y - 6), fill=RED, width=3)

    solo_font = font(AVENIR_NEXT, 20)
    draw.text((price_x, y + 94), "a solo", font=solo_font, fill=RED_DARK)
    price_text = format_price(item["precioPromocional"], unit)
    price_font = fit_text(draw, price_text, DIDOT, 44, 34, price_width)
    price_bbox = draw.textbbox((0, 0), price_text, font=price_font)
    price_w = price_bbox[2] - price_bbox[0]
    price_draw_x = price_x + price_width - price_w
    draw.text((price_draw_x, y + 124), price_text, font=price_font, fill=RED)


def wednesday_flyer():
    image = Image.new("RGB", (WIDTH, HEIGHT), CREAM)
    draw = ImageDraw.Draw(image)
    add_background(draw)

    logo = contain(crop_near_white(Image.open(LOGO_PATH)), 118, 74)
    image.paste(logo, (MARGIN - 4, 78), logo)
    qr = contain(Image.open(QR_PATH).convert("RGBA"), 158, 158)

    title_font = font(DIDOT, 68)
    sub_font = font(BASKERVILLE, 48)
    body_font = font(HELVETICA_NEUE, 26)

    centered(draw, WIDTH // 2, 88, "MIÉRCOLES DE PLAZA", title_font, BLACK, spacing=-4)
    centered(draw, WIDTH // 2, 170, "Solo en Carnes Espinosa", sub_font, RED_DARK)
    desc = wrap_text(draw, PRICING["seccionPromociones"]["description"], body_font, WIDTH - 200)
    centered(draw, WIDTH // 2, 262, desc, body_font, TAUPE, spacing=6)

    draw.rounded_rectangle((MARGIN, 352, WIDTH - MARGIN, 422), radius=28, fill=BEIGE)
    centered(draw, WIDTH // 2, 367, "Precios especiales para surtir tu semana", font(BASKERVILLE, 36), RED_DARK)

    lookup = get_lookup()
    items = PRICING["seccionPromociones"]["items"]
    card_w = (WIDTH - (MARGIN * 2) - 24) // 2
    card_h = 216
    start_y = 468
    for idx, item in enumerate(items):
        row = idx // 2
        col = idx % 2
        x = MARGIN + col * (card_w + 24)
        y = start_y + row * (card_h + 24)
        round_box(draw, (x, y, x + card_w, y + card_h), radius=30)
        promo_price_box(draw, x, y, card_w, card_h, item, lookup)

    note_box = (MARGIN, 1188, WIDTH - MARGIN, 1306)
    round_box(draw, note_box, radius=34, outline=RED, width=2)
    draw.text((note_box[0] + 36, note_box[1] + 28), "Obsequio por compra", font=font(AVENIR_NEXT, 24), fill=RED_DARK)
    note_text = wrap_text(draw, PRICING["notaPromocional"]["text"], font(AVENIR, 22), WIDTH - (MARGIN * 2) - 72)
    draw.multiline_text((note_box[0] + 36, note_box[1] + 62), note_text, font=font(AVENIR, 22), fill=BLACK, spacing=5)

    bottom_box = (MARGIN, 1360, WIDTH - MARGIN, HEIGHT - 80)
    round_box(draw, bottom_box, radius=34)
    draw.text((bottom_box[0] + 40, bottom_box[1] + 34), "Escanea y revisa la página completa", font=font(BASKERVILLE, 32), fill=BLACK)
    draw.multiline_text((bottom_box[0] + 40, bottom_box[1] + 88), "Consulta precios, promociones,\nreparto a domicilio y pedidos por WhatsApp.", font=font(AVENIR, 24), fill=TAUPE, spacing=6)

    qr_panel = (bottom_box[0] + 38, bottom_box[1] + 156, bottom_box[0] + 274, bottom_box[1] + 358)
    draw.rounded_rectangle(qr_panel, radius=30, fill=BEIGE, outline=LINE, width=2)
    centered(draw, (qr_panel[0] + qr_panel[2]) // 2, qr_panel[1] + 16, "ESCANEA AQUÍ", font(AVENIR_NEXT, 18), RED_DARK)
    qr_x = qr_panel[0] + (qr_panel[2] - qr_panel[0] - qr.width) // 2
    qr_y = qr_panel[1] + 42
    image.paste(qr, (qr_x, qr_y), qr)

    info_x = qr_panel[2] + 44
    draw.text((info_x, bottom_box[1] + 166), "Visita la página", font=font(AVENIR_NEXT, 18), fill=TAUPE)
    url_pill = (info_x, bottom_box[1] + 192, bottom_box[2] - 42, bottom_box[1] + 246)
    draw.rounded_rectangle(url_pill, radius=24, fill=(252, 245, 238))
    centered(draw, (url_pill[0] + url_pill[2]) // 2, url_pill[1] + 12, "carnesespinosa.com.mx", font(AVENIR_NEXT, 28), RED_DARK)
    draw.text((info_x, bottom_box[1] + 262), BUSINESS["whatsappDisplay"], font=font(AVENIR_NEXT, 46), fill=GREEN)

    legal_band = (info_x, bottom_box[1] + 320, bottom_box[2] - 42, bottom_box[1] + 384)
    draw.rounded_rectangle(legal_band, radius=24, fill=(252, 249, 244))
    legal = wrap_text(draw, PRICING["seccionPromociones"]["legalNote"], font(AVENIR, 18), (legal_band[2] - legal_band[0]) - 28)
    draw.multiline_text((legal_band[0] + 16, legal_band[1] + 11), legal, font=font(AVENIR, 18), fill=TAUPE, spacing=4)
    image.save(OUT_WEDNESDAY, quality=95)


def main():
    if not QR_PATH.exists():
        raise FileNotFoundError(f"No se encontró el QR esperado en {QR_PATH}")
    web_flyer()
    wednesday_flyer()
    print(f"Listo: {OUT_WEB}")
    print(f"Listo: {OUT_WEDNESDAY}")


if __name__ == "__main__":
    main()
