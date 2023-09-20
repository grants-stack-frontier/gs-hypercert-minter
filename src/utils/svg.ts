import html2canvas from 'html2canvas';

export const exportImage = async (ref: React.RefObject<HTMLDivElement>): Promise<string | void> => {
  if (ref.current !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const canvas: HTMLCanvasElement = await html2canvas(ref.current as HTMLElement, {
      logging: true,
      backgroundColor: null,
      proxy: "https://cors-proxy.hypercerts.workers.dev/",
      imageTimeout: 0,
    });
    const data: string = canvas.toDataURL('image/png', 1.0);

    console.log(data)
    return data;
  }

  console.error("No element in ref");
};
