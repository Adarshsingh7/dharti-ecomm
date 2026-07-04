'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedStat = {
    value: string;
    label: string;
};

type AnimatedStatsProps = {
    stats: AnimatedStat[];
};

const getTargetValue = (value: string) =>
    Number(value.replace(/\D/g, ''));

export default function AnimatedStats({
    stats,
}: AnimatedStatsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);
    const animationRef = useRef<number | null>(null);

    const [values, setValues] = useState<number[]>(
        stats.map(() => 1)
    );

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const targets = stats.map((stat) =>
            getTargetValue(stat.value)
        );

        const animate = () => {
            if (hasAnimated.current) return;

            hasAnimated.current = true;

            const duration = 4000;
            const start = performance.now();
            setValues(stats.map(() => 1));

            const update = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);

                setValues(
                    targets.map((target) =>
                        Math.max(1, Math.floor(target * progress))
                    )
                );

                if (progress < 1) {
                    animationRef.current =
                        requestAnimationFrame(update);
                } else {
                    setValues(targets);
                }
            };

            animationRef.current =
                requestAnimationFrame(update);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate();
                    observer.disconnect();
                }
            },
            {
                threshold: 0.35,
            }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();

            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [stats]);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-cyan-100/80 py-14 dark:bg-cyan-950/30"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const suffix = stat.value.replace(/\d/g, '');

                        return (
                            <div key={stat.label}>
                                <p className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">
                                    {values[index]}
                                    {suffix}
                                </p>

                                <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-slate-700 dark:text-slate-300 md:text-sm">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
