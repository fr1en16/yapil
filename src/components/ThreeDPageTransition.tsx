'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef, useContext } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Настройка перспективного просмотра для всего перехода
const perspectiveSettings = {
  perspective: 1200, // Чем меньше, тем агрессивнее 3D
  perspectiveOrigin: '50% 50%',
};

// Варианты 3D-анимации (в стиле Куба)
const cubeTransitionVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? 90 : -90, // Поворачиваем по оси Y на старте
    z: -300, // Сдвигаем вглубь перспективы
    x: direction > 0 ? '50%' : '-50%', // Ставим сбоку
  }),
  animate: {
    opacity: 1,
    rotateY: 0, // Возвращаем в плоскость экрана
    z: 0, // Возвращаем к зрителю
    x: 0, // Ставим по центру
    transition: {
      duration: 0.8, // Довольно медленно для эстетики
      ease: [0.6, 0.01, -0.05, 0.95], // Плавный ease-in-out
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? -90 : 90, // Уплывает в противоположную сторону
    z: -300, // Уплывает вглубь
    x: direction > 0 ? '-50%' : '50%', // Уходит вбок
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  }),
} as any;

// Компонент заморозки роута для анимации выхода
function FrozenRoute({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context);

  return (
    <LayoutRouterContext.Provider value={frozen.current}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

interface TransitionPageProps {
  children: React.ReactNode;
  routePathname: string;
  isTransitioning: boolean;
  exitScrollY: number;
  setExitScrollY: (y: number) => void;
  setIsTransitioning: (val: boolean) => void;
  [key: string]: any;
}

function TransitionPage({
  children,
  routePathname,
  isTransitioning,
  exitScrollY,
  setExitScrollY,
  setIsTransitioning,
  ...props
}: TransitionPageProps) {
  const currentPathname = usePathname();
  const isExiting = routePathname !== currentPathname;

  return (
    <motion.div
      style={{
        position: isTransitioning ? 'absolute' : 'relative',
        // Задаем top равным текущей прокрутке только для уходящей страницы
        top: isTransitioning ? (isExiting ? `${exitScrollY}px` : 0) : 0,
        left: 0,
        width: '100%',
        minHeight: '100vh',
        backfaceVisibility: 'hidden', // Скрываем изнанку при повороте
        // Не задаем backgroundColor, чтобы не перекрывать фоновый узор в созданном контексте наложения
      }}
      onAnimationStart={() => {
        setIsTransitioning(true);
        if (isExiting) {
          setExitScrollY(window.scrollY);
        }
        const lenis = (window as any).lenis;
        lenis?.stop();
      }}
      onAnimationComplete={() => {
        if (isExiting) {
          // Когда старая страница полностью исчезла, скроллим окно в самый верх
          window.scrollTo(0, 0);
          const lenis = (window as any).lenis;
          lenis?.scrollTo(0, { immediate: true });
        } else {
          // Когда новая страница полностью встала на место, завершаем переход
          setIsTransitioning(false);
          const lenis = (window as any).lenis;
          lenis?.start();
        }
      }}
      {...props}
    >
      <FrozenRoute>{children}</FrozenRoute>
    </motion.div>
  );
}

interface ThreeDPageTransitionProps {
  children: React.ReactNode;
}

export default function ThreeDPageTransition({ children }: ThreeDPageTransitionProps) {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const [direction, setDirection] = useState(1); // 1 - вперед, -1 - назад
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [exitScrollY, setExitScrollY] = useState(0);

  // Синхронизация состояния во время рендера при смене pathname (предотвращает рывки в первом кадре)
  if (typeof window !== 'undefined' && prevPathnameRef.current && pathname !== prevPathnameRef.current) {
    const prevPath = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    // Определяем направление
    const newDirection = pathname > prevPath ? 1 : -1;
    setDirection(newDirection);

    // Захватываем скролл немедленно
    const currentScroll = window.scrollY;
    setExitScrollY(currentScroll);
    setIsTransitioning(true);

    // Останавливаем плавную прокрутку
    const lenis = (window as any).lenis;
    lenis?.stop();
  }

  // 1. Установка начального значения для рефа после первого рендера
  useEffect(() => {
    if (!prevPathnameRef.current) {
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  // 2. Первоначальный сброс скролла на всякий случай
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.start();
    }
  }, [pathname]);

  return (
    <main
      // Задаем перспективу для всех вложенных motion-компонентов
      style={{
        ...perspectiveSettings,
        width: '100vw',
        height: isTransitioning ? '100vh' : 'auto',
        minHeight: '100vh',
        overflow: isTransitioning ? 'hidden' : 'visible',
        position: 'relative',
      }}
    >
      <AnimatePresence
        mode="wait" // Старая страница ждет, пока новая полностью анимируется на вход
        initial={false} // Не анимируем первую загрузку
        custom={direction} // Передаем направление в варианты
      >
        <TransitionPage
          key={pathname}
          routePathname={pathname}
          isTransitioning={isTransitioning}
          exitScrollY={exitScrollY}
          setExitScrollY={setExitScrollY}
          setIsTransitioning={setIsTransitioning}
          custom={direction}
          variants={cubeTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="page-content" // Доп. класс для стилизации
        >
          {children}
        </TransitionPage>
      </AnimatePresence>
    </main>
  );
}
