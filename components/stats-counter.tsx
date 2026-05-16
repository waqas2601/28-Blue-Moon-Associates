"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface Stat {
  number: string;
  label: string;
}

interface StatsCounterProps {
  stats: Stat[];
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const parseNumber = (str: string) => {
    const num = parseInt(str.replace(/[^0-9]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const getSuffix = (str: string) => {
    return str.replace(/[0-9]/g, "").trim();
  };

  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-lg bg-white px-6 py-8 shadow-xl"
            >
              <span className="text-3xl font-bold text-[#29ABE2] sm:text-4xl">
                {inView ? (
                  <CountUp
                    start={0}
                    end={parseNumber(stat.number)}
                    duration={2.5}
                    delay={index * 0.2}
                    suffix={getSuffix(stat.number)}
                    useEasing={true}
                  />
                ) : (
                  "0"
                )}
              </span>
              <span className="mt-2 text-center text-sm font-medium text-[#4A4A4A] sm:text-base">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
