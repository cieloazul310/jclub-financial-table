"use client";

import { useState, useLayoutEffect } from "react";
import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import { Mousewheel, Scrollbar, FreeMode } from "swiper/modules";
import { css } from "styled-system/css";
import { useTableStore } from "@/providers/table-store-provider";
import type { Mode } from "@/utils/types";
import { CardItem } from "./item";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

function useInitialIndex(data: ExtendedFinancialDatum[], mode: Mode) {
  if (mode === "club") {
    const storaged =
      typeof window === "object"
        ? window.sessionStorage.getItem("currentYear")
        : undefined;
    if (!storaged) return data.length - 1;
    const currentYear = parseInt(storaged, 10);
    const index = data.findIndex(({ year }) => year.value === currentYear);
    if (index < 0) return data.length - 1;
    return index;
  }
  const storaged =
    typeof window === "object"
      ? window.sessionStorage.getItem("currentClub")
      : undefined;
  if (!storaged) return 0;
  const index = data.findIndex(({ clubId }) => clubId.value === storaged);
  if (index < 0) return 0;
  return index;
}

type FinancialCardProps = {
  mode: Mode;
  data: ExtendedFinancialDatum[];
};

export function FinancialCard({ mode, data }: FinancialCardProps) {
  const { tab, sortAsc, sortField } = useTableStore((store) => store);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const initialIndex = useInitialIndex(data, mode);

  useLayoutEffect(() => {
    if (mode !== "year") return;
    swiper?.slideTo(0);
  }, [sortAsc, sortField]);

  const onSwiper = (currentSwiper: SwiperCore) => {
    setSwiper(currentSwiper);
  };
  /**
   * スクロール終了時に表示中の年度、クラブをsessionStorage に保存
   */
  const onSlideChange = (currentSwiper: SwiperCore) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        const { activeIndex } = currentSwiper;

        if (mode === "club") {
          const currentYear = data[activeIndex]?.year.value;
          if (currentYear) {
            window.sessionStorage.setItem(
              "currentYear",
              currentYear.toString(),
            );
          }
        }
        if (mode === "year") {
          const currentClub = data[activeIndex]?.clubId.value;
          if (currentClub) {
            window.sessionStorage.setItem("currentClub", currentClub);
          }
        }
      }, 250),
    );
  };

  return (
    <div className={css({ width: "full" })}>
      <div
        className={css({
          width: "full",
          minHeight: 400,
          p: 1,
          bg: "solid-gray.bg",
        })}
      >
        <Swiper
          modules={[Mousewheel, Scrollbar, FreeMode]}
          cssMode
          mousewheel
          centeredSlides
          freeMode
          simulateTouch={false}
          initialSlide={initialIndex}
          scrollbar={{
            draggable: true,
          }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            700: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
        >
          {data.map((datum, index) => (
            <SwiperSlide key={`${datum.clubId.value}${datum.year.value}`}>
              <CardItem
                datum={datum}
                mode={mode}
                tab={tab}
                index={index}
                totalCount={data.length}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
