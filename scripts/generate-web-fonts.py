"""Run from the repo root with fonttools and brotli installed.

The site is English. Preserve the original TTFs for future language expansion;
extend these ranges before adding languages outside Latin-1.
"""
from fontTools import subset

for name in ["Nunito-Variable", "Underdog-Regular", "MedievalSharp-Regular"]:
    options = subset.Options()
    options.flavor = "woff2"
    font = subset.load_font(f"public/fonts/{name}.ttf", options)
    subsetter = subset.Subsetter(options=options)
    if name == "MedievalSharp-Regular":
        # This face is used exclusively for the brand in the header and footer.
        subsetter.populate(text="How to Fish Wiki")
        output = "MedievalSharp-Brand"
    else:
        subsetter.populate(unicodes=subset.parse_unicodes(
            "U+0000-00FF,U+2000-206F,U+20A0-20CF,U+2190-22FF"
        ))
        output = name
    subsetter.subset(font)
    subset.save_font(font, f"public/fonts/{output}.woff2", options)
