import { classNames } from "@/utils";
import ReactMarquee, { MarqueeProps } from "react-fast-marquee";
import { useResizeDetector } from "react-resize-detector";

export default function Marquee(props: MarqueeProps) {
  const { ref: containerRef, width: cw } = useResizeDetector();
  const { ref: textRef, width: tw } = useResizeDetector();
  const slide = cw && tw && tw > cw;

  return (
    <div
      {...props}
      ref={containerRef}
      className={classNames(
        "flex h-10 w-full items-center overflow-hidden whitespace-nowrap px-2",
        "relative cursor-default rounded-md transition-all",
        props.className,
      )}
    >
      {slide ? (
        <ReactMarquee direction="right" className="dir-ltr" delay={2} gradient gradientWidth={14}>
          <span className="pe-10">{props.children}</span>
        </ReactMarquee>
      ) : (
        props.children
      )}
      <div ref={textRef} className="absolute opacity-0">
        {props.children}
      </div>
    </div>
  );
}
