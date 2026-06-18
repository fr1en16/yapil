'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type FallingPatternProps = React.ComponentProps<'div'> & {
	/** Primary color of the falling elements (default: 'var(--primary)') */
	color?: string;
	/** Background color (default: 'var(--background)') */
	backgroundColor?: string;
	/** Animation speed multiplier (default: 1) */
	speed?: number;
	/** Pattern density - affects spacing (default: 1) */
	density?: number;
};

export function FallingPattern({
	color = 'var(--primary)',
	backgroundColor = 'var(--background)',
	speed = 1,
	density = 1,
	className,
	...props
}: FallingPatternProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;
		let particles: { x: number; y: number; speedY: number; width: number; height: number; alpha: number; type: 'dash' | 'dot' }[] = [];

		const resize = () => {
			const parent = canvas.parentElement;
			if (parent) {
				canvas.width = parent.clientWidth;
				canvas.height = parent.clientHeight;
			}
		};

		const initParticles = () => {
			particles = [];
			const numParticles = Math.floor((canvas.width * canvas.height) / (15000 / density));
			for (let i = 0; i < numParticles; i++) {
				const isDash = Math.random() > 0.3;
				particles.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					speedY: (0.5 + Math.random() * 1.5) * speed,
					width: isDash ? 2 + Math.random() * 2 : 1.5,
					height: isDash ? 50 + Math.random() * 80 : 1.5,
					alpha: 0.1 + Math.random() * 0.4,
					type: isDash ? 'dash' : 'dot',
				});
			}
		};

		let computedColor = color;
		const updateColor = () => {
			if (color.startsWith('var(')) {
				const varName = color.match(/var\(([^)]+)\)/)?.[1];
				if (varName) {
					const val = getComputedStyle(canvas).getPropertyValue(varName).trim();
					if (val) {
						if (
							val.startsWith('rgb') ||
							val.startsWith('hsl') ||
							val.startsWith('oklch') ||
							val.startsWith('#')
						) {
							computedColor = val;
						} else {
							computedColor = `hsl(${val})`;
						}
					}
				}
			} else {
				computedColor = color;
			}
		};

		updateColor();

		const observer = new MutationObserver(() => {
			updateColor();
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			ctx.fillStyle = computedColor;

			particles.forEach((p) => {
				p.y += p.speedY;
				if (p.y > canvas.height + p.height) {
					p.y = -p.height;
					p.x = Math.random() * canvas.width;
				}
				
				ctx.beginPath();
				ctx.globalAlpha = p.alpha;
				if (p.type === 'dash') {
					ctx.roundRect(p.x, p.y, p.width, p.height, p.width / 2);
				} else {
					ctx.arc(p.x, p.y, p.width, 0, Math.PI * 2);
				}
				ctx.fill();
			});
			ctx.globalAlpha = 1;
			animationFrameId = requestAnimationFrame(draw);
		};

		const handleResize = () => {
			resize();
			initParticles();
		};

		window.addEventListener('resize', handleResize);
		resize();
		initParticles();
		draw();

		return () => {
			window.removeEventListener('resize', handleResize);
			observer.disconnect();
			cancelAnimationFrame(animationFrameId);
		};
	}, [color, density, speed]);

	return (
		<div className={cn('relative h-full w-full overflow-hidden', className)} style={{ backgroundColor }} {...props}>
			<canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
			{/* Grid overlay */}
			<div
				className="absolute inset-0 z-1 pointer-events-none dark:brightness-600"
				style={{
					backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, ${backgroundColor} 2px)`,
					backgroundSize: `${8 * density}px ${8 * density}px`,
				}}
			/>
		</div>
	);
}

