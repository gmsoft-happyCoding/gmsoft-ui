function convertRESTAPI(url: string, opts: { path: object }): string {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach(key => {
    const r = new RegExp(`(:${key}|{${key}})`, 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export default convertRESTAPI;
