import ReactDOM from "react-dom";

type Props = {
  onClick: () => void;
  active: boolean;
};

function ParseButton({ onClick, active }: Props) {
  const button = (
    <button type="button" className="ytp-button" onClick={onClick}>
      <div className="ytp-autonav-toggle-button-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="211.2 14 77.6 122"
          style={{}}
          preserveAspectRatio="xMidYMid"
        >
          <defs>
            <linearGradient
              id="editing-sticker-gradient"
              x1="0.5"
              x2="0.5"
              y1="0.2"
              y2="0.8"
            >
              <stop offset="0" stopColor={!active ? "#F000" : "#fd9"} />
              <stop offset="1" stopColor={!active ? "#F000" : "#9df"} />
            </linearGradient>
            <filter
              id="editing-sticker"
              width="300%"
              height="300%"
              x="-100%"
              y="-100%"
            >
              <feMorphology in="SourceAlpha" radius="1" result="alpha-erode" />
              <feConvolveMatrix
                divisor="1"
                in="alpha-erode"
                kernelMatrix="0 1 0 1 1 1 0 1 0"
                order="3,3"
                result="alpha-round"
              />
              <feMorphology
                in="alpha-round"
                operator="dilate"
                radius="3.5"
                result="dilate-shadow"
              />
              <feGaussianBlur
                in="dilate-shadow"
                result="shadow"
                stdDeviation="1.5"
              />
              <feFlood floodColor="#fff" result="flood-sticker" />
              <feComposite
                in="flood-sticker"
                in2="alpha-round"
                operator="in"
                result="comp-sticker"
              />
              <feMorphology
                in="comp-sticker"
                operator="dilate"
                radius="3"
                result="morph-sticker"
              />
              <feConvolveMatrix
                divisor="1"
                in="morph-sticker"
                kernelMatrix="0 1 0 1 1 1 0 1 0"
                order="3,3"
                result="sticker"
              />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="sticker" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#editing-sticker)">
            <path
              fill="url(#editing-sticker-gradient)"
              stroke="#000"
              strokeWidth="2.5"
              d="M26.11-42.69h0q15.68 0 15.68 11.07h0q0 6.08-3.9 9.73h0q-3.84 3.65-10.56 3.65h0q-3.14 0-5.57-1.79h0q-1.15-.77-1.92-1.79h0q4.67 0 7.14-2.85h0q2.46-2.85 2.46-8.42h0q0-5.57-5.5-5.57h0-1.54 0q-.38 0-.7.07h0L14.34 0H.45l7.87-41.92h0q6.85-.64 10.82-.7h0q3.96-.07 6.97-.07z"
              transform="translate(229.542 96.345)"
            />
          </g>
        </svg>
      </div>
    </button>
  );

  return ReactDOM.createPortal(
    button,
    document.querySelector(".ytp-right-controls")
  );
}

export default ParseButton;
