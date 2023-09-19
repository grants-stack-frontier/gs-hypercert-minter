import html2canvas from 'html2canvas';

export const exportImage = async (ref: React.RefObject<HTMLDivElement>): Promise<string | void> => {
  if (ref.current !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const canvas: HTMLCanvasElement = await html2canvas(ref.current as HTMLElement);
    const data: string = canvas.toDataURL('image/png');

    console.log(data)
    return data;
  }

  console.error("No element in ref");
};
