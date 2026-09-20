export function eSvgSchemi(src) {
  return typeof src === "string" && /\.svg$/i.test(src) && src.includes("img/schemi");
}

export function applicaAttributiSvg(svg, { alt, classe, stile }) {
  const tagMatch = svg.match(/<svg\b[^>]*>/i);
  if (!tagMatch) return svg;

  let tagSvg = tagMatch[0];
  const haTitle = /<title\b/i.test(svg);

  if (classe) {
    tagSvg = /\bclass=/i.test(tagSvg)
      ? tagSvg.replace(/class="([^"]*)"/i, (_, esistente) => `class="${esistente} ${classe}"`)
      : tagSvg.replace(/<svg\b/i, `<svg class="${classe}"`);
  }
  if (stile) {
    tagSvg = /\bstyle=/i.test(tagSvg)
      ? tagSvg.replace(/style="([^"]*)"/i, (_, esistente) => `style="${esistente}; ${stile}"`)
      : tagSvg.replace(/<svg\b/i, `<svg style="${stile}"`);
  }

  let risultato = svg.replace(tagMatch[0], () => tagSvg);

  if (alt && !haTitle) {
    risultato = risultato.replace(/(<svg\b[^>]*>)/i, (_, apertura) => `${apertura}<title>${alt}</title>`);
  }

  return risultato;
}
