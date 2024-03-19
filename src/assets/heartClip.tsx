export default function HeartClip({ color }: { color: string }) {
  return (
    <svg
      width="320"
      height="320"
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="320" height="320" fill={color} />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        ></pattern>
        <image id="image0_622_2" width="500" height="500" />
      </defs>
    </svg>
  );
}
