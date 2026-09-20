export function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token.startsWith("--")) {
      const chiave = token.slice(2);
      const successivo = argv[i + 1];
      if (successivo !== undefined && !successivo.startsWith("--")) {
        args[chiave] = successivo;
        i++;
      } else {
        args[chiave] = true;
      }
    } else {
      args._.push(token);
    }
  }
  return args;
}
