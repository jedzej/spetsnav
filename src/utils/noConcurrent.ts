export const noConcurrent = <F extends (...args: any[]) => Promise<any>>(
  func: F
) => {
  let pending = false;
  return async (...args: any[]) => {
    if (pending) {
      return;
    }
    pending = true;
    const result = await func(...args);
    pending = false;
    return result;
  };
};
