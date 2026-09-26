import React, { useEffect, useRef, useState } from "react";

const DEFAULT_SIZE_MAPPING = [
  [[1024, 0], [[970, 250], [970, 90], [728, 90]]],
  [[768, 0], [[728, 90], [468, 60]]],
  [[0, 0], [[320, 100], [320, 50]]],
];

let gptServicesEnabled = false;

function flattenSizes(size, sizeMapping) {
  const baseSizes = Array.isArray(size?.[0]) ? size : [size];

  const mappedSizes = sizeMapping.flatMap(([, sizes]) => sizes);

  const allSizes = [...baseSizes, ...mappedSizes];

  const seen = new Set();

  return allSizes.filter((currentSize) => {
    if (!Array.isArray(currentSize)) return false;

    const key = currentSize.join("x");

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}

function getBreakpointBucket(width, sizeMapping) {
  const breakpoints = sizeMapping
    .map(([viewport]) => viewport[0])
    .sort((a, b) => b - a);

  return (
    breakpoints.find((breakpoint) => width >= breakpoint) ?? 0
  );
}

function getMaxWidthForBucket(bucket, sizeMapping) {
  const entry = sizeMapping.find(
    ([viewport]) => viewport[0] === bucket
  );

  if (!entry) {
    return 0;
  }

  const sizes = entry[1];

  if (!sizes?.length) {
    return 0;
  }

  return Math.max(
    ...sizes.map((currentSize) => currentSize[0])
  );
}

const DisplayAd = ({
  adUnitPath,
  size = [300, 250],
  sizeMapping = DEFAULT_SIZE_MAPPING,
  divId,
  style = {},
}) => {
  const containerRef = useRef(null);
  const slotRef = useRef(null);
  const bucketRef = useRef(null);

  const [shouldLoad, setShouldLoad] = useState(false);

  const getCurrentMaxWidth = () => {
    if (typeof window === "undefined") {
      return 0;
    }

    const bucket = getBreakpointBucket(
      window.innerWidth,
      sizeMapping
    );

    return getMaxWidthForBucket(bucket, sizeMapping);
  };

  const [maxWidth, setMaxWidth] = useState(
    getCurrentMaxWidth
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "200px",
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    window.googletag = window.googletag || {
      cmd: [],
    };

    const googletag = window.googletag;

    googletag.cmd.push(() => {
      const existingElement = document.getElementById(divId);

      if (!existingElement) {
        return;
      }

      const validSizes = flattenSizes(
        size,
        sizeMapping
      );

      const slot = googletag.defineSlot(
        adUnitPath,
        validSizes,
        divId
      );

      if (!slot) {
        return;
      }

      if (sizeMapping?.length) {
        const mappingBuilder =
          googletag.sizeMapping();

        sizeMapping.forEach(
          ([viewport, sizes]) => {
            mappingBuilder.addSize(
              viewport,
              sizes
            );
          }
        );

        const mapping =
          mappingBuilder.build();

        if (mapping) {
          slot.defineSizeMapping(mapping);
        }
      }

      slot.addService(
        googletag.pubads()
      );

      slotRef.current = slot;

      if (!gptServicesEnabled) {
        googletag
          .pubads()
          .enableSingleRequest();

        googletag
          .pubads()
          .collapseEmptyDivs();

        googletag.enableServices();

        gptServicesEnabled = true;
      }

      googletag.display(divId);

      bucketRef.current =
        getBreakpointBucket(
          window.innerWidth,
          sizeMapping
        );
    });

    return () => {
      googletag.cmd.push(() => {
        if (slotRef.current) {
          googletag.destroySlots([
            slotRef.current,
          ]);

          slotRef.current = null;
        }
      });
    };
  }, [
    shouldLoad,
    adUnitPath,
    divId,
    JSON.stringify(size),
    JSON.stringify(sizeMapping),
  ]);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;

        const newBucket =
          getBreakpointBucket(
            width,
            sizeMapping
          );

        const newMaxWidth =
          getMaxWidthForBucket(
            newBucket,
            sizeMapping
          );

        setMaxWidth(newMaxWidth);

        if (
          newBucket !== bucketRef.current
        ) {
          bucketRef.current =
            newBucket;

          if (slotRef.current) {
            window.googletag.cmd.push(
              () => {
                window.googletag
                  .pubads()
                  .refresh([
                    slotRef.current,
                  ]);
              }
            );
          }
        }
      }, 300);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "orientationchange",
      handleResize
    );

    return () => {
      clearTimeout(resizeTimer);

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "orientationchange",
        handleResize
      );
    };
  }, [
    shouldLoad,
    JSON.stringify(sizeMapping),
  ]);

  return (
    <div
      className="display-ad-wrapper"
      style={{
        width: "100%",
        maxWidth: maxWidth
          ? `${maxWidth}px`
          : "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflow: "visible",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "visible",
          boxSizing: "border-box",
        }}
      >
        <div
          id={divId}
          style={{
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            minHeight: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            overflow: "visible",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
};

export default DisplayAd;