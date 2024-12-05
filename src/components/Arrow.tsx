type ArrowProps = {
  className?: string;
};

export default function Arrow({ className }: ArrowProps) {
  return (
    <svg
      className={className}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.21173 5.92865C5.01902 6.04743 4.76317 6.02329 4.59612 5.85624L0.353478 1.6136C0.158216 1.41834 0.158216 1.10176 0.353478 0.906495C0.54874 0.711233 0.865323 0.711234 1.06058 0.906495L4.94969 4.7956L8.83883 0.906449C9.0341 0.711187 9.35068 0.711187 9.54594 0.906449C9.7412 1.10171 9.7412 1.41829 9.54594 1.61356L5.3033 5.8562C5.27507 5.88443 5.2443 5.90858 5.21173 5.92865Z"
      />
    </svg>
  );
}
