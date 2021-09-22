const autoDownloadFile = (href: string, downloadTimeoutMs = 1000): Promise<boolean> => new Promise((res) => {
  setTimeout(() => {
    const a = document.createElement('a');
    a.download = 'true';
    a.href = href;
    document.body.appendChild(a);
    // a.click();
    document.body.removeChild(a);
    console.log(href);
    res(true);
  }, downloadTimeoutMs);
});

export default autoDownloadFile;
