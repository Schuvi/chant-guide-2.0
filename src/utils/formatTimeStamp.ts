export const formatTimestamp = (timestamp: number) => {
  const min = Math.floor(timestamp / 60);
  const sec = Math.floor(timestamp % 60);
  const msec = Math.floor((timestamp % 1) * 100);

  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${msec.toString().padStart(3, "0")}`;
};
