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

type FinancialCardProps = {
  mode: Mode;
  data: ExtendedFinancialDatum[];
};

export function FinancialCard({ mode, data }: FinancialCardProps) {
  const { tab, sortAsc, sortKey } = useTableStore((store) => store);
  // let timer: NodeJS.Timeout;
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  useLayoutEffect(() => {
    if (mode !== "year") return;
    swiper?.slideTo(0);
  }, [sortAsc, sortKey]);

  const onSwiper = (currentSwiper: SwiperCore) => {
    setSwiper(currentSwiper);
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
          // initialSlide={initialIndex}
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
          // onSlideChange={onSlideChange}
        >
          {data.map((datum) => (
            <SwiperSlide key={`${datum.slug.value}${datum.year.value}`}>
              <CardItem datum={datum} mode={mode} tab={tab} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
