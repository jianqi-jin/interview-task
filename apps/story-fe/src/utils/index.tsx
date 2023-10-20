// By Jianqi Jin

export const delay = (timeout: number) =>
  new Promise((r) => {
    setTimeout(() => r(0), timeout);
  });
